import type { Spiel } from '@/lib/mannschaften'
import GameCard from '@/components/cards/GameCard'

export default function SpielplanSection({
  ergebnisse,
  naechsteSpiele,
  teamName,
  kalenderSlug,
}: {
  ergebnisse: Spiel[]
  naechsteSpiele: Spiel[]
  teamName: string
  kalenderSlug?: string
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
        <div className="flex items-center justify-between gap-4 mb-6">
          <h2 className="text-2xl font-bold text-secondary">Nächste Spiele</h2>
          {kalenderSlug && (
            <a
              href={`/api/kalender/${kalenderSlug}`}
              className="inline-flex items-center gap-1.5 shrink-0 text-xs font-medium text-primary border border-primary/30 rounded-lg px-3 py-1.5 hover:bg-primary/5 transition-colors"
            >
              <svg
                className="size-3.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>
              Spielplan abonnieren
            </a>
          )}
        </div>
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
