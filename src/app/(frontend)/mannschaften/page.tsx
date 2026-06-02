import { getPayload } from 'payload'
import config from '@payload-config'
import PageHeader from '@/components/layout/PageHeader'
import TeamCard from '@/components/cards/TeamCard'
import type { Mannschaft } from '@/lib/mannschaften'
import type { Hallen } from '@/payload-types'
import { resolveMediaUrl } from '@/lib/media'

export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'Mannschaften | SG U.N.S. Rheinhessen',
  description: 'Alle Herrenmannschaften der SG U.N.S. Rheinhessen – 1., 2. und 3. Herren.',
}

const WOCHENTAGE = ['Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag', 'Sonntag']

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
      saison: m.saison,
      teamfoto: resolveMediaUrl(m.teamfoto) ?? undefined,
      trainer: ((m.trainer as unknown[]) ?? [])
        .filter((t) => typeof t === 'object' && t !== null)
        .map((t) => {
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
        backLabel="Startseite"
      />

      <div className="max-w-6xl mx-auto px-6 py-16 space-y-16">
        <div className="flex flex-col gap-5">
          {mannschaften.map((team, i) => (
            <TeamCard key={team.slug} team={team} index={i} />
          ))}
        </div>

        <div>
          <h2 className="text-xs font-semibold uppercase tracking-widest text-primary mb-6">
            Trainingszeiten
          </h2>
          <div className="border border-gray-100 rounded-xl overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 text-left">
                <tr>
                  <th className="px-5 py-3 font-semibold text-secondary">Mannschaft</th>
                  <th className="px-5 py-3 font-semibold text-secondary">Halle</th>
                  <th className="px-5 py-3 font-semibold text-secondary">Tag</th>
                  <th className="px-5 py-3 font-semibold text-secondary">Uhrzeit</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {trainingsgruppen.map((gruppe) =>
                  gruppe.zeilen.map((z, zi) => {
                    const halleWiederholt = zi > 0 && gruppe.zeilen[zi - 1].halle === z.halle
                    return (
                      <tr
                        key={`${gruppe.slug}-${zi}`}
                        className="hover:bg-gray-50 transition-colors"
                      >
                        <td className="px-5 py-3">
                          {zi === 0 ? (
                            <a
                              href={`/mannschaften/${gruppe.slug}`}
                              className="text-secondary font-medium hover:text-primary transition-colors"
                            >
                              {gruppe.mannschaft}
                            </a>
                          ) : null}
                        </td>
                        <td className="px-5 py-3 text-gray-500">
                          {!halleWiederholt ? (
                            <a href="/hallen" className="hover:text-primary transition-colors">
                              {z.halle}
                            </a>
                          ) : null}
                        </td>
                        <td className="px-5 py-3 text-gray-500">{z.tag}</td>
                        <td className="px-5 py-3 text-gray-500">{z.uhrzeit}</td>
                      </tr>
                    )
                  }),
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
