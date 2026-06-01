import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { getPayload } from 'payload'
import config from '@payload-config'
import type { Mannschaften, Media } from '@/payload-types'
import { getMannschaft, mannschaften, type Spieler } from '@/lib/mannschaften'
import { getTabelle } from '@/lib/tabelle'
import LigaTabelle from '@/components/LigaTabelle'

export async function generateStaticParams() {
  return mannschaften.map((m) => ({ slug: m.slug }))
}

const positionFarbe: Record<string, string> = {
  Zuspiel: 'bg-blue-100 text-blue-700',
  Außenannahme: 'bg-green-100 text-green-700',
  Diagonal: 'bg-orange-100 text-orange-700',
  Mittelblocker: 'bg-purple-100 text-purple-700',
  Libero: 'bg-yellow-100 text-yellow-700',
  Universal: 'bg-gray-100 text-gray-700',
}

function SpielerKarte({ spieler }: { spieler: Spieler }) {
  return (
    <div className="border border-gray-100 rounded-xl overflow-hidden hover:shadow-md transition-shadow group">
      <div className="relative h-48 bg-secondary/10">
        {spieler.foto ? (
          <Image src={spieler.foto} alt={spieler.name} fill className="object-cover object-top" />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-5xl text-secondary/20">👤</span>
          </div>
        )}
        <div className="absolute top-3 left-3 w-9 h-9 rounded-full bg-secondary flex items-center justify-center shadow-md">
          <span className="text-white text-xs font-bold">{spieler.nummer}</span>
        </div>
      </div>

      <div className="p-4">
        <p className="font-bold text-secondary text-sm mb-1">{spieler.name}</p>
        <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${positionFarbe[spieler.position]}`}>
          {spieler.position}
        </span>

        {(spieler.nationalitaet || spieler.geburtsjahr || spieler.groesse) && (
          <div className="mt-3 space-y-1 border-t border-gray-50 pt-3">
            {spieler.nationalitaet && (
              <div className="flex justify-between text-xs text-gray-500">
                <span>Nationalität</span>
                <span className="font-medium text-secondary">{spieler.nationalitaet}</span>
              </div>
            )}
            {spieler.geburtsjahr && (
              <div className="flex justify-between text-xs text-gray-500">
                <span>Jahrgang</span>
                <span className="font-medium text-secondary">{spieler.geburtsjahr}</span>
              </div>
            )}
            {spieler.groesse && (
              <div className="flex justify-between text-xs text-gray-500">
                <span>Größe</span>
                <span className="font-medium text-secondary">{spieler.groesse} cm</span>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

function CmsSpielerKarte({ spieler }: { spieler: NonNullable<Mannschaften['spieler']>[number] }) {
  const fotoUrl = spieler.foto && typeof spieler.foto === 'object' ? (spieler.foto as Media).url ?? null : null

  return (
    <div className="border border-gray-100 rounded-xl overflow-hidden hover:shadow-md transition-shadow group">
      <div className="relative h-48 bg-secondary/10">
        {fotoUrl ? (
          <Image src={fotoUrl} alt={spieler.name} fill className="object-cover object-top" />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-5xl text-secondary/20">👤</span>
          </div>
        )}
        <div className="absolute top-3 left-3 w-9 h-9 rounded-full bg-secondary flex items-center justify-center shadow-md">
          <span className="text-white text-xs font-bold">{spieler.nummer}</span>
        </div>
      </div>

      <div className="p-4">
        <p className="font-bold text-secondary text-sm mb-1">{spieler.name}</p>
        <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${positionFarbe[spieler.position]}`}>
          {spieler.position}
        </span>

        {(spieler.nationalitaet || spieler.geburtsjahr || spieler.groesse) && (
          <div className="mt-3 space-y-1 border-t border-gray-50 pt-3">
            {spieler.nationalitaet && (
              <div className="flex justify-between text-xs text-gray-500">
                <span>Nationalität</span>
                <span className="font-medium text-secondary">{spieler.nationalitaet}</span>
              </div>
            )}
            {spieler.geburtsjahr && (
              <div className="flex justify-between text-xs text-gray-500">
                <span>Jahrgang</span>
                <span className="font-medium text-secondary">{spieler.geburtsjahr}</span>
              </div>
            )}
            {spieler.groesse && (
              <div className="flex justify-between text-xs text-gray-500">
                <span>Größe</span>
                <span className="font-medium text-secondary">{spieler.groesse} cm</span>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default async function MannschaftPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params

  const payload = await getPayload({ config })
  const { docs } = await payload.find({
    collection: 'mannschaften',
    where: { slug: { equals: slug } },
    depth: 2,
    limit: 1,
  })

  if (docs.length > 0) {
    const team = docs[0]
    const tabelle = getTabelle(slug)
    const teamfotoUrl = team.teamfoto && typeof team.teamfoto === 'object'
      ? (team.teamfoto as Media).url ?? null
      : null

    const staticTeam = getMannschaft(slug)
    const gespielt = staticTeam?.spielplan.filter((s) => s.ergebnis) ?? []
    const ausstehend = staticTeam?.spielplan.filter((s) => !s.ergebnis) ?? []

    return (
      <div className="min-h-screen bg-white">
        <div className="bg-secondary pt-32 pb-32 px-6">
          <div className="max-w-6xl mx-auto">
            <Link href="/mannschaften" className="text-white/50 hover:text-white text-sm transition-colors mb-4 inline-block">
              ← Alle Mannschaften
            </Link>
            <span className="text-xs font-semibold uppercase tracking-widest text-primary mb-3 block">
              {team.liga} · Saison {team.saison}
            </span>
            <h1 className="text-5xl font-bold text-white">{team.name}</h1>
          </div>
        </div>

        {teamfotoUrl && (
          <div className="max-w-6xl mx-auto px-6 -mt-16">
            <div className="relative w-full h-56 md:h-72 rounded-xl overflow-hidden shadow-xl">
              <Image
                src={teamfotoUrl}
                alt={`${team.name} Teamfoto`}
                fill
                priority
                sizes="(max-width: 768px) 100vw, 1152px"
                className="object-cover object-center"
              />
            </div>
          </div>
        )}

        <div className="max-w-6xl mx-auto px-6 py-16 space-y-16">
          <div className="grid md:grid-cols-2 gap-10">
            <div>
              <h2 className="text-xs font-semibold uppercase tracking-widest text-primary mb-4">Über die Mannschaft</h2>
              <p className="text-gray-500 leading-relaxed">{team.beschreibung}</p>
            </div>
            <div>
              <h2 className="text-xs font-semibold uppercase tracking-widest text-primary mb-4">Details</h2>
              <div className="space-y-3">
                {[
                  { label: 'Trainer', value: team.trainer },
                  ...(team.cotrainer ? [{ label: 'Co-Trainer', value: team.cotrainer }] : []),
                  { label: 'Halle', value: team.halle },
                  { label: 'Adresse', value: team.halleAdresse },
                ].map(({ label, value }) => (
                  <div key={label} className="flex gap-4 text-sm">
                    <span className="w-24 shrink-0 font-semibold text-secondary">{label}</span>
                    <span className="text-gray-500">{value}</span>
                  </div>
                ))}
                <div className="flex gap-4 text-sm">
                  <span className="w-24 shrink-0 font-semibold text-secondary">Training</span>
                  <div className="space-y-1">
                    {team.training.map((t) => (
                      <div key={t.tag} className="text-gray-500">{t.tag} · {t.uhrzeit}</div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {team.spieler && team.spieler.length > 0 && (
            <div>
              <h2 className="text-2xl font-bold text-secondary mb-8">Kader</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {team.spieler.map((spieler) => (
                  <CmsSpielerKarte key={spieler.id ?? spieler.nummer} spieler={spieler} />
                ))}
              </div>
            </div>
          )}

          {tabelle && <LigaTabelle tabelle={tabelle} />}

          <div className="grid md:grid-cols-2 gap-10">
            <div>
              <h2 className="text-2xl font-bold text-secondary mb-6">Ergebnisse</h2>
              {gespielt.length === 0 ? (
                <p className="text-sm text-gray-400">Noch keine Ergebnisse.</p>
              ) : (
                <div className="space-y-2">
                  {gespielt.map((spiel) => {
                    const gewonnen = spiel.ergebnis && parseInt(spiel.ergebnis[0]) > parseInt(spiel.ergebnis[2])
                    return (
                      <div key={`${spiel.datum}-${spiel.gegner}`} className="flex items-center gap-4 border border-gray-100 rounded-lg px-4 py-3 text-sm">
                        <div className={`w-2 h-2 rounded-full shrink-0 ${gewonnen ? 'bg-green-500' : 'bg-red-400'}`} />
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
                    <div key={`${spiel.datum}-${spiel.gegner}`} className="flex items-center gap-4 border border-gray-100 rounded-lg px-4 py-3 text-sm">
                      <div className="w-2 h-2 rounded-full bg-primary shrink-0" />
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
        </div>
      </div>
    )
  }

  const team = getMannschaft(slug)
  if (!team) notFound()

  const tabelle = getTabelle(slug)
  const gespielt = team.spielplan.filter((s) => s.ergebnis)
  const ausstehend = team.spielplan.filter((s) => !s.ergebnis)

  return (
    <div className="min-h-screen bg-white">
      <div className="bg-secondary pt-32 pb-32 px-6">
        <div className="max-w-6xl mx-auto">
          <Link href="/mannschaften" className="text-white/50 hover:text-white text-sm transition-colors mb-4 inline-block">
            ← Alle Mannschaften
          </Link>
          <span className="text-xs font-semibold uppercase tracking-widest text-primary mb-3 block">
            {team.liga} · Saison {team.saison}
          </span>
          <h1 className="text-5xl font-bold text-white">{team.name}</h1>
        </div>
      </div>

      {team.teamfoto && (
        <div className="max-w-6xl mx-auto px-6 -mt-16">
          <div className="relative w-full h-56 md:h-72 rounded-xl overflow-hidden shadow-xl">
            <Image
              src={team.teamfoto}
              alt={`${team.name} Teamfoto`}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 1152px"
              className="object-cover object-center"
            />
          </div>
        </div>
      )}

      <div className="max-w-6xl mx-auto px-6 py-16 space-y-16">
        <div className="grid md:grid-cols-2 gap-10">
          <div>
            <h2 className="text-xs font-semibold uppercase tracking-widest text-primary mb-4">Über die Mannschaft</h2>
            <p className="text-gray-500 leading-relaxed">{team.beschreibung}</p>
          </div>
          <div>
            <h2 className="text-xs font-semibold uppercase tracking-widest text-primary mb-4">Details</h2>
            <div className="space-y-3">
              {[
                { label: 'Trainer', value: team.trainer },
                ...(team.cotrainer ? [{ label: 'Co-Trainer', value: team.cotrainer }] : []),
                { label: 'Halle', value: team.halle },
                { label: 'Adresse', value: team.halleAdresse },
              ].map(({ label, value }) => (
                <div key={label} className="flex gap-4 text-sm">
                  <span className="w-24 shrink-0 font-semibold text-secondary">{label}</span>
                  <span className="text-gray-500">{value}</span>
                </div>
              ))}
              <div className="flex gap-4 text-sm">
                <span className="w-24 shrink-0 font-semibold text-secondary">Training</span>
                <div className="space-y-1">
                  {team.training.map((t) => (
                    <div key={t.tag} className="text-gray-500">{t.tag} · {t.uhrzeit}</div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-secondary mb-8">Kader</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {team.spieler.map((spieler) => (
              <SpielerKarte key={spieler.nummer} spieler={spieler} />
            ))}
          </div>
        </div>

        {tabelle && <LigaTabelle tabelle={tabelle} />}

        <div className="grid md:grid-cols-2 gap-10">
          <div>
            <h2 className="text-2xl font-bold text-secondary mb-6">Ergebnisse</h2>
            {gespielt.length === 0 ? (
              <p className="text-sm text-gray-400">Noch keine Ergebnisse.</p>
            ) : (
              <div className="space-y-2">
                {gespielt.map((spiel) => {
                  const gewonnen = spiel.ergebnis && parseInt(spiel.ergebnis[0]) > parseInt(spiel.ergebnis[2])
                  return (
                    <div key={`${spiel.datum}-${spiel.gegner}`} className="flex items-center gap-4 border border-gray-100 rounded-lg px-4 py-3 text-sm">
                      <div className={`w-2 h-2 rounded-full shrink-0 ${gewonnen ? 'bg-green-500' : 'bg-red-400'}`} />
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
                  <div key={`${spiel.datum}-${spiel.gegner}`} className="flex items-center gap-4 border border-gray-100 rounded-lg px-4 py-3 text-sm">
                    <div className="w-2 h-2 rounded-full bg-primary shrink-0" />
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
      </div>
    </div>
  )
}
