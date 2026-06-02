import { getPayload } from 'payload'
import config from '@payload-config'
import PageHeader from '@/components/layout/PageHeader'
import type { Metadata } from 'next'
import { resolveMediaUrl } from '@/lib/media'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Hallen | SG U.N.S. Rheinhessen',
  description: 'Spielhallen der SG U.N.S. Rheinhessen – Adressen und Wegbeschreibungen.',
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
    {}
  )

  return (
    <div className="min-h-screen bg-white">
      <PageHeader eyebrow="SG U.N.S. Rheinhessen" title="Hallen" backHref="/" backLabel="Startseite" />

      <div className="max-w-6xl mx-auto px-6 py-16">
        {hallen.length === 0 && (
          <p className="text-gray-400 text-sm">Noch keine Hallen eingetragen.</p>
        )}
        <div className="grid md:grid-cols-2 gap-6">
          {hallen.map((halle) => {
            const fotoUrl = resolveMediaUrl(halle.foto)
            const mapsUrl = `https://maps.google.com/maps?q=${encodeURIComponent(halle.adresse)}&output=embed`
            const teams = mannschaftenByHalle[String(halle.id)] ?? []
            return (
              <div key={halle.id} className="border border-gray-100 rounded-xl overflow-hidden">
                <div className="flex h-56">
                  {fotoUrl && (
                    <>
                      <div className="w-1/2 shrink-0">
                        <img src={fotoUrl} alt={halle.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="w-px bg-gray-100 shrink-0" />
                    </>
                  )}
                  <div className={fotoUrl ? 'w-1/2' : 'w-full'}>
                    <iframe
                      src={mapsUrl}
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title={`Karte: ${halle.name}`}
                    />
                  </div>
                </div>
                <div className="p-5">
                  <h2 className="text-base font-bold text-secondary mb-0.5">{halle.name}</h2>
                  <p className="text-sm text-gray-500">{halle.adresse}</p>
                  {halle.beschreibung && (
                    <p className="text-xs text-gray-400 mt-1">{halle.beschreibung}</p>
                  )}
                  {teams.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-2">
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
