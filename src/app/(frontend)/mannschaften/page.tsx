import { getPayload } from 'payload'
import config from '@payload-config'
import PageHeader from '@/components/layout/PageHeader'
import TeamCard from '@/components/cards/TeamCard'
import type { Mannschaft } from '@/lib/mannschaften'
import type { Media, Hallen } from '@/payload-types'

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
      teamfoto:
        m.teamfoto && typeof m.teamfoto === 'object'
          ? (m.teamfoto as Media).url ?? undefined
          : undefined,
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

  return (
    <div className="min-h-screen bg-white">
      <PageHeader eyebrow="SG U.N.S. Rheinhessen" title="Mannschaften" backHref="/" backLabel="Startseite" />

      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="flex flex-col gap-5">
          {mannschaften.map((team, i) => (
            <TeamCard key={team.slug} team={team} index={i} />
          ))}
        </div>
      </div>
    </div>
  )
}
