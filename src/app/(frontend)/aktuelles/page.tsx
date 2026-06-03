import { getPayload } from 'payload'
import config from '@payload-config'
import Link from 'next/link'
import PageHeader from '@/components/layout/PageHeader'
import ArtikelCard from '@/components/cards/ArtikelCard'
import type { ArtikelData } from '@/components/cards/ArtikelCard'

export const metadata = {
  title: 'Aktuelles | SG U.N.S. Rheinhessen',
  description: 'Neuigkeiten und Berichte der SG U.N.S. Rheinhessen.',
}

export const dynamic = 'force-dynamic'

const PAGE_SIZE = 7

export default async function AktuellesPage({
  searchParams,
}: {
  searchParams: Promise<{ seite?: string }>
}) {
  const { seite } = await searchParams
  const page = Math.max(1, parseInt(seite ?? '1', 10))

  const payload = await getPayload({ config })
  const { docs, totalDocs } = await payload.find({
    collection: 'artikel',
    sort: '-datum',
    depth: 1,
    limit: PAGE_SIZE,
    page,
  })

  const artikel: ArtikelData[] = docs
  const totalPages = Math.ceil(totalDocs / PAGE_SIZE)

  return (
    <div className="min-h-screen bg-white">
      <PageHeader
        eyebrow="SG U.N.S. Rheinhessen"
        title="Aktuelles"
        backHref="/"
        backLabel="Zurück"
      />

      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-3 gap-6">
          {artikel.map((a, i) => {
            const isFeatured = i === 0
            return (
              <ArtikelCard
                key={a.id}
                artikel={a}
                featured={isFeatured}
                priority={isFeatured}
                className={isFeatured ? 'md:col-span-3' : ''}
              />
            )
          })}
        </div>

        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 mt-12">
            {page > 1 && (
              <Link
                href={page - 1 === 1 ? '/aktuelles' : `/aktuelles?seite=${page - 1}`}
                className="px-4 py-2 rounded-lg border border-gray-200 text-sm text-secondary hover:border-primary/30 hover:shadow-sm transition-all"
              >
                ← Neuere
              </Link>
            )}
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <Link
                key={p}
                href={p === 1 ? '/aktuelles' : `/aktuelles?seite=${p}`}
                className={`w-9 h-9 rounded-lg flex items-center justify-center text-sm transition-all ${
                  p === page
                    ? 'bg-primary text-white font-semibold'
                    : 'border border-gray-200 text-secondary hover:border-primary/30 hover:shadow-sm'
                }`}
              >
                {p}
              </Link>
            ))}
            {page < totalPages && (
              <Link
                href={`/aktuelles?seite=${page + 1}`}
                className="px-4 py-2 rounded-lg border border-gray-200 text-sm text-secondary hover:border-primary/30 hover:shadow-sm transition-all"
              >
                Ältere →
              </Link>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
