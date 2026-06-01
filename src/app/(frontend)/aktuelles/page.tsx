import { getPayload } from 'payload'
import config from '@payload-config'
import PageHeader from '@/components/layout/PageHeader'
import ArtikelCard from '@/components/cards/ArtikelCard'
import type { ArtikelData } from '@/components/cards/ArtikelCard'
import { mockArtikel } from '@/lib/artikel'

export const dynamic = 'force-dynamic'

export default async function AktuellesPage() {
  const payload = await getPayload({ config })
  const { docs } = await payload.find({
    collection: 'artikel',
    sort: '-datum',
    depth: 1,
  })

  const artikel: ArtikelData[] = docs.length > 0 ? docs : mockArtikel

  return (
    <div className="min-h-screen bg-white">
      <PageHeader eyebrow="SG U.N.S. Rheinhessen" title="Aktuelles" />

      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-3 gap-6">
          {artikel.map((a) => (
            <ArtikelCard key={a.id} artikel={a} />
          ))}
        </div>
      </div>
    </div>
  )
}
