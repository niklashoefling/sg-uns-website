import Link from 'next/link'
import type { Spiel } from '@/lib/mannschaften'

function SpielZeile({ spiel, teamName }: { spiel: Spiel; teamName: string }) {
  const heimName = spiel.heimspiel ? teamName : spiel.gegner
  const gastName = spiel.heimspiel ? spiel.gegner : teamName

  const parts = spiel.ergebnis?.match(/^(\d+):(\d+)$/)
  const gewonnen = parts
    ? spiel.heimspiel
      ? parseInt(parts[1]) > parseInt(parts[2])
      : parseInt(parts[2]) > parseInt(parts[1])
    : false

  const inner = (
    <div className="flex items-center gap-3 border border-gray-100 rounded-lg px-4 py-3 text-sm">
      {spiel.ergebnis ? (
        <div
          className={`w-2 h-2 rounded-full shrink-0 ${gewonnen ? 'bg-green-500' : 'bg-red-400'}`}
        />
      ) : (
        <div className="w-2 h-2 rounded-full shrink-0 bg-primary" />
      )}
      <span className="text-gray-400 w-20 shrink-0">{spiel.datum}</span>
      <span className="flex-1 text-secondary font-medium truncate">
        {heimName} – {gastName}
      </span>
      {spiel.ergebnis ? (
        <span className={`font-bold shrink-0 ${gewonnen ? 'text-green-600' : 'text-red-500'}`}>
          {spiel.ergebnis}
        </span>
      ) : (
        spiel.uhrzeit && <span className="text-gray-400 shrink-0">{spiel.uhrzeit}</span>
      )}
    </div>
  )

  return spiel.uuid ? (
    <Link href={`/spiel/${spiel.uuid}`} className="block hover:opacity-80 transition-opacity">
      {inner}
    </Link>
  ) : (
    <div>{inner}</div>
  )
}

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
              <SpielZeile
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
              <SpielZeile
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
