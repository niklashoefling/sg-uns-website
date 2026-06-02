import { notFound } from 'next/navigation'
import Image from 'next/image'
import { getPayload } from 'payload'
import config from '@payload-config'
import type { Metadata } from 'next'
import type { Media } from '@/payload-types'
import RichTextRenderer from '@/components/ui/RichTextRenderer'
import { formatDatum, lexicalToPlainText } from '@/lib/utils'
import BackButton from '@/components/ui/BackButton'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const payload = await getPayload({ config })
  const { docs } = await payload.find({
    collection: 'artikel',
    where: { slug: { equals: slug } },
    depth: 0,
    limit: 1,
  })
  if (docs.length > 0) {
    const a = docs[0]
    return {
      title: `${a.titel} | SG U.N.S. Rheinhessen`,
      description: lexicalToPlainText(a.inhalt).slice(0, 160),
    }
  }
  return {}
}

export default async function ArtikelPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const payload = await getPayload({ config })

  const { docs } = await payload.find({
    collection: 'artikel',
    where: { slug: { equals: slug } },
    depth: 1,
    limit: 1,
  })

  if (docs.length === 0) notFound()

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
        <RichTextRenderer
          content={
            artikel.inhalt as { root: Parameters<typeof RichTextRenderer>[0]['content']['root'] }
          }
        />
      </div>
    </div>
  )
}
