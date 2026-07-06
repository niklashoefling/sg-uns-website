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
  uuid?: string
  datum: string
  uhrzeit: string
  heimspiel: boolean
  gegner: string
  ergebnis?: string
}

export type SpielDetail = {
  uuid: string
  datum: string
  uhrzeit: string
  heimteam: string
  gastteam: string
  ergebnis?: string
  saetze?: { nummer: number; punkte: string }[]
  ort?: {
    name: string
    adresse?: string
    mapsUrl?: string
  }
  ligaName?: string
}

export type Mannschaft = {
  slug: string
  name: string
  liga?: string
  teamfoto?: string
  trainer: { name: string; email?: string }[]
  training: { tag: string; uhrzeit: string; halle?: string }[]
  beschreibung: string
}

export type Tabellenplatz = {
  platz: number
  verein: string
  spiele: number
  siege: number
  niederlagen: number
  saetze_gewonnen: number
  saetze_verloren: number
  punkte_gewonnen: number
  punkte_verloren: number
  punkte: number
  highlight?: boolean
}

export type Tabelle = {
  liga: string
  saison: string
  stand: string
  eintraege: Tabellenplatz[]
  aufstieg?: number // Anzahl Aufstiegsplätze
  abstieg?: number // Anzahl Abstiegsplätze
}
