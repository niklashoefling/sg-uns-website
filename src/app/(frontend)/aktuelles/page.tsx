import Link from 'next/link'
import Image from 'next/image'
import { getPayload } from 'payload'
import config from '@payload-config'
import type { Artikel, Media } from '@/payload-types'

export const dynamic = 'force-dynamic'

function formatDatum(datum: string) {
  return new Date(datum).toLocaleDateString('de-DE', { day: 'numeric', month: 'long', year: 'numeric' })
}

export default async function AktuellesPage() {
  const payload = await getPayload({ config })
  const { docs } = await payload.find({
    collection: 'artikel',
    sort: '-datum',
    depth: 1,
  })

  return (
    <div className="min-h-screen bg-white">
      <div className="bg-secondary pt-32 pb-16 px-6">
        <div className="max-w-6xl mx-auto">
          <span className="text-xs font-semibold uppercase tracking-widest text-primary mb-3 block">
            SG U.N.S. Rheinhessen
          </span>
          <h1 className="text-5xl font-bold text-white">Aktuelles</h1>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-16">
        {docs.length === 0 ? (
          <p className="text-gray-400 text-sm">Noch keine Beiträge vorhanden.</p>
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
                  className="group border border-gray-100 rounded-xl overflow-hidden hover:shadow-md transition-shadow"
                >
                  <div className="h-44 bg-secondary/10 relative">
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
                    <h2 className="text-base font-bold text-secondary mb-2 group-hover:text-primary transition-colors">
                      {artikel.titel}
                    </h2>
                    <p className="text-sm text-gray-500 leading-relaxed line-clamp-3">{artikel.teaser}</p>
                  </div>
                </Link>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
