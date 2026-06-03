import Link from 'next/link'
import Image from 'next/image'
import ImagePlaceholder from '@/components/ui/ImagePlaceholder'
import { toFlagge } from '@/lib/site'

export type TrainerData = {
  name: string
  fotoUrl?: string | null
  lizenz?: string | null
  aktivSeit?: number | null
  nationalitaet?: string | null
}

export default function TrainerCard({
  trainer,
  clickable = true,
}: {
  trainer: TrainerData
  clickable?: boolean
}) {
  const inner = (
    <div
      className={`group border border-gray-100 rounded-xl overflow-hidden transition-all ${clickable ? 'hover:shadow-md hover:border-primary/30' : ''}`}
    >
      <div className="relative aspect-square bg-secondary/10">
        {trainer.fotoUrl ? (
          <Image
            src={trainer.fotoUrl}
            alt={trainer.name}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-cover object-top"
          />
        ) : (
          <ImagePlaceholder emoji="👤" />
        )}
        {trainer.nationalitaet && (
          <div
            className="absolute top-3 right-3 text-xl leading-none"
            title={trainer.nationalitaet}
          >
            {toFlagge(trainer.nationalitaet)}
          </div>
        )}
      </div>

      <div className="p-4">
        <div className="flex items-start justify-between gap-2">
          <div>
            <p className="font-bold text-secondary text-sm mb-0.5">{trainer.name}</p>
            {trainer.lizenz && (
              <p className="text-xs text-primary font-medium mb-2">{trainer.lizenz}</p>
            )}
          </div>
          {clickable && (
            <span className="text-gray-300 group-hover:text-primary transition-colors text-lg shrink-0">
              →
            </span>
          )}
        </div>
        {trainer.aktivSeit && (
          <div className="mt-3 border-t border-gray-50 pt-3">
            <div className="flex justify-between text-xs text-gray-500">
              <span>Trainer seit</span>
              <span className="font-medium text-secondary">{trainer.aktivSeit}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  )

  if (!clickable) return inner

  return (
    <Link href="/trainer" className="block">
      {inner}
    </Link>
  )
}
