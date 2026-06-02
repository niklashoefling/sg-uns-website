import { getPayload } from 'payload'
import config from '@payload-config'
import PageHeader from '@/components/layout/PageHeader'
import Image from 'next/image'
import type { Metadata } from 'next'
import type { Media } from '@/payload-types'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Hallen | SG U.N.S. Rheinhessen',
  description: 'Spielhallen der SG U.N.S. Rheinhessen – Adressen und Wegbeschreibungen.',
}

export default async function HallenPage() {
  const payload = await getPayload({ config })
  const { docs: hallen } = await payload.find({
    collection: 'hallen',
    sort: 'name',
    depth: 1,
  })

  return (
    <div className="min-h-screen bg-white">
      <PageHeader eyebrow="SG U.N.S. Rheinhessen" title="Hallen" backHref="/" backLabel="Startseite" />

      <div className="max-w-6xl mx-auto px-6 py-16">
        {hallen.length === 0 && (
          <p className="text-gray-400 text-sm">Noch keine Hallen eingetragen.</p>
        )}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {hallen.map((halle) => {
            const fotoUrl = halle.foto && typeof halle.foto === 'object'
              ? (halle.foto as Media).url ?? null
              : null
            const mapsUrl = `https://maps.google.com/maps?q=${encodeURIComponent(halle.adresse)}&output=embed`
            return (
              <div key={halle.id} className="border border-gray-100 rounded-xl overflow-hidden">
                <div className="w-full h-44 relative">
                  {fotoUrl ? (
                    <Image src={fotoUrl} alt={halle.name} fill className="object-cover" />
                  ) : (
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
                  )}
                </div>
                <div className="p-4">
                  <h2 className="text-base font-bold text-secondary mb-0.5">{halle.name}</h2>
                  <p className="text-sm text-gray-500">{halle.adresse}</p>
                  {halle.beschreibung && (
                    <p className="text-xs text-gray-400 mt-1">{halle.beschreibung}</p>
                  )}
                  {fotoUrl && (
                    <a
                      href={`https://maps.google.com/maps?q=${encodeURIComponent(halle.adresse)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-primary hover:underline mt-2 inline-block"
                    >
                      In Google Maps öffnen →
                    </a>
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
