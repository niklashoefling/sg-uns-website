import { getPayload } from 'payload'
import config from '@payload-config'
import PageHeader from '@/components/layout/PageHeader'
import type { Metadata } from 'next'

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
  })

  return (
    <div className="min-h-screen bg-white">
      <PageHeader eyebrow="SG U.N.S. Rheinhessen" title="Hallen" backHref="/" backLabel="Startseite" />

      <div className="max-w-6xl mx-auto px-6 py-16 space-y-12">
        {hallen.length === 0 && (
          <p className="text-gray-400 text-sm">Noch keine Hallen eingetragen.</p>
        )}
        {hallen.map((halle) => {
          const mapsUrl = `https://maps.google.com/maps?q=${encodeURIComponent(halle.adresse)}&output=embed`
          return (
            <div key={halle.id} className="border border-gray-100 rounded-xl overflow-hidden">
              <div className="p-6 md:p-8">
                <h2 className="text-xl font-bold text-secondary mb-1">{halle.name}</h2>
                <p className="text-sm text-gray-500 mb-1">{halle.adresse}</p>
                {halle.beschreibung && (
                  <p className="text-sm text-gray-400 mt-2">{halle.beschreibung}</p>
                )}
              </div>
              <div className="w-full h-64 md:h-80">
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
          )
        })}
      </div>
    </div>
  )
}
