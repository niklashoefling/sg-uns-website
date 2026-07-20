import Link from 'next/link'
import type { Spiel } from '@/lib/mannschaften'

export type GameCardProps = {
  spiel: Spiel
  teamName: string
  label?: string
}

export default function GameCard({ spiel, teamName, label }: GameCardProps) {
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
      <div className="flex-1 min-w-0 flex flex-col sm:flex-row sm:items-center sm:gap-3">
        <span className="text-gray-400 shrink-0">
          {spiel.datum}
          {!spiel.ergebnis && spiel.uhrzeit && (
            <span className="ml-1">· {spiel.uhrzeit}</span>
          )}
        </span>
        <span className="text-secondary font-medium wrap-break-word min-w-0">
          {heimName} – {gastName}
        </span>
        {label && (
          <span className="text-xs text-gray-400 shrink-0 hidden sm:inline">{label}</span>
        )}
      </div>
      {spiel.ergebnis && (
        <span className={`font-bold shrink-0 ${gewonnen ? 'text-green-600' : 'text-red-500'}`}>
          {spiel.ergebnis}
        </span>
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
