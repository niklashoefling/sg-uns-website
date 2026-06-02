import PlayerCard from '@/components/cards/PlayerCard'
import type { SpielerData } from '@/components/cards/PlayerCard'

const POSITION_ORDER = [
  'Zuspiel',
  'Diagonal',
  'Außenangriff',
  'Mittelblock',
  'Universal',
  'Libero',
]

export default function KaderSection({ spieler }: { spieler: SpielerData[] }) {
  const groups: Record<string, SpielerData[]> = {}
  for (const pos of POSITION_ORDER) {
    const inGroup = spieler.filter((s) => s.position === pos)
    if (inGroup.length > 0) groups[pos] = inGroup
  }
  const ungrouped = spieler.filter((s) => !POSITION_ORDER.includes(s.position))
  if (ungrouped.length > 0) groups['Weitere'] = ungrouped

  return (
    <div>
      <h2 className="text-2xl font-bold text-secondary mb-8">Kader</h2>
      <div className="space-y-10">
        {Object.entries(groups).map(([position, players]) => (
          <div key={position}>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-primary mb-4">
              {position}
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {players.map((s) => (
                <PlayerCard key={`${s.name}-${s.nummer}`} spieler={s} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
