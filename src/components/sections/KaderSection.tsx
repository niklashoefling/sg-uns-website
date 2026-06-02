import { Fragment } from 'react'
import PlayerCard from '@/components/cards/PlayerCard'
import type { SpielerData } from '@/components/cards/PlayerCard'

const POSITION_ORDER = ['Zuspiel', 'Diagonal', 'Außenangriff', 'Mittelblock', 'Universal', 'Libero']

export default function KaderSection({ spieler }: { spieler: SpielerData[] }) {
  const groups: { position: string; players: SpielerData[] }[] = []
  for (const pos of POSITION_ORDER) {
    const inGroup = spieler.filter((s) => s.position === pos)
    if (inGroup.length > 0) groups.push({ position: pos, players: inGroup })
  }
  const ungrouped = spieler.filter((s) => !POSITION_ORDER.includes(s.position))
  if (ungrouped.length > 0) groups.push({ position: 'Weitere', players: ungrouped })

  return (
    <div>
      <h2 className="text-2xl font-bold text-secondary mb-8">Kader</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {groups.map(({ position, players }) => (
          <Fragment key={position}>
            <div className="col-span-full mt-4 first:mt-0">
              <h3 className="text-xs font-semibold uppercase tracking-widest text-primary">
                {position}
              </h3>
            </div>
            {players.map((s) => (
              <PlayerCard key={`${s.name}-${s.nummer}`} spieler={s} />
            ))}
          </Fragment>
        ))}
      </div>
    </div>
  )
}
