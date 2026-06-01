export type Position = 'Zuspiel' | 'Außenannahme' | 'Diagonal' | 'Mittelblocker' | 'Libero' | 'Universal'

export type Spieler = {
  name: string
  nummer: number
  position: Position
  foto?: string
  nationalitaet?: string
  geburtsjahr?: number
  groesse?: number
}

export type Spiel = {
  datum: string
  uhrzeit: string
  heimspiel: boolean
  gegner: string
  ergebnis?: string
}

export type Mannschaft = {
  slug: string
  name: string
  liga: string
  saison: string
  teamfoto?: string
  trainer: string
  cotrainer?: string
  training: { tag: string; uhrzeit: string }[]
  halle: string
  halleAdresse: string
  beschreibung: string
  spieler: Spieler[]
  spielplan: Spiel[]
}

export const mannschaften: Mannschaft[] = [
  {
    slug: '1-herren',
    name: '1. Herren',
    liga: 'VVRP Verbandsliga Süd',
    saison: '2025/26',
    teamfoto: '/mannschaften/1-herren.jpeg',
    trainer: 'Markus Stange',
    training: [
      { tag: 'Mittwoch', uhrzeit: '20:00 - 22:00 Uhr' },
      { tag: 'Freitag', uhrzeit: '20:00 - 22:00 Uhr' },
    ],
    halle: 'Heinz-Kerz-Halle (HKH) Nieder-Olm',
    halleAdresse: 'Maria-Montessori-Strasse 8, 55268 Nieder-Olm',
    beschreibung:
      'Die 1. Herren ist das Aushängeschild der SG U.N.S. Rheinhessen. Mit einer eingespielten Mannschaft und ambitionierten Zielen gehen wir in jede Saison. Wir freuen uns immer über neue Mitspieler!',
    spieler: [
      { name: 'Cassian Zgraja', nummer: 1, position: 'Zuspiel', nationalitaet: 'Deutschland', geburtsjahr: 2006, groesse: 1.84 },
      { name: 'Thomas Beispiel', nummer: 4, position: 'Außenannahme' },
      { name: 'Lars Probst', nummer: 7, position: 'Diagonal' },
      { name: 'Felix Groß', nummer: 9, position: 'Mittelblocker' },
      { name: 'Jonas Klein', nummer: 11, position: 'Außenannahme' },
      { name: 'Stefan Weiß', nummer: 13, position: 'Mittelblocker' },
      { name: 'Nico Braun', nummer: 15, position: 'Libero' },
    ],
    spielplan: [
      { datum: '14.09.2024', uhrzeit: '18:00', heimspiel: true, gegner: 'VC Musterbach', ergebnis: '3:1' },
      { datum: '21.09.2024', uhrzeit: '19:00', heimspiel: false, gegner: 'TSV Beispieldorf', ergebnis: '2:3' },
      { datum: '05.10.2024', uhrzeit: '18:00', heimspiel: true, gegner: 'SV Probe', ergebnis: '3:0' },
      { datum: '19.10.2024', uhrzeit: '18:00', heimspiel: false, gegner: 'VfB Testheim', ergebnis: '3:2' },
      { datum: '09.11.2024', uhrzeit: '18:00', heimspiel: true, gegner: 'SC Demoburg' },
      { datum: '23.11.2024', uhrzeit: '19:00', heimspiel: false, gegner: 'TV Platzhalter' },
      { datum: '07.12.2024', uhrzeit: '18:00', heimspiel: true, gegner: 'VC Beispielstadt' },
    ],
  },
  {
    slug: '2-herren',
    name: '2. Herren',
    liga: 'Bezirksliga',
    saison: '2025/26',
    trainer: 'Peter Muster',
    training: [
      { tag: 'Montag', uhrzeit: '19:00 - 21:00 Uhr' },
      { tag: 'Mittwoch', uhrzeit: '19:00 - 21:00 Uhr' },
    ],
    halle: 'Sporthalle Musterstraße',
    halleAdresse: 'Musterstraße 1, 55234 Musterstadt',
    beschreibung:
      'Die 2. Herren bietet erfahrenen Spielern ein starkes Umfeld für kompetitiven Volleyball auf Bezirksebene.',
    spieler: [
      { name: 'Paul Muster', nummer: 2, position: 'Zuspiel' },
      { name: 'Andreas Test', nummer: 5, position: 'Außenannahme' },
      { name: 'Markus Lang', nummer: 8, position: 'Mittelblocker' },
      { name: 'Simon Kurz', nummer: 10, position: 'Libero' },
    ],
    spielplan: [
      { datum: '15.09.2024', uhrzeit: '17:00', heimspiel: true, gegner: 'TSV Probe', ergebnis: '3:2' },
      { datum: '22.09.2024', uhrzeit: '17:00', heimspiel: false, gegner: 'SV Beispiel', ergebnis: '1:3' },
      { datum: '06.10.2024', uhrzeit: '17:00', heimspiel: true, gegner: 'VC Demo' },
    ],
  },
  {
    slug: '3-herren',
    name: '3. Herren',
    liga: 'Kreisliga',
    saison: '2025/26',
    trainer: 'Klaus Beispiel',
    training: [{ tag: 'Freitag', uhrzeit: '20:00 - 22:00 Uhr' }],
    halle: 'Turnhalle Nord',
    halleAdresse: 'Nordstraße 5, 55234 Musterstadt',
    beschreibung:
      'Für alle, die Volleyball mit Freude und Ehrgeiz spielen wollen. Die 3. Herren ist offen für neue Mitspieler jeden Levels.',
    spieler: [
      { name: 'Klaus Demo', nummer: 3, position: 'Außenannahme' },
      { name: 'Bernd Test', nummer: 6, position: 'Zuspiel' },
      { name: 'Frank Probe', nummer: 12, position: 'Diagonal' },
    ],
    spielplan: [
      { datum: '16.09.2024', uhrzeit: '19:00', heimspiel: false, gegner: 'TV Musterort', ergebnis: '3:0' },
      { datum: '07.10.2024', uhrzeit: '19:00', heimspiel: true, gegner: 'SC Beispiel' },
    ],
  },
]

export function getMannschaft(slug: string): Mannschaft | undefined {
  return mannschaften.find((m) => m.slug === slug)
}
