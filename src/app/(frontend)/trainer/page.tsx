import { getPayload } from 'payload'
import config from '@payload-config'
import PageHeader from '@/components/layout/PageHeader'
import TrainerCard, { type TrainerData } from '@/components/cards/TrainerCard'
import { mapUserToTrainerData, filterRelations } from '@/lib/utils'

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

  const trainer: TrainerData[] = filterRelations(docs as unknown[]).map(mapUserToTrainerData)

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
