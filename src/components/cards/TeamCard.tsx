import Link from 'next/link'
import Image from 'next/image'
import type { Mannschaft } from '@/lib/mannschaften'

export default function TeamCard({ team, index }: { team: Mannschaft; index: number }) {
  return (
    <Link
      href={`/mannschaften/${team.slug}`}
      className="group border border-gray-100 rounded-xl overflow-hidden hover:border-primary/30 hover:shadow-md transition-all flex flex-col md:flex-row md:items-stretch"
    >
      <div className="relative w-full md:w-56 h-48 md:h-auto shrink-0 bg-secondary/10">
        {team.teamfoto ? (
          <Image
            src={team.teamfoto}
            alt={`${team.name} Vorschau`}
            fill
            className="object-cover object-center group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-4xl opacity-20">🏐</span>
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col md:flex-row md:items-center gap-4 p-6 md:py-8">
        <div className="shrink-0 w-10 h-10 rounded-full bg-secondary/10 border border-secondary/20 flex items-center justify-center group-hover:bg-primary/10 group-hover:border-primary/30 transition-colors">
          <span className="text-secondary group-hover:text-primary font-bold transition-colors">{index + 1}</span>
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-3 mb-1">
            <h2 className="text-xl font-bold text-secondary">{team.name}</h2>
            <span className="bg-primary/10 text-primary border border-primary/20 text-xs font-semibold px-2.5 py-0.5 rounded-full">
              {team.liga}
            </span>
          </div>
          <p className="text-sm text-gray-500 line-clamp-3">{team.beschreibung}</p>
        </div>

        <div className="shrink-0 flex flex-col gap-1 text-sm md:text-right">
          {team.training.map((t) => (
            <span key={t.tag} className="text-gray-500">
              <span className="font-medium text-secondary">{t.tag}</span> · {t.uhrzeit}
            </span>
          ))}
        </div>

        <span className="shrink-0 text-gray-300 group-hover:text-primary transition-colors text-xl hidden md:block">→</span>
      </div>
    </Link>
  )
}
