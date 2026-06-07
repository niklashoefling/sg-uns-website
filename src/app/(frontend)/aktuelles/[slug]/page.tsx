import { notFound } from 'next/navigation'
import Image from 'next/image'
import { getPayload } from 'payload'
import config from '@payload-config'
import type { Metadata } from 'next'
import { resolveMediaUrl } from '@/lib/media'
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
    depth: 1,
    limit: 1,
  })
  if (docs.length > 0) {
    const a = docs[0]
    const description = lexicalToPlainText(a.inhalt).slice(0, 160)
    const imageUrl = resolveMediaUrl(
      typeof a.bild === 'object' && a.bild !== null ? (a.bild as { url?: string }).url : undefined,
    )
    return {
      title: a.titel,
      description,
      openGraph: {
        title: `${a.titel} | SG U.N.S. Rheinhessen`,
        description,
        type: 'article',
        ...(imageUrl ? { images: [{ url: imageUrl, alt: a.titel }] } : {}),
      },
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
  const bildUrl = resolveMediaUrl(artikel.bild)

  return (
    <div className="min-h-screen bg-white">
      <div className="bg-secondary pt-32 pb-16 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <BackButton href="/aktuelles" label="Zurück" variant="dark" />
          </div>
          <div className="flex items-center gap-3 mb-4">
            <span className="bg-primary/20 text-primary text-xs font-semibold px-2.5 py-0.5 rounded-full">
              {artikel.kategorie}
            </span>
            <span className="text-white/50 text-sm">{formatDatum(artikel.datum)}</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight">
            {artikel.titel}
          </h1>
        </div>
      </div>

      {bildUrl && (
        <div className="max-w-4xl mx-auto px-6 py-8">
          <Image
            src={bildUrl}
            alt={artikel.titel}
            width={0}
            height={0}
            sizes="(max-width: 768px) 100vw, 896px"
            priority
            className="w-full h-auto rounded-xl"
          />
        </div>
      )}

      <div className="max-w-4xl mx-auto px-6 py-12">
        <RichTextRenderer
          content={
            artikel.inhalt as { root: Parameters<typeof RichTextRenderer>[0]['content']['root'] }
          }
        />

        <div className="mt-12 pt-6 border-t border-gray-200 flex justify-end">
          <div className="text-right text-sm text-gray-400 space-y-1">
            {artikel.autor && typeof artikel.autor === 'object' && artikel.autor.name && (
              <p>
                <span className="font-medium text-gray-500">Autor:</span> {artikel.autor.name}
              </p>
            )}
            <p>
              <span className="font-medium text-gray-500">Zuletzt bearbeitet:</span>{' '}
              {new Date(artikel.updatedAt).toLocaleDateString('de-DE', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
              })}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
