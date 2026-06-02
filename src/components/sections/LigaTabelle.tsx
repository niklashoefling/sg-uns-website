import { type Tabelle } from '@/lib/tabelle'

export default function LigaTabelle({ tabelle }: { tabelle: Tabelle }) {
  return (
    <div>
      <div className="flex items-end justify-between mb-6">
        <h2 className="text-2xl font-bold text-secondary">Tabelle</h2>
        <span className="text-xs text-gray-400">Stand: {tabelle.stand}</span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b-2 border-gray-100">
              <th className="text-left py-3 px-2 text-xs font-semibold uppercase tracking-wide text-gray-400 w-8">
                #
              </th>
              <th className="text-left py-3 px-2 text-xs font-semibold uppercase tracking-wide text-gray-400">
                Verein
              </th>
              <th className="text-center py-3 px-2 text-xs font-semibold uppercase tracking-wide text-gray-400">
                Sp
              </th>
              <th className="text-center py-3 px-2 text-xs font-semibold uppercase tracking-wide text-gray-400">
                S
              </th>
              <th className="text-center py-3 px-2 text-xs font-semibold uppercase tracking-wide text-gray-400">
                N
              </th>
              <th className="text-center py-3 px-2 text-xs font-semibold uppercase tracking-wide text-gray-400 hidden sm:table-cell">
                Sätze
              </th>
              <th className="text-center py-3 px-2 text-xs font-semibold uppercase tracking-wide text-gray-400 hidden md:table-cell">
                Punkte
              </th>
              <th className="text-center py-3 px-2 text-xs font-semibold uppercase tracking-wide text-gray-400">
                Pkt
              </th>
            </tr>
          </thead>
          <tbody>
            {tabelle.eintraege.map((eintrag) => (
              <tr
                key={eintrag.platz}
                className={`border-b border-gray-50 transition-colors ${
                  eintrag.highlight
                    ? 'bg-primary/5 border-l-2 border-l-primary'
                    : 'hover:bg-gray-50'
                }`}
              >
                <td className="py-3 px-2">
                  <span
                    className={`font-bold ${eintrag.platz <= 3 ? 'text-primary' : 'text-gray-400'}`}
                  >
                    {eintrag.platz}
                  </span>
                </td>
                <td className="py-3 px-2">
                  <span
                    className={`font-medium ${eintrag.highlight ? 'text-primary' : 'text-secondary'}`}
                  >
                    {eintrag.verein}
                  </span>
                </td>
                <td className="py-3 px-2 text-center text-gray-500">{eintrag.spiele}</td>
                <td className="py-3 px-2 text-center text-green-600 font-medium">
                  {eintrag.siege}
                </td>
                <td className="py-3 px-2 text-center text-red-400 font-medium">
                  {eintrag.niederlagen}
                </td>
                <td className="py-3 px-2 text-center text-gray-500 hidden sm:table-cell">
                  {eintrag.saetze_gewonnen}:{eintrag.saetze_verloren}
                </td>
                <td className="py-3 px-2 text-center text-gray-500 hidden md:table-cell">
                  {eintrag.punkte_gewonnen}:{eintrag.punkte_verloren}
                </td>
                <td className="py-3 px-2 text-center">
                  <span
                    className={`font-bold ${eintrag.highlight ? 'text-primary' : 'text-secondary'}`}
                  >
                    {eintrag.punkte}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-3 flex gap-4 text-xs text-gray-400">
        <span>Sp = Spiele</span>
        <span>S = Siege</span>
        <span>N = Niederlagen</span>
        <span>Pkt = Punkte</span>
      </div>
    </div>
  )
}
