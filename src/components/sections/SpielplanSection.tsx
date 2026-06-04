import type { Spiel } from '@/lib/mannschaften'

export default function SpielplanSection({ spielplan }: { spielplan: Spiel[] }) {
  const gespielt = spielplan.filter((s) => s.ergebnis)
  const ausstehend = spielplan.filter((s) => !s.ergebnis)

  return (
    <div className="grid md:grid-cols-2 gap-10">
      <div>
        <h2 className="text-2xl font-bold text-secondary mb-6">Ergebnisse</h2>
        {gespielt.length === 0 ? (
          <p className="text-sm text-gray-400">Noch keine Ergebnisse.</p>
        ) : (
          <div className="space-y-2">
            {gespielt.map((spiel) => {
              const parts = spiel.ergebnis?.match(/^(\d+):(\d+)$/)
              const gewonnen = parts ? parseInt(parts[1]) > parseInt(parts[2]) : false
              return (
                <div
                  key={`${spiel.datum}-${spiel.gegner}`}
                  className="flex items-center gap-4 border border-gray-100 rounded-lg px-4 py-3 text-sm"
                >
                  <div
                    className={`w-2 h-2 rounded-full shrink-0 ${gewonnen ? 'bg-green-500' : 'bg-red-400'}`}
                  />
                  <span className="text-gray-400 w-20 shrink-0">{spiel.datum}</span>
                  <span className="flex-1 text-secondary font-medium">
                    {spiel.heimspiel ? 'vs.' : '@'} {spiel.gegner}
                  </span>
                  <span className={`font-bold ${gewonnen ? 'text-green-600' : 'text-red-500'}`}>
                    {spiel.ergebnis}
                  </span>
                </div>
              )
            })}
          </div>
        )}
      </div>

      <div>
        <h2 className="text-2xl font-bold text-secondary mb-6">Nächste Spiele</h2>
        {ausstehend.length === 0 ? (
          <p className="text-sm text-gray-400">Keine anstehenden Spiele.</p>
        ) : (
          <div className="space-y-2">
            {ausstehend.map((spiel) => (
              <div
                key={`${spiel.datum}-${spiel.gegner}`}
                className="flex items-center gap-4 border border-gray-100 rounded-lg px-4 py-3 text-sm"
              >
                <div className="size-2 rounded-full bg-primary shrink-0" />
                <span className="text-gray-400 w-20 shrink-0">{spiel.datum}</span>
                <span className="flex-1 text-secondary font-medium">
                  {spiel.heimspiel ? 'vs.' : '@'} {spiel.gegner}
                </span>
                <span className="text-gray-400">{spiel.uhrzeit}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
