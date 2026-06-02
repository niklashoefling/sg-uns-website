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
}
