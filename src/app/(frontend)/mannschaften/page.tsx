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
      trainer: m.trainer,
      cotrainer: m.cotrainer ?? undefined,
      training: m.training ?? [],
      halle: halle?.name ?? '',
      halleAdresse: halle?.adresse ?? '',
      beschreibung: m.beschreibung,
      spieler: [],
      spielplan: [],
    }
  })

  const trainingszeilen = docs.flatMap((m) => {
    const halle = m.halle && typeof m.halle === 'object' ? (m.halle as Hallen) : null
    return (m.training ?? []).map((t) => ({
      mannschaft: m.name,
      slug: m.slug,
      halle: halle?.name ?? '–',
      tag: t.tag,
      uhrzeit: t.uhrzeit,
    }))
  }).sort((a, b) => a.halle.localeCompare(b.halle) || a.tag.localeCompare(b.tag))

  return (
    <div className="min-h-screen bg-white">
      <PageHeader eyebrow="SG U.N.S. Rheinhessen" title="Mannschaften" backHref="/" backLabel="Startseite" />

      <div className="max-w-6xl mx-auto px-6 py-16 space-y-16">
        <div className="flex flex-col gap-5">
          {mannschaften.map((team, i) => (
            <TeamCard key={team.slug} team={team} index={i} />
          ))}
        </div>

        <div>
          <h2 className="text-xs font-semibold uppercase tracking-widest text-primary mb-6">Trainingszeiten</h2>
          <div className="border border-gray-100 rounded-xl overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 text-left">
                <tr>
                  <th className="px-5 py-3 font-semibold text-secondary">Halle</th>
                  <th className="px-5 py-3 font-semibold text-secondary">Mannschaft</th>
                  <th className="px-5 py-3 font-semibold text-secondary">Tag</th>
                  <th className="px-5 py-3 font-semibold text-secondary">Uhrzeit</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {trainingszeilen.map((z, i) => (
                  <tr key={i} className="hover:bg-gray-50 transition-colors">
                    <td className="px-5 py-3 text-gray-500">{z.halle}</td>
                    <td className="px-5 py-3">
                      <a href={`/mannschaften/${z.slug}`} className="text-secondary font-medium hover:text-primary transition-colors">
                        {z.mannschaft}
                      </a>
                    </td>
                    <td className="px-5 py-3 text-gray-500">{z.tag}</td>
                    <td className="px-5 py-3 text-gray-500">{z.uhrzeit}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
