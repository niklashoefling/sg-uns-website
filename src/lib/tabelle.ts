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

export const tabellen: Record<string, Tabelle> = {
  '1-herren': {
    liga: 'VVRP Verbandsliga Süd',
    saison: '2025/26',
    stand: '01.06.2025',
    eintraege: [
      { platz: 1,  verein: 'VC Musterbach',         spiele: 12, siege: 11, niederlagen: 1,  saetze_gewonnen: 33, saetze_verloren: 8,  punkte_gewonnen: 1210, punkte_verloren: 890,  punkte: 22 },
      { platz: 2,  verein: 'TSV Beispieldorf',       spiele: 12, siege: 9,  niederlagen: 3,  saetze_gewonnen: 29, saetze_verloren: 14, punkte_gewonnen: 1150, punkte_verloren: 980,  punkte: 18 },
      { platz: 3,  verein: 'SG U.N.S. Rheinhessen', spiele: 12, siege: 8,  niederlagen: 4,  saetze_gewonnen: 26, saetze_verloren: 16, punkte_gewonnen: 1100, punkte_verloren: 1010, punkte: 16, highlight: true },
      { platz: 4,  verein: 'SV Probe',               spiele: 12, siege: 7,  niederlagen: 5,  saetze_gewonnen: 24, saetze_verloren: 18, punkte_gewonnen: 1080, punkte_verloren: 1040, punkte: 14 },
      { platz: 5,  verein: 'VfB Testheim',           spiele: 12, siege: 6,  niederlagen: 6,  saetze_gewonnen: 22, saetze_verloren: 22, punkte_gewonnen: 1050, punkte_verloren: 1050, punkte: 12 },
      { platz: 6,  verein: 'SC Demoburg',            spiele: 12, siege: 5,  niederlagen: 7,  saetze_gewonnen: 19, saetze_verloren: 23, punkte_gewonnen: 1020, punkte_verloren: 1080, punkte: 10 },
      { platz: 7,  verein: 'TV Platzhalter',         spiele: 12, siege: 4,  niederlagen: 8,  saetze_gewonnen: 16, saetze_verloren: 26, punkte_gewonnen: 980,  punkte_verloren: 1120, punkte: 8  },
      { platz: 8,  verein: 'VC Beispielstadt',       spiele: 12, siege: 3,  niederlagen: 9,  saetze_gewonnen: 13, saetze_verloren: 29, punkte_gewonnen: 940,  punkte_verloren: 1160, punkte: 6  },
      { platz: 9,  verein: 'TV Musterort',           spiele: 12, siege: 2,  niederlagen: 10, saetze_gewonnen: 10, saetze_verloren: 32, punkte_gewonnen: 900,  punkte_verloren: 1200, punkte: 4  },
      { platz: 10, verein: 'SC Letzter',             spiele: 12, siege: 0,  niederlagen: 12, saetze_gewonnen: 4,  saetze_verloren: 36, punkte_gewonnen: 820,  punkte_verloren: 1280, punkte: 0  },
    ],
  },
}

export function getTabelle(slug: string): Tabelle | undefined {
  return tabellen[slug]
}
