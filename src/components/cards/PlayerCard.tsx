import Image from 'next/image'
import { positionFarbe } from '@/lib/utils'

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
      <div className="relative h-48 bg-secondary/10">
        {spieler.fotoUrl ? (
          <Image src={spieler.fotoUrl} alt={spieler.name} fill className="object-cover object-top" />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-5xl text-secondary/20">👤</span>
          </div>
        )}
        {spieler.nummer != null && (
          <div className="absolute top-3 left-3 w-9 h-9 rounded-full bg-secondary flex items-center justify-center shadow-md">
            <span className="text-white text-xs font-bold">{spieler.nummer}</span>
          </div>
        )}
      </div>

      <div className="p-4">
        <p className="font-bold text-secondary text-sm mb-1">{spieler.name}</p>
        <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${positionFarbe[spieler.position] ?? 'bg-gray-100 text-gray-700'}`}>
          {spieler.position}
        </span>

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
