import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import BackButton from '@/components/ui/BackButton'
import { fetchSpiel } from '@/lib/sams'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ uuid: string }>
}): Promise<Metadata> {
  const { uuid } = await params
  try {
    const spiel = await fetchSpiel(uuid)
    const title = `${spiel.heimteam} – ${spiel.gastteam}`
    return {
      title,
      openGraph: { title: `${title} | SG U.N.S. Rheinhessen` },
    }
  } catch {
    return {}
  }
}

export default async function SpielPage({ params }: { params: Promise<{ uuid: string }> }) {
  const { uuid } = await params
  const spiel = await fetchSpiel(uuid).catch(() => notFound())

  const ergebnisTeile = spiel.ergebnis?.split(':').map(Number)
  const heimGewonnen = ergebnisTeile ? ergebnisTeile[0] > ergebnisTeile[1] : null

  return (
    <div className="min-h-screen bg-white">
      <div className="bg-secondary pt-32 pb-20 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="mb-8">
            <BackButton href="/" label="Zurück" variant="dark" />
          </div>
          {spiel.ligaName && (
            <span className="text-xs font-semibold uppercase tracking-widest text-primary mb-3 block">
              {spiel.ligaName}
            </span>
          )}
          <div className="flex items-center justify-between gap-6">
            <p
              className={`text-xl font-bold leading-tight ${heimGewonnen === false ? 'text-white/50' : 'text-white'}`}
            >
              {spiel.heimteam}
            </p>
            {spiel.ergebnis ? (
              <div className="text-center shrink-0">
                <span className="text-4xl font-bold text-primary tabular-nums">
                  {spiel.ergebnis}
                </span>
                <p className="text-xs text-white/40 mt-1">Sätze</p>
              </div>
            ) : (
              <span className="text-2xl font-bold text-white/40 shrink-0">–</span>
            )}
            <p
              className={`text-xl font-bold leading-tight text-right ${heimGewonnen === true ? 'text-white/50' : 'text-white'}`}
            >
              {spiel.gastteam}
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-12 space-y-10">
        {/* Spielinfos */}
        <div className="grid sm:grid-cols-2 gap-x-10 gap-y-3 text-sm">
          <div className="flex gap-3">
            <span className="w-16 shrink-0 font-semibold text-secondary">Datum</span>
            <span className="text-gray-500">{spiel.datum}</span>
          </div>
          {spiel.uhrzeit && (
            <div className="flex gap-3">
              <span className="w-16 shrink-0 font-semibold text-secondary">Uhrzeit</span>
              <span className="text-gray-500">{spiel.uhrzeit} Uhr</span>
            </div>
          )}
          {spiel.ort && (
            <div className="flex gap-3 sm:col-span-2">
              <span className="w-16 shrink-0 font-semibold text-secondary">Ort</span>
              <div className="text-gray-500">
                <p>{spiel.ort.name}</p>
                {spiel.ort.adresse && (
                  <p className="text-gray-400 text-xs mt-0.5">{spiel.ort.adresse}</p>
                )}
                {spiel.ort.mapsUrl && (
                  <a
                    href={spiel.ort.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary text-xs hover:underline mt-1 inline-block"
                  >
                    In Google Maps öffnen →
                  </a>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Satzergebnisse */}
        {spiel.saetze && spiel.saetze.length > 0 && (
          <div>
            <h2 className="text-xl font-bold text-secondary mb-4">Satzergebnisse</h2>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b-2 border-gray-100">
                  <th className="text-left py-2 px-3 text-xs font-semibold uppercase tracking-wide text-gray-400">
                    Satz
                  </th>
                  <th className="text-center py-2 px-3 text-xs font-semibold uppercase tracking-wide text-gray-400">
                    {spiel.heimteam}
                  </th>
                  <th className="text-center py-2 px-3 text-xs font-semibold uppercase tracking-wide text-gray-400">
                    {spiel.gastteam}
                  </th>
                </tr>
              </thead>
              <tbody>
                {spiel.saetze.map((satz) => {
                  const teile = satz.punkte?.split(':').map(Number)
                  const heimSatzGewonnen = teile ? teile[0] > teile[1] : null
                  return (
                    <tr key={satz.nummer} className="border-b border-gray-50">
                      <td className="py-2 px-3 text-gray-400">Satz {satz.nummer}</td>
                      <td
                        className={`py-2 px-3 text-center font-bold ${heimSatzGewonnen === true ? 'text-secondary' : 'text-gray-400'}`}
                      >
                        {teile?.[0]}
                      </td>
                      <td
                        className={`py-2 px-3 text-center font-bold ${heimSatzGewonnen === false ? 'text-secondary' : 'text-gray-400'}`}
                      >
                        {teile?.[1]}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
