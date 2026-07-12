import Link from 'next/link'
import { getPayload } from 'payload'
import config from '@payload-config'
import type { Metadata } from 'next'
import { fetchSpielplan, fetchTeamName } from '@/lib/sams'
import type { Spiel } from '@/lib/mannschaften'
import PageHeader from '@/components/layout/PageHeader'

export const metadata: Metadata = {
  title: 'Spiele',
  description: 'Spielplan und Ergebnisse aller Mannschaften der SG U.N.S. Rheinhessen.',
}

function parseDate(d: string) {
  const [day, month, year] = d.split('.')
  return new Date(+year, +month - 1, +day).getTime()
}

type SpielMitMannschaft = Spiel & {
  mannschaft: string
  samsTeamName: string
  mannschaftSlug: string
}

export default async function SpielePage({
  searchParams,
}: {
  searchParams: Promise<{ mannschaft?: string }>
}) {
  const { mannschaft: filterSlug } = await searchParams

  const payload = await getPayload({ config })
  const { docs } = await payload.find({
    collection: 'mannschaften',
    limit: 100,
    depth: 0,
  })

  type TeamDoc = (typeof docs)[number] & {
    samsLeagueUuid?: string
    samsTeamUuid?: string
  }

  const teamsWithSams = (docs as TeamDoc[]).filter(
    (t) => t.liga && t.samsLeagueUuid && t.samsTeamUuid,
  )

  const results = await Promise.all(
    teamsWithSams.map(async (t) => {
      const [spielplan, samsTeamName] = await Promise.all([
        fetchSpielplan(t.samsTeamUuid!, t.samsLeagueUuid!).catch(() => ({
          ergebnisse: [] as Spiel[],
          naechsteSpiele: [] as Spiel[],
        })),
        fetchTeamName(t.samsTeamUuid!).catch(() => t.name),
      ])
      return { team: t, spielplan, samsTeamName }
    }),
  )

  const filtered = filterSlug ? results.filter((r) => r.team.slug === filterSlug) : results

  const alleNaechste: SpielMitMannschaft[] = filtered
    .flatMap(({ team, spielplan, samsTeamName }) =>
      spielplan.naechsteSpiele.map((s) => ({
        ...s,
        mannschaft: team.name,
        samsTeamName,
        mannschaftSlug: team.slug,
      })),
    )
    .sort((a, b) => parseDate(a.datum) - parseDate(b.datum))

  const alleErgebnisse: SpielMitMannschaft[] = filtered
    .flatMap(({ team, spielplan, samsTeamName }) =>
      spielplan.ergebnisse.map((s) => ({
        ...s,
        mannschaft: team.name,
        samsTeamName,
        mannschaftSlug: team.slug,
      })),
    )
    .sort((a, b) => parseDate(b.datum) - parseDate(a.datum))

  return (
    <div className="min-h-screen bg-white">
      <PageHeader
        eyebrow="SG U.N.S. Rheinhessen"
        title="Spiele"
        subtitle="Spielplan und Ergebnisse aller Mannschaften"
        backHref="/"
        backLabel="Zurück"
      />

      <div className="max-w-4xl mx-auto px-6 py-16 space-y-16">
        {/* Filter */}
        <div className="flex flex-wrap gap-2">
          <Link
            href="/spiele"
            className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
              !filterSlug
                ? 'bg-secondary text-white'
                : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
            }`}
          >
            Alle
          </Link>
          {teamsWithSams.map((t) => (
            <Link
              key={t.slug}
              href={`/spiele?mannschaft=${t.slug}`}
              className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                filterSlug === t.slug
                  ? 'bg-secondary text-white'
                  : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
              }`}
            >
              {t.name}
            </Link>
          ))}
        </div>

        <section>
          <h2 className="text-2xl font-bold text-secondary mb-6">Nächste Spiele</h2>
          {alleNaechste.length === 0 ? (
            <p className="text-sm text-gray-400">Keine anstehenden Spiele.</p>
          ) : (
            <div className="space-y-2">
              {alleNaechste.map((spiel) => {
                const heimName = spiel.heimspiel ? spiel.samsTeamName : spiel.gegner
                const gastName = spiel.heimspiel ? spiel.gegner : spiel.samsTeamName
                const inner = (
                  <div className="flex items-center gap-3 border border-gray-100 rounded-lg px-4 py-3 text-sm">
                    <div className="w-2 h-2 rounded-full shrink-0 bg-primary" />
                    <span className="text-gray-400 w-20 shrink-0">{spiel.datum}</span>
                    <span className="flex-1 text-secondary font-medium truncate">
                      {heimName} – {gastName}
                    </span>
                    {!filterSlug && (
                      <span className="text-xs text-gray-400 shrink-0 hidden sm:block">
                        {spiel.mannschaft}
                      </span>
                    )}
                    {spiel.uhrzeit && (
                      <span className="text-gray-400 shrink-0">{spiel.uhrzeit}</span>
                    )}
                  </div>
                )
                return spiel.uuid ? (
                  <Link
                    key={spiel.uuid}
                    href={`/spiel/${spiel.uuid}`}
                    className="block hover:opacity-80 transition-opacity"
                  >
                    {inner}
                  </Link>
                ) : (
                  <div key={`${spiel.datum}-${spiel.gegner}`}>{inner}</div>
                )
              })}
            </div>
          )}
        </section>

        <section>
          <h2 className="text-2xl font-bold text-secondary mb-6">Ergebnisse</h2>
          {alleErgebnisse.length === 0 ? (
            <p className="text-sm text-gray-400">Noch keine Ergebnisse.</p>
          ) : (
            <div className="space-y-2">
              {alleErgebnisse.map((spiel) => {
                const heimName = spiel.heimspiel ? spiel.samsTeamName : spiel.gegner
                const gastName = spiel.heimspiel ? spiel.gegner : spiel.samsTeamName
                const parts = spiel.ergebnis?.match(/^(\d+):(\d+)$/)
                const gewonnen = parts
                  ? spiel.heimspiel
                    ? parseInt(parts[1]) > parseInt(parts[2])
                    : parseInt(parts[2]) > parseInt(parts[1])
                  : false
                const inner = (
                  <div className="flex items-center gap-3 border border-gray-100 rounded-lg px-4 py-3 text-sm">
                    <div
                      className={`w-2 h-2 rounded-full shrink-0 ${gewonnen ? 'bg-green-500' : 'bg-red-400'}`}
                    />
                    <span className="text-gray-400 w-20 shrink-0">{spiel.datum}</span>
                    <span className="flex-1 text-secondary font-medium truncate">
                      {heimName} – {gastName}
                    </span>
                    {!filterSlug && (
                      <span className="text-xs text-gray-400 shrink-0 hidden sm:block">
                        {spiel.mannschaft}
                      </span>
                    )}
                    <span
                      className={`font-bold shrink-0 ${gewonnen ? 'text-green-600' : 'text-red-500'}`}
                    >
                      {spiel.ergebnis}
                    </span>
                  </div>
                )
                return spiel.uuid ? (
                  <Link
                    key={spiel.uuid}
                    href={`/spiel/${spiel.uuid}`}
                    className="block hover:opacity-80 transition-opacity"
                  >
                    {inner}
                  </Link>
                ) : (
                  <div key={`${spiel.datum}-${spiel.gegner}`}>{inner}</div>
                )
              })}
            </div>
          )}
        </section>
      </div>
    </div>
  )
}
