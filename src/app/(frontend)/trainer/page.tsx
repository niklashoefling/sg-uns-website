import { getPayload } from 'payload'
import config from '@payload-config'
import PageHeader from '@/components/layout/PageHeader'
import TrainerCard, { type TrainerData } from '@/components/cards/TrainerCard'
import { mapUserToTrainerData } from '@/lib/utils'

export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'Trainerstab',
  description:
    'Der Trainerstab der SG U.N.S. Rheinhessen – erfahrene Trainer mit Lizenz für alle Mannschaften.',
}

export default async function TrainerPage() {
  const payload = await getPayload({ config })
  const { docs } = await payload.find({
    collection: 'users',
    where: { rolle: { equals: 'trainer' } },
    depth: 2,
    limit: 50,
  })

  const trainer: TrainerData[] = docs
    .map(mapUserToTrainerData)
    .sort((a, b) => {
      if (a.mannschaft && b.mannschaft) return a.mannschaft.localeCompare(b.mannschaft, 'de')
      if (a.mannschaft) return -1
      if (b.mannschaft) return 1
      return 0
    })

  return (
    <div className="min-h-screen bg-white">
      <PageHeader
        eyebrow="SG U.N.S. Rheinhessen"
        title="Trainerstab"
        backHref="/"
        backLabel="Zurück"
      />

      <div className="max-w-6xl mx-auto px-6 py-16">
        {trainer.length === 0 ? (
          <p className="text-gray-400 text-sm">Noch keine Trainer eingetragen.</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5">
            {trainer.map((t) => (
              <TrainerCard key={t.name} trainer={t} clickable={false} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
