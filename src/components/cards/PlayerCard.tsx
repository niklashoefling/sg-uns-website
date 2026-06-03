import Image from 'next/image'
import ImagePlaceholder from '@/components/ui/ImagePlaceholder'

export type SpielerData = {
  name: string
  nummer?: number | null
  position: string
  fotoUrl?: string | null
  nationalitaet?: string | null
  geburtsjahr?: number | null
  groesse?: number | null
}

export default function PlayerCard({ spieler }: { spieler: SpielerData }) {
  return (
    <div className="border border-gray-100 rounded-xl overflow-hidden hover:shadow-md transition-shadow">
      <div className="relative aspect-square bg-secondary/10">
        {spieler.fotoUrl ? (
          <Image
            src={spieler.fotoUrl}
            alt={spieler.name}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-cover object-top"
          />
        ) : (
          <ImagePlaceholder emoji="👤" />
        )}
        {spieler.nummer != null && (
          <div className="absolute top-3 left-3 w-9 h-9 rounded-full bg-secondary flex items-center justify-center shadow-md">
            <span className="text-white text-xs font-bold">{spieler.nummer}</span>
          </div>
        )}
      </div>

      <div className="p-4">
        <p className="font-bold text-secondary text-sm mb-1">{spieler.name}</p>

        {(spieler.nationalitaet || spieler.geburtsjahr || spieler.groesse) && (
          <div className="mt-3 space-y-1 border-t border-gray-50 pt-3">
            {spieler.nationalitaet && (
              <div className="flex justify-between text-xs text-gray-500">
                <span>Nationalität</span>
                <span className="font-medium text-secondary">{spieler.nationalitaet}</span>
              </div>
            )}
            {spieler.geburtsjahr && (
              <div className="flex justify-between text-xs text-gray-500">
                <span>Jahrgang</span>
                <span className="font-medium text-secondary">{spieler.geburtsjahr}</span>
              </div>
            )}
            {spieler.groesse && (
              <div className="flex justify-between text-xs text-gray-500">
                <span>Größe</span>
                <span className="font-medium text-secondary">{spieler.groesse} cm</span>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
