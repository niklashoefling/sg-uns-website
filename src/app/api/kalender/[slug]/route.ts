import { NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@payload-config'
import { samsGetAll, resolveTeams, type SamsLeagueMatch } from '@/lib/sams'

const BASE_URL = 'https://sgunsrheinhessen.de'

function icsDate(date: string, time?: string): { start: string; end: string } {
  if (time && !time.startsWith('00:00')) {
    // With time — use TZID=Europe/Berlin
    const [y, m, d] = date.split('-')
    const [hh, mm] = time.split(':')
    const dt = `${y}${m}${d}T${hh}${mm}00`
    // End = +2h
    const endHour = String(Number(hh) + 2).padStart(2, '0')
    const dtEnd = `${y}${m}${d}T${endHour}${mm}00`
    return {
      start: `DTSTART;TZID=Europe/Berlin:${dt}`,
      end: `DTEND;TZID=Europe/Berlin:${dtEnd}`,
    }
  } else {
    // All-day
    const [y, m, d] = date.split('-')
    const dateStr = `${y}${m}${d}`
    // Next day for DTEND
    const nextDay = new Date(`${date}T00:00:00`)
    nextDay.setDate(nextDay.getDate() + 1)
    const nd = nextDay.toISOString().split('T')[0].replace(/-/g, '')
    return {
      start: `DTSTART;VALUE=DATE:${dateStr}`,
      end: `DTEND;VALUE=DATE:${nd}`,
    }
  }
}

function escapeIcs(str: string): string {
  return str.replace(/\\/g, '\\\\').replace(/;/g, '\\;').replace(/,/g, '\\,').replace(/\n/g, '\\n')
}

function foldLine(line: string): string {
  // iCal spec: lines max 75 octets, fold with CRLF + space
  const bytes = Buffer.from(line, 'utf8')
  if (bytes.length <= 75) return line
  const parts: string[] = []
  let pos = 0
  let first = true
  while (pos < bytes.length) {
    const limit = first ? 75 : 74
    parts.push(bytes.subarray(pos, pos + limit).toString('utf8'))
    pos += limit
    first = false
  }
  return parts.join('\r\n ')
}

export async function GET(_req: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params

  const payload = await getPayload({ config })
  const { docs } = await payload.find({
    collection: 'mannschaften',
    where: { slug: { equals: slug } },
    depth: 0,
    limit: 1,
  })

  if (docs.length === 0) return NextResponse.json({ error: 'Not found' }, { status: 404 })

  const team = docs[0] as (typeof docs)[0] & {
    samsTeamUuid?: string
    samsLeagueUuid?: string
  }

  const { samsTeamUuid, samsLeagueUuid } = team
  if (!samsTeamUuid || !samsLeagueUuid) {
    return NextResponse.json({ error: 'No SAMS data configured' }, { status: 404 })
  }

  const matches = await samsGetAll<SamsLeagueMatch>('/league-matches', {
    'for-team': samsTeamUuid,
    'for-league': samsLeagueUuid,
  })

  const now = new Date().toISOString()
  const vevents = matches
    .filter((m) => !m.indefinitelyRescheduled && m.date)
    .map((m) => {
      const { heimteam, gastteam } = resolveTeams(m)
      const { start, end } = icsDate(m.date!, m.time)

      const loc = m.location
      const a = loc?.address
      const adresse = a
        ? [a.street, [a.postcode, a.city].filter(Boolean).join(' ')].filter(Boolean).join(', ')
        : undefined
      const location = loc ? [loc.name, adresse].filter(Boolean).join(', ') : ''

      const descParts: string[] = []
      if (m.results?.setPoints) descParts.push(`Ergebnis: ${m.results.setPoints}`)

      const lines = [
        'BEGIN:VEVENT',
        `UID:${m.uuid}@sgunsrheinhessen.de`,
        `DTSTAMP:${now.replace(/[-:]/g, '').split('.')[0]}Z`,
        start,
        end,
        `SUMMARY:${escapeIcs(`${heimteam} – ${gastteam}`)}`,
        location ? `LOCATION:${escapeIcs(location)}` : null,
        descParts.length > 0 ? `DESCRIPTION:${escapeIcs(descParts.join('\\n'))}` : null,
        `URL:${BASE_URL}/spiel/${m.uuid}`,
        'END:VEVENT',
      ]
        .filter(Boolean)
        .map((l) => foldLine(l as string))

      return lines.join('\r\n')
    })

  const ics = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//SG U.N.S. Rheinhessen//Spielplan//DE',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    `X-WR-CALNAME:SG U.N.S. Rheinhessen – ${team.name}`,
    'X-WR-CALDESC:Spielplan der SG U.N.S. Rheinhessen',
    'X-WR-TIMEZONE:Europe/Berlin',
    ...vevents,
    'END:VCALENDAR',
  ].join('\r\n')

  return new Response(ics, {
    headers: {
      'Content-Type': 'text/calendar; charset=utf-8',
      'Content-Disposition': `inline; filename="${slug}-spielplan.ics"`,
      'Cache-Control': 'public, max-age=3600',
    },
  })
}
