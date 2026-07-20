import type { Spiel } from '@/lib/mannschaften'
import GameCard from '@/components/cards/GameCard'

export default function SpielplanSection({
  ergebnisse,
  naechsteSpiele,
  teamName,
}: {
  ergebnisse: Spiel[]
  naechsteSpiele: Spiel[]
  teamName: string
}) {
  return (
    <div className="grid md:grid-cols-2 gap-10">
      <div>
        <h2 className="text-2xl font-bold text-secondary mb-6">Ergebnisse</h2>
        {ergebnisse.length === 0 ? (
          <p className="text-sm text-gray-400">Noch keine Ergebnisse.</p>
        ) : (
          <div className="space-y-2">
            {ergebnisse.map((spiel) => (
              <GameCard
                key={spiel.uuid ?? `${spiel.datum}-${spiel.gegner}`}
                spiel={spiel}
                teamName={teamName}
              />
            ))}
          </div>
        )}
      </div>

      <div>
        <h2 className="text-2xl font-bold text-secondary mb-6">Nächste Spiele</h2>
        {naechsteSpiele.length === 0 ? (
          <p className="text-sm text-gray-400">Keine anstehenden Spiele.</p>
        ) : (
          <div className="space-y-2">
            {naechsteSpiele.map((spiel) => (
              <GameCard
                key={spiel.uuid ?? `${spiel.datum}-${spiel.gegner}`}
                spiel={spiel}
                teamName={teamName}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
