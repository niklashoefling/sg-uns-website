import type { Spiel, SpielDetail, Tabelle } from '@/lib/mannschaften'

const SAMS_BASE = 'https://www.vvrp.de/api/v2'
const SG_UNS_NAMES = ['u.n.s', 'sg uns', 'sg u.n.s']

// ---- SAMS API types ----

type SamsSet = {
  number: number
  ballPoints: string
  winner: 'TEAM_1' | 'TEAM_2'
}

type SamsLocation = {
  uuid: string
  name: string
  longitude?: number
  latitude?: number
  address?: {
    street?: string
    postcode?: string
    city?: string
  }
}

type SamsTeamEmbed = {
  uuid: string
  name: string
}

export type SamsLeagueMatch = {
  uuid: string
  date?: string
  time?: string
  /** UUID of the home team */
  host?: string
  team1Description?: string
  team2Description?: string
  results?: {
    winner?: 'TEAM_1' | 'TEAM_2'
    setPoints?: string
    sets?: SamsSet[]
  } | null
  location?: SamsLocation
  leagueUuid?: string
  indefinitelyRescheduled?: boolean
  _embedded?: {
    team1?: SamsTeamEmbed
    team2?: SamsTeamEmbed
  }
}

type SamsPage<T> = {
  content: T[]
  last: boolean
}

type SamsRankingEntry = {
  teamName: string
  rank: number
  matchesPlayed: number
  points: number
  wins: number
  losses: number
  setWins: number
  setLosses: number
  ballWins: number
  ballLosses: number
}

// ---- API helper ----

export async function samsGet<T>(path: string, params?: Record<string, string>): Promise<T> {
  const apiKey = process.env.SAMS_API_KEY
  if (!apiKey) throw new Error('SAMS_API_KEY not set')

  const url = new URL(`${SAMS_BASE}${path}`)
  if (params) {
    for (const [k, v] of Object.entries(params)) url.searchParams.set(k, v)
  }

  const res = await fetch(url.toString(), {
    headers: { 'X-Api-Key': apiKey },
    next: { revalidate: 3600 },
  })

  if (!res.ok) throw new Error(`SAMS API error: ${res.status} ${path}`)
  return res.json() as Promise<T>
}

export async function samsGetAll<T>(path: string, params?: Record<string, string>): Promise<T[]> {
  const all: T[] = []
  let page = 0
  while (true) {
    const data = await samsGet<SamsPage<T>>(path, { ...params, size: '100', page: String(page) })
    all.push(...data.content)
    if (data.last) break
    page++
  }
  return all
}

function isOwnTeam(name: string): boolean {
  const lower = name.toLowerCase()
  return SG_UNS_NAMES.some((n) => lower.includes(n))
}

function formatDate(isoDate?: string): string {
  if (!isoDate) return ''
  return new Date(isoDate).toLocaleDateString('de-DE', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  })
}

function formatTime(timeStr?: string): string {
  if (!timeStr || timeStr.startsWith('00:00')) return ''
  return timeStr.slice(0, 5)
}

export function resolveTeams(m: SamsLeagueMatch): { heimteam: string; gastteam: string } {
  const t1 = m._embedded?.team1?.name ?? m.team1Description ?? 'Team 1'
  const t2 = m._embedded?.team2?.name ?? m.team2Description ?? 'Team 2'
  // host is a UUID — match against embedded team UUIDs
  if (m.host && m._embedded?.team1 && m._embedded?.team2) {
    return m.host === m._embedded.team1.uuid
      ? { heimteam: t1, gastteam: t2 }
      : { heimteam: t2, gastteam: t1 }
  }
  return { heimteam: t1, gastteam: t2 }
}

// ---- Public API ----

export async function fetchTeamName(teamUuid: string): Promise<string> {
  const team = await samsGet<{ name: string }>(`/teams/${teamUuid}`)
  return team.name
}

