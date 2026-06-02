import Link from 'next/link'
import Image from 'next/image'
import { formatDatum, lexicalToPlainText } from '@/lib/utils'
import { resolveMediaUrl } from '@/lib/media'
import CategoryBadge from '@/components/ui/CategoryBadge'
import ImagePlaceholder from '@/components/ui/ImagePlaceholder'

export type ArtikelData = {
  id: string | number
  slug: string
  titel: string
  datum: string
  kategorie: string
  inhalt?: unknown
  bild?: { url?: string | null } | string | number | null
}

type Props = {
  artikel: ArtikelData
  headingTag?: 'h2' | 'h3'
  featured?: boolean
}

export default function ArtikelCard({
  artikel,
  headingTag: Heading = 'h2',
  featured = false,
}: Props) {
  const bildUrl = resolveMediaUrl(artikel.bild)
  const text = lexicalToPlainText(artikel.inhalt)

  if (featured) {
    return (
      <Link
        href={`/aktuelles/${artikel.slug}`}
        className="group border border-gray-100 rounded-xl overflow-hidden hover:shadow-md transition-shadow md:flex"
      >
        <div className="md:w-1/2 h-56 md:h-auto bg-secondary/10 relative shrink-0">
          {bildUrl ? (
            <Image src={bildUrl} alt={artikel.titel} fill className="object-cover" />
          ) : (
            <div className="w-full h-full bg-secondary relative">
              <ImagePlaceholder emoji="🏐" />
            </div>
          )}
        </div>
        <div className="p-8 flex flex-col justify-center">
          <div className="flex items-center gap-2 mb-4">
            <CategoryBadge label={artikel.kategorie} />
            <span className="text-xs text-gray-400">{formatDatum(artikel.datum)}</span>
          </div>
          <Heading className="text-2xl font-bold text-secondary mb-3 group-hover:text-primary transition-colors">
            {artikel.titel}
          </Heading>
          <p className="text-sm text-gray-500 leading-relaxed line-clamp-4">{text}</p>
        </div>
      </Link>
    )
  }

  return (
    <Link
      href={`/aktuelles/${artikel.slug}`}
      className="group border border-gray-100 rounded-xl overflow-hidden hover:shadow-md transition-shadow"
    >
      <div className="h-44 bg-secondary/10 relative">
        {bildUrl ? (
          <Image src={bildUrl} alt={artikel.titel} fill className="object-cover" />
        ) : (
          <div className="w-full h-full bg-secondary relative">
            <ImagePlaceholder emoji="🏐" />
          </div>
        )}
      </div>
      <div className="p-6">
        <div className="flex items-center gap-2 mb-3">
          <CategoryBadge label={artikel.kategorie} />
          <span className="text-xs text-gray-400">{formatDatum(artikel.datum)}</span>
        </div>
        <Heading className="text-base font-bold text-secondary mb-2 group-hover:text-primary transition-colors">
          {artikel.titel}
        </Heading>
        <p className="text-sm text-gray-500 leading-relaxed line-clamp-3">{text}</p>
      </div>
    </Link>
  )
}
