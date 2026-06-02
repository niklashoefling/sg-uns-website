import PageHeader from '@/components/layout/PageHeader'

export const metadata = {
  title: 'Jugendarbeit | SG U.N.S. Rheinhessen',
  description:
    'Erfolgreiche Jugendarbeit der SG U.N.S. Rheinhessen – Tradition, Nachwuchs und Ziele.',
}

export default function JugendarbeitPage() {
  return (
    <div className="min-h-screen bg-white">
      <PageHeader
        eyebrow="SG U.N.S. Rheinhessen"
        title="Jugendarbeit"
        backHref="/"
        backLabel="Startseite"
      />

      <div className="max-w-4xl mx-auto px-6 py-16 space-y-12">
        <div>
          <h2 className="text-xs font-semibold uppercase tracking-widest text-primary mb-4">
            Tradition & Erfolge
          </h2>
          <div className="space-y-4 text-gray-500 leading-relaxed">
            <p>
              Die erfolgreiche Jugendarbeit dieser Vereine ist regional und überregional anerkannt.
              Höhepunkte sind zweifellos die guten Platzierungen und Teilnahmen des SC Schornsheim
              bei Deutschen Meisterschaften (z.B. 5. Platz U16 2004) und die Erfolge der Kooperation
              des TV Nieder-Olm mit dem Gymnasium Nieder-Olm mit Teilnahmen am Bundesfinale von
              Jugend trainiert für Olympia (2012 im Wettkampf III 3. Platz).
            </p>
            <p>
              Außerdem haben es talentierte Spieler aus unseren Vereinen immer wieder in
              Auswahlteams auf Bezirks- und Landesebene geschafft (z.B. 3. Platz im Bundespokal als
              bisher bestes Ergebnis des VVRP). Letztlich bildeten die rheinhessischen
              Nachbargemeinden mehrere Spieler aus, die es bis in die Oberliga, Regionalliga und die
              2. Bundesliga geschafft haben.
            </p>
          </div>
        </div>

        <div className="border-t border-gray-100 pt-12">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-primary mb-4">
            Aktuell & Ziele
          </h2>
          <div className="space-y-4 text-gray-500 leading-relaxed">
            <p>
              Die Jungs der SG treten im Jugendbereich in diesem Jahr auf den Kleinfeldern (U12 –
              U14) für den TVU und den SCS an, auf dem großen Feld (6:6) starten die U16, zwei U18-
              und zwei U20-Teams bei den Rheinhessenmeisterschaften. Ziele sind die Qualifikationen
              für die Landes- und Regionalmeisterschaften.
            </p>
            <p>
              Um den Traum eines jeden jugendlichen Volleyballers wahrmachen zu können, an den DM
              teilzunehmen, unterstützen wir seit jeher den Wechsel talentierter Jugendspieler zu
              anderen aussichtsreichen rheinhessischen Teams. Mit dieser guten Zusammenarbeit im
              Verband erreichten „unsere Jungs" mit der U18 der TuS Worms-Hochheim bei den DM 2006
              einen 8. Platz und mit der U16 der TGM Gonsenheim 2012 bei der DM in Speyer einen
              hervorragenden 3. Platz!
            </p>
          </div>
        </div>

        <div className="border-t border-gray-100 pt-12">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-primary mb-4">
            Die Spielgemeinschaft
          </h2>
          <div className="space-y-4 text-gray-500 leading-relaxed">
            <p>
              Da schon immer auch Undenheimer Jungs an den Erfolgen des SCS beteiligt waren, lag es
              nahe, mit einer neuen Struktur als Spielgemeinschaft die bisher schon sehr gute
              Zusammenarbeit in der Jugend auf den Herrenbereich zu übernehmen und den
              nachwachsenden Jugendlichen mit 4 vorhandenen Teams bei den Herren Spiel- und
              Trainingsgelegenheiten entsprechend ihrer Leistungsstärke anzubieten.
            </p>
            <p>
              Übergeordnetes Ziel der SG ist damit, die vielversprechenden Nachwuchsspieler durch
              ein besseres Angebot länger an die Heimatvereine zu binden, um vielleicht irgendwann
              auch einmal ein bisschen von dem zu ernten, was seit langen Jahren erfolgreich gesät
              wurde…
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