export async function fetchSpielplan(
  teamUuid: string,
  leagueUuid: string,
  options?: { limit?: number },
): Promise<{ ergebnisse: Spiel[]; naechsteSpiele: Spiel[] }> {
  const matches = await samsGetAll<SamsLeagueMatch>('/league-matches', {
    'for-team': teamUuid,
    'for-league': leagueUuid,
  })

  const now = Date.now()
  const limit = options?.limit

  const mapped = matches
    .filter((m) => !m.indefinitelyRescheduled)
    .sort((a, b) => new Date(a.date ?? 0).getTime() - new Date(b.date ?? 0).getTime())
    .map((m) => {
      const { heimteam, gastteam } = resolveTeams(m)
      const heimspiel = isOwnTeam(heimteam)
      const timestamp = m.date ? new Date(m.date).getTime() : 0
      return {
        uuid: m.uuid,
        datum: formatDate(m.date),
        uhrzeit: formatTime(m.time),
        heimspiel,
        gegner: heimspiel ? gastteam : heimteam,
        ergebnis: m.results?.setPoints ?? undefined,
        _ts: timestamp,
      }
    })

  const ergebnisse = mapped
    .filter((m) => m.ergebnis || m._ts < now)
    .slice(limit !== undefined ? -limit : 0)
    .map(({ _ts: _, ...rest }) => rest satisfies Spiel)

  const naechsteSpiele = mapped
    .filter((m) => !m.ergebnis && m._ts >= now)
    .slice(0, limit)
    .map(({ _ts: _, ...rest }) => rest satisfies Spiel)

  return { ergebnisse, naechsteSpiele }
}

export async function fetchTabelle(
  leagueUuid: string,
  zonen?: { aufstieg?: number; abstieg?: number },
): Promise<Tabelle> {
  const [league, entries] = await Promise.all([
    samsGet<{ name: string }>(`/leagues/${leagueUuid}`),
    samsGetAll<SamsRankingEntry>(`/leagues/${leagueUuid}/rankings`),
  ])

  return {
    liga: league.name,
    saison: '',
    stand: new Date().toLocaleDateString('de-DE', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    }),
    aufstieg: zonen?.aufstieg,
    abstieg: zonen?.abstieg,
    eintraege: entries.map((e) => ({
      platz: e.rank,
      verein: e.teamName,
      spiele: e.matchesPlayed,
      siege: e.wins,
      niederlagen: e.losses,
      saetze_gewonnen: e.setWins,
      saetze_verloren: e.setLosses,
      punkte_gewonnen: e.ballWins,
      punkte_verloren: e.ballLosses,
      punkte: e.points,
      highlight: isOwnTeam(e.teamName),
    })),
  }
}

export async function fetchSpiel(uuid: string): Promise<SpielDetail> {
  const m = await samsGet<SamsLeagueMatch>(`/league-matches/${uuid}`)
  const { heimteam, gastteam } = resolveTeams(m)

  const a = m.location?.address
  const adresse = a
    ? [a.street, [a.postcode, a.city].filter(Boolean).join(' ')].filter(Boolean).join(', ')
    : undefined

  const loc = m.location
  const mapsUrl = loc
    ? loc.latitude && loc.longitude
      ? `https://www.google.com/maps/search/?api=1&query=${loc.latitude},${loc.longitude}`
      : adresse
        ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(adresse)}`
        : undefined
    : undefined

  let ligaName: string | undefined
  if (m.leagueUuid) {
    try {
      const league = await samsGet<{ name: string }>(`/leagues/${m.leagueUuid}`)
      ligaName = league.name
    } catch {
      // non-fatal
    }
  }

  return {
    uuid: m.uuid,
    datum: formatDate(m.date),
    uhrzeit: formatTime(m.time),
    heimteam,
    gastteam,
    ergebnis: m.results?.setPoints ?? undefined,
    saetze: m.results?.sets?.map((s) => ({ nummer: s.number, punkte: s.ballPoints })),
    ort: loc ? { name: loc.name, adresse, mapsUrl } : undefined,
    ligaName,
  }
}
