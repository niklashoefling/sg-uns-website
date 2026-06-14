import PlayerCard from '@/components/cards/PlayerCard'
import type { SpielerData } from '@/components/cards/PlayerCard'

export default function KaderSection({ spieler }: { spieler: SpielerData[] }) {
  return (
    <div>
      <h2 className="text-2xl font-bold text-secondary mb-8">Kader</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {[...spieler]
          .sort((a, b) => {
            if (a.nummer == null && b.nummer == null) return 0
            if (a.nummer == null) return 1
            if (b.nummer == null) return -1
            return a.nummer - b.nummer
          })
          .map((s) => (
            <PlayerCard key={`${s.name}-${s.nummer}`} spieler={s} />
          ))}
      </div>
    </div>
  )
}
