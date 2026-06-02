import { notFound } from 'next/navigation'
import Image from 'next/image'
import { getPayload } from 'payload'
import config from '@payload-config'
import type { Media } from '@/payload-types'
import RichTextRenderer from '@/components/ui/RichTextRenderer'
import { formatDatum } from '@/lib/utils'
import { mockArtikel } from '@/lib/artikel'
import BackButton from '@/components/ui/BackButton'

export default async function ArtikelPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const payload = await getPayload({ config })

  const { docs } = await payload.find({
    collection: 'artikel',
    where: { slug: { equals: slug } },
    depth: 1,
    limit: 1,
  })

  if (docs.length > 0) {
    const artikel = docs[0]
    const bildUrl =
      artikel.bild && typeof artikel.bild === 'object'
        ? (artikel.bild as Media).url ?? null
        : null

    return (
      <div className="min-h-screen bg-white">
        <div className="bg-secondary pt-32 pb-16 px-6">
          <div className="max-w-4xl mx-auto">
            <div className="mb-8">
              <BackButton href="/aktuelles" label="Alle Beiträge" variant="dark" />
            </div>
            <div className="flex items-center gap-3 mb-4">
              <span className="bg-primary/20 text-primary text-xs font-semibold px-2.5 py-0.5 rounded-full">
                {artikel.kategorie}
              </span>
              <span className="text-white/50 text-sm">{formatDatum(artikel.datum)}</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight">{artikel.titel}</h1>
          </div>
        </div>

        {bildUrl && (
          <div className="max-w-4xl mx-auto px-6 py-8">
            <div className="relative w-full h-64 md:h-96 rounded-xl overflow-hidden">
              <Image src={bildUrl} alt={artikel.titel} fill className="object-cover" />
            </div>
          </div>
        )}

        <div className="max-w-4xl mx-auto px-6 py-12">
          <p className="text-lg text-gray-600 leading-relaxed mb-8 font-medium border-l-4 border-primary pl-4">
            {artikel.teaser}
          </p>
          <RichTextRenderer
            content={
              artikel.inhalt as { root: Parameters<typeof RichTextRenderer>[0]['content']['root'] }
            }
          />
        </div>
      </div>
    )
  }

  const mock = mockArtikel.find((a) => a.slug === slug)
  if (!mock) notFound()

  return (
    <div className="min-h-screen bg-white">
      <div className="bg-secondary pt-32 pb-16 px-6">
        <div className="max-w-4xl mx-auto">
          <BackButton href="/aktuelles" label="Alle Beiträge" variant="dark" />
          <div className="flex items-center gap-3 mb-4">
            <span className="bg-primary/20 text-primary text-xs font-semibold px-2.5 py-0.5 rounded-full">
              {mock.kategorie}
            </span>
            <span className="text-white/50 text-sm">{formatDatum(mock.datum)}</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight">{mock.titel}</h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-12">
        <p className="text-lg text-gray-600 leading-relaxed border-l-4 border-primary pl-4">
          {mock.teaser}
        </p>
      </div>
    </div>
  )
}
