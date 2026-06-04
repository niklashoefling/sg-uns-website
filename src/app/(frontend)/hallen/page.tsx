import { getPayload } from 'payload'
import config from '@payload-config'
import PageHeader from '@/components/layout/PageHeader'
import Image from 'next/image'
import type { Metadata } from 'next'
import { resolveMediaUrl } from '@/lib/media'
export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Hallen | SG U.N.S. Rheinhessen',
  description: 'Spielhallen der SG U.N.S. Rheinhessen - Adressen und Wegbeschreibungen.',
}

export default async function HallenPage() {
  const payload = await getPayload({ config })
  const [{ docs: hallen }, { docs: mannschaften }] = await Promise.all([
    payload.find({ collection: 'hallen', sort: 'name', depth: 1 }),
    payload.find({ collection: 'mannschaften', sort: 'name', depth: 0, limit: 100 }),
  ])

  const mannschaftenByHalle = mannschaften.reduce<Record<string, { name: string; slug: string }[]>>(
    (acc, m) => {
      const halleId = typeof m.halle === 'object' ? m.halle?.id : m.halle
      if (!halleId) return acc
      const key = String(halleId)
      acc[key] = [...(acc[key] ?? []), { name: m.name, slug: m.slug }]
      return acc
    },
    {},
  )

  return (
    <div className="min-h-screen bg-white">
      <PageHeader eyebrow="SG U.N.S. Rheinhessen" title="Hallen" backHref="/" backLabel="Zurück" />

      <div className="max-w-6xl mx-auto px-6 py-16">
        {hallen.length === 0 && (
          <p className="text-gray-400 text-sm">Noch keine Hallen eingetragen.</p>
        )}
        <div className="grid md:grid-cols-2 gap-6">
          {hallen.map((halle) => {
            const fotoUrl = resolveMediaUrl(halle.foto)
            const mapsUrl = `https://maps.google.com/?q=${encodeURIComponent(halle.adresse)}`
            const teams = mannschaftenByHalle[String(halle.id)] ?? []
            return (
              <div key={halle.id} className="border border-gray-100 rounded-xl overflow-hidden">
                {fotoUrl && (
                  <div className="relative h-48 w-full">
                    <Image
                      src={fotoUrl}
                      alt={halle.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                )}
                <div className="p-5">
                  <h2 className="text-base font-bold text-secondary mb-0.5">{halle.name}</h2>
                  <p className="text-sm text-gray-500">{halle.adresse}</p>
                  {halle.beschreibung && (
                    <p className="text-xs text-gray-400 mt-1">{halle.beschreibung}</p>
                  )}
                  <a
                    href={mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 mt-3 text-xs font-medium text-primary hover:underline transition-colors"
                  >
                    <svg
                      className="size-3.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    In Google Maps öffnen
                  </a>
                  {teams.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {' '}
                      {teams.map((t) => (
                        <a
                          key={t.slug}
                          href={`/mannschaften/${t.slug}`}
                          className="text-xs bg-secondary/5 hover:bg-secondary/10 text-secondary font-medium px-2.5 py-1 rounded-full transition-colors"
                        >
                          {t.name}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
