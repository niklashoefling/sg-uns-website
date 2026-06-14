import Link from 'next/link'
import Image from 'next/image'
import type { Mannschaft } from '@/lib/mannschaften'
import CategoryBadge from '@/components/ui/CategoryBadge'
import ImagePlaceholder from '@/components/ui/ImagePlaceholder'

export default function TeamCard({ team }: { team: Mannschaft; index: number }) {
  return (
    <Link
      href={`/mannschaften/${team.slug}`}
      className="group border border-gray-100 rounded-xl overflow-hidden hover:border-primary/30 hover:shadow-md transition-all flex flex-col md:flex-row md:items-stretch"
    >
      <div className="relative w-full md:w-56 aspect-4/3 md:aspect-auto md:h-auto shrink-0 bg-secondary/10">
        {team.teamfoto ? (
          <Image
            src={team.teamfoto}
            alt={`${team.name} Vorschau`}
            fill
            sizes="(max-width: 768px) 100vw, 224px"
            className="object-cover object-center group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <ImagePlaceholder emoji="🏐" size="md" />
        )}
      </div>

      <div className="flex flex-1 flex-col md:flex-row md:items-center gap-4 p-6 md:py-8">
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-3 mb-1">
            <h2 className="text-xl font-bold text-secondary">{team.name}</h2>
            {team.liga && <CategoryBadge label={team.liga} />}
          </div>
          <p className="text-sm text-gray-500 line-clamp-3">{team.beschreibung}</p>
        </div>

        <span className="shrink-0 text-gray-300 group-hover:text-primary transition-colors text-xl hidden md:block">
          →
        </span>
      </div>
    </Link>
  )
}
