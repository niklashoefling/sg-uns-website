import Link from 'next/link'
import { getPayload } from 'payload'
import config from '@payload-config'
import ArtikelCard from '@/components/cards/ArtikelCard'
import type { ArtikelData } from '@/components/cards/ArtikelCard'
import { mockArtikel } from '@/lib/artikel'

export default async function AktuellesPreview() {
  const payload = await getPayload({ config })
  const { docs } = await payload.find({
    collection: 'artikel',
    sort: '-datum',
    limit: 3,
    depth: 1,
  })

  const artikel: ArtikelData[] = docs.length > 0 ? docs.slice(0, 3) : mockArtikel.slice(0, 3)

  return (
    <section id="aktuelles" className="py-20 px-6 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-end justify-between mb-12">
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest text-primary mb-3 block">
              News
            </span>
            <h2 className="text-4xl font-bold text-secondary leading-tight">Aktuelles</h2>
          </div>
          <Link
            href="/aktuelles"
            className="hidden sm:inline-flex items-center gap-2 text-sm font-semibold text-secondary hover:text-primary transition-colors"
          >
            Alle News
            <span>→</span>
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {artikel.map((a) => (
            <ArtikelCard key={a.id} artikel={a} headingTag="h3" />
          ))}
        </div>

        <div className="mt-8 text-center sm:hidden">
          <Link
            href="/aktuelles"
            className="text-sm font-semibold text-secondary hover:text-primary transition-colors"
          >
            Alle News →
          </Link>
        </div>
      </div>
    </section>
  )
}
