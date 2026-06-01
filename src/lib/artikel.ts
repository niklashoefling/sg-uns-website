export type MockArtikel = {
  id: string | number
  slug: string
  titel: string
  datum: string
  kategorie: string
  teaser: string
  bild: null
}

export const mockArtikel: MockArtikel[] = [
  {
    id: 'mock-1',
    slug: 'saison-2025-26-gestartet',
    titel: 'Saison 2025/26 erfolgreich gestartet',
    datum: '2025-09-15',
    kategorie: 'Spielbericht',
    teaser:
      'Die 1. Herren der SG U.N.S. Rheinhessen ist stark in die neue Saison der VVRP Verbandsliga Süd gestartet. Beim Auftakt gegen den VC Musterbach gab es einen klaren 3:1-Sieg vor heimischer Kulisse.',
    bild: null,
  },
  {
    id: 'mock-2',
    slug: 'neue-mitspieler-gesucht',
    titel: 'Neue Mitspieler gesucht – Jetzt einsteigen!',
    datum: '2025-08-20',
    kategorie: 'Vereinsnews',
    teaser:
      'Die SG U.N.S. Rheinhessen freut sich über neue Gesichter. Egal ob erfahrener Spieler oder Wiedereinsteiger – bei uns ist jeder willkommen. Trainingszeiten und Kontakt auf der Mannschaftsseite.',
    bild: null,
  },
  {
    id: 'mock-3',
    slug: 'jugend-trainiert-fuer-olympia-2025',
    titel: 'Jugend trainiert für Olympia – Starkes Abschneiden',
    datum: '2025-05-12',
    kategorie: 'Jugend',
    teaser:
      'Die Nachwuchsteams der SG haben sich beim diesjährigen Schulvolleyball-Wettbewerb Jugend trainiert für Olympia hervorragend geschlagen und die Regionalmeisterschaften erreicht.',
    bild: null,
  },
]
