import Link from 'next/link'
import Image from 'next/image'
import { getPayload } from 'payload'
import config from '@payload-config'
import type { Artikel, Media } from '@/payload-types'

function formatDatum(datum: string) {
  return new Date(datum).toLocaleDateString('de-DE', { day: 'numeric', month: 'long', year: 'numeric' })
}

export default async function AktuellesPreview() {
  const payload = await getPayload({ config })
  const { docs } = await payload.find({
    collection: 'artikel',
    sort: '-datum',
    limit: 3,
    depth: 1,
  })

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

        {docs.length === 0 ? (
          <p className="text-sm text-gray-400">Noch keine Beiträge vorhanden.</p>
        ) : (
          <div className="grid md:grid-cols-3 gap-6">
            {docs.map((artikel: Artikel) => {
              const bildUrl = artikel.bild && typeof artikel.bild === 'object'
                ? (artikel.bild as Media).url ?? null
                : null

              return (
                <Link
                  key={artikel.id}
                  href={`/aktuelles/${artikel.slug}`}
                  className="bg-white border border-gray-100 rounded-xl overflow-hidden hover:shadow-md transition-shadow group"
                >
                  <div className="h-40 bg-secondary/10 relative">
                    {bildUrl ? (
                      <Image src={bildUrl} alt={artikel.titel} fill className="object-cover" />
                    ) : (
                      <div className="w-full h-full bg-secondary flex items-center justify-center">
                        <span className="text-5xl opacity-20">🏐</span>
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="bg-primary/10 text-primary text-xs font-semibold px-2.5 py-0.5 rounded-full">
                        {artikel.kategorie}
                      </span>
                      <span className="text-xs text-gray-400">{formatDatum(artikel.datum)}</span>
                    </div>
                    <h3 className="text-base font-bold text-secondary mb-2 group-hover:text-primary transition-colors">
                      {artikel.titel}
                    </h3>
                    <p className="text-sm text-gray-500 leading-relaxed line-clamp-3">{artikel.teaser}</p>
                  </div>
                </Link>
              )
            })}
          </div>
        )}

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
