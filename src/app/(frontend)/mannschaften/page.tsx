import { getPayload } from 'payload'
import config from '@payload-config'
import PageHeader from '@/components/layout/PageHeader'
import TeamCard from '@/components/cards/TeamCard'
import SectionHeading from '@/components/ui/SectionHeading'
import type { Mannschaft } from '@/lib/mannschaften'
import type { Hallen } from '@/payload-types'
import { resolveMediaUrl } from '@/lib/media'
import { filterRelations } from '@/lib/utils'
import { WOCHENTAGE } from '@/lib/site'

export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'Mannschaften | SG U.N.S. Rheinhessen',
  description: 'Alle Herrenmannschaften der SG U.N.S. Rheinhessen.',
}

type TrainingsGruppe = {
  mannschaft: string
  slug: string
  zeilen: { halle: string; tag: string; uhrzeit: string }[]
}

export default async function MannschaftenPage() {
  const payload = await getPayload({ config })
  const { docs } = await payload.find({
    collection: 'mannschaften',
    sort: 'name',
    depth: 1,
  })

  const mannschaften: Mannschaft[] = docs.map((m) => {
    const halle = m.halle && typeof m.halle === 'object' ? (m.halle as Hallen) : null
    return {
      slug: m.slug,
      name: m.name,
      liga: m.liga,
      teamfoto: resolveMediaUrl(m.teamfoto) ?? undefined,
      trainer: filterRelations((m.trainer as unknown[]) ?? []).map((t) => {
        const u = t as { email?: string; name?: string }
        return { name: u.name ?? u.email ?? '–', email: u.email }
      }),
      training: m.training ?? [],
      halle: halle?.name ?? '',
      halleAdresse: halle?.adresse ?? '',
      beschreibung: m.beschreibung,
      spieler: [],
      spielplan: [],
    }
  })

  const trainingsgruppen: TrainingsGruppe[] = docs
    .map((m) => {
      const halle = m.halle && typeof m.halle === 'object' ? (m.halle as Hallen) : null
      const zeilen = (m.training ?? [])
        .map((t) => ({ halle: halle?.name ?? '–', tag: t.tag, uhrzeit: t.uhrzeit }))
        .sort((a, b) => {
          const tagDiff = WOCHENTAGE.indexOf(a.tag) - WOCHENTAGE.indexOf(b.tag)
          return tagDiff !== 0 ? tagDiff : a.uhrzeit.localeCompare(b.uhrzeit)
        })
      return { mannschaft: m.name, slug: m.slug, zeilen }
    })
    .filter((g) => g.zeilen.length > 0)

  return (
    <div className="min-h-screen bg-white">
      <PageHeader
        eyebrow="SG U.N.S. Rheinhessen"
        title="Mannschaften"
        backHref="/"
        backLabel="Zurück"
      />

      <div className="max-w-6xl mx-auto px-6 py-16 space-y-16">
        <div className="flex flex-col gap-5">
          {mannschaften.map((team, i) => (
            <TeamCard key={team.slug} team={team} index={i} />
          ))}
        </div>

        <div>
          <SectionHeading>Trainingszeiten</SectionHeading>

          <div className="space-y-4">
            {trainingsgruppen.map((gruppe) => (
              <div key={gruppe.slug} className="border border-gray-100 rounded-xl overflow-hidden">
                <div className="bg-gray-50 px-4 py-2">
                  <a
                    href={`/mannschaften/${gruppe.slug}`}
                    className="text-sm font-semibold text-secondary hover:text-primary transition-colors"
                  >
                    {gruppe.mannschaft}
                  </a>
                </div>
                <div className="divide-y divide-gray-100">
                  {gruppe.zeilen.map((z, zi) => (
                    <div key={zi} className="px-4 py-3 text-sm">
                      <div className="font-medium text-secondary">
                        {z.tag} · {z.uhrzeit}
                      </div>
                      <div className="text-gray-500 mt-0.5">
                        <a
                          href="/hallen"
                          className="underline hover:text-primary transition-colors"
                        >
                          {z.halle}
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
