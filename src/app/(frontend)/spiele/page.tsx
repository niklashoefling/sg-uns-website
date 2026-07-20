import { getPayload } from 'payload'
import config from '@payload-config'
import type { Metadata } from 'next'
import Link from 'next/link'
import { fetchSpielplan, fetchTeamName } from '@/lib/sams'
import type { Spiel } from '@/lib/mannschaften'
import PageHeader from '@/components/layout/PageHeader'
import GameCard from '@/components/cards/GameCard'

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

  const teamsWithSams = (docs as TeamDoc[])
    .filter((t) => t.liga && t.samsLeagueUuid && t.samsTeamUuid)
    .sort((a, b) => a.name.localeCompare(b.name, 'de', { numeric: true }))

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
          <h2 className="text-2xl font-bold text-secondary mb-6">Ergebnisse</h2>
          {alleErgebnisse.length === 0 ? (
            <p className="text-sm text-gray-400">Noch keine Ergebnisse.</p>
          ) : (
            <div className="space-y-2">
              {alleErgebnisse.map((spiel) => (
                <GameCard
                  key={spiel.uuid ?? `${spiel.datum}-${spiel.gegner}`}
                  spiel={spiel}
                  teamName={spiel.samsTeamName}
                  label={!filterSlug ? spiel.mannschaft : undefined}
                />
              ))}
            </div>
          )}
        </section>

        <section>
          <h2 className="text-2xl font-bold text-secondary mb-6">Nächste Spiele</h2>
          {alleNaechste.length === 0 ? (
            <p className="text-sm text-gray-400">Keine anstehenden Spiele.</p>
          ) : (
            <div className="space-y-2">
              {alleNaechste.map((spiel) => (
                <GameCard
                  key={spiel.uuid ?? `${spiel.datum}-${spiel.gegner}`}
                  spiel={spiel}
                  teamName={spiel.samsTeamName}
                  label={!filterSlug ? spiel.mannschaft : undefined}
                />
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  )
}
