import Link from 'next/link'
import Image from 'next/image'
import ImagePlaceholder from '@/components/ui/ImagePlaceholder'

export type TrainerData = {
  name: string
  fotoUrl?: string | null
  lizenz?: string | null
  aktivSeit?: number | null
}

export default function TrainerCard({ trainer }: { trainer: TrainerData }) {
  return (
    <Link
      href="/trainer"
      className="border border-gray-100 rounded-xl overflow-hidden hover:shadow-md hover:border-primary/30 transition-all block"
    >
      <div className="relative h-48 bg-secondary/10">
        {trainer.fotoUrl ? (
          <Image
            src={trainer.fotoUrl}
            alt={trainer.name}
            fill
            className="object-cover object-top"
          />
        ) : (
          <ImagePlaceholder emoji="👤" />
        )}
      </div>

      <div className="p-4">
        <p className="font-bold text-secondary text-sm mb-0.5">{trainer.name}</p>
        {trainer.lizenz && (
          <p className="text-xs text-primary font-medium mb-2">{trainer.lizenz}</p>
        )}
        {trainer.aktivSeit && (
          <div className="mt-3 border-t border-gray-50 pt-3">
            <div className="flex justify-between text-xs text-gray-500">
              <span>Trainer seit</span>
              <span className="font-medium text-secondary">{trainer.aktivSeit}</span>
            </div>
          </div>
        )}
      </div>
    </Link>
  )
}
