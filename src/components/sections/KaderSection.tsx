import PlayerCard from '@/components/cards/PlayerCard'
import type { SpielerData } from '@/components/cards/PlayerCard'

const POSITION_ORDER = ['Zuspiel', 'Diagonal', 'Außenangriff', 'Mittelblock', 'Universal', 'Libero']

type Group = { position: string; players: SpielerData[] }

function buildRows(groups: Group[]): Group[][] {
  const rows: Group[][] = []
  let i = 0
  while (i < groups.length) {
    const current = groups[i]
    const next = groups[i + 1]
    // Pair two small groups side by side
    if (current.players.length <= 2 && next && next.players.length <= 2) {
      rows.push([current, next])
      i += 2
    } else {
      rows.push([current])
      i += 1
    }
  }
  return rows
}

export default function KaderSection({ spieler }: { spieler: SpielerData[] }) {
  const groups: Group[] = []
  for (const pos of POSITION_ORDER) {
    const inGroup = spieler.filter((s) => s.position === pos)
    if (inGroup.length > 0) groups.push({ position: pos, players: inGroup })
  }
  const ungrouped = spieler.filter((s) => !POSITION_ORDER.includes(s.position))
  if (ungrouped.length > 0) groups.push({ position: 'Weitere', players: ungrouped })

  const rows = buildRows(groups)

  return (
    <div>
      <h2 className="text-2xl font-bold text-secondary mb-8">Kader</h2>
      <div className="space-y-8">
        {rows.map((row) => (
          <div
            key={row.map((g) => g.position).join('+')}
            className={`grid gap-6 ${row.length === 2 ? 'md:grid-cols-2' : 'grid-cols-1'}`}
          >
            {row.map(({ position, players }) => (
              <div key={position}>
                <h3 className="text-xs font-semibold uppercase tracking-widest text-primary mb-4">
                  {position}
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                  {players.map((s) => (
                    <PlayerCard key={`${s.name}-${s.nummer}`} spieler={s} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
