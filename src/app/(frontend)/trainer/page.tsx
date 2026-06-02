import { getPayload } from 'payload'
import config from '@payload-config'
import PageHeader from '@/components/layout/PageHeader'
import TrainerCard, { type TrainerData } from '@/components/cards/TrainerCard'
import { resolveMediaUrl } from '@/lib/media'

export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'Trainerstab | SG U.N.S. Rheinhessen',
  description: 'Der Trainerstab der SG U.N.S. Rheinhessen.',
}

export default async function TrainerPage() {
  const payload = await getPayload({ config })
  const { docs } = await payload.find({
    collection: 'users',
    where: { rolle: { equals: 'trainer' } },
    depth: 1,
    limit: 50,
  })

  const trainer: TrainerData[] = docs.map((u) => ({
    name: (u as any).name ?? u.email ?? '–',
    email: u.email,
    fotoUrl: resolveMediaUrl((u as any).foto),
    lizenz: (u as any).lizenz,
    kurzvorstellung: (u as any).kurzvorstellung,
    aktivSeit: (u as any).aktivSeit,
  }))

  return (
    <div className="min-h-screen bg-white">
      <PageHeader
        eyebrow="SG U.N.S. Rheinhessen"
        title="Trainerstab"
        backHref="/"
        backLabel="Startseite"
      />

      <div className="max-w-6xl mx-auto px-6 py-16">
        {trainer.length === 0 ? (
          <p className="text-gray-400 text-sm">Noch keine Trainer eingetragen.</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5">
            {trainer.map((t) => (
              <TrainerCard key={t.email ?? t.name} trainer={t} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
