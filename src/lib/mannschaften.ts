export type Position =
  | 'Zuspiel'
  | 'Außenangriff'
  | 'Diagonal'
  | 'Mittelblock'
  | 'Libero'
  | 'Universal'

export type Spieler = {
  name: string
  nummer?: number
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
  teamfoto?: string
  trainer: { name: string; email?: string }[]
  training: { tag: string; uhrzeit: string }[]
  halle: string
  halleAdresse: string
  beschreibung: string
  spieler: Spieler[]
  spielplan: Spiel[]
}
