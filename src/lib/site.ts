export const navLinks = [
  { href: '/#ueber-uns', label: 'Über U.N.S.' },
  {
    href: '/mannschaften',
    label: 'Verein',
    children: [
      { href: '/mannschaften', label: 'Alle Mannschaften' },
      { href: '/trainer', label: 'Trainerstab' },
      { href: '/hallen', label: 'Hallenverzeichnis' },
    ],
  },
  { href: '/jugendarbeit', label: 'Jugendarbeit' },
  { href: '/aktuelles', label: 'Aktuelles' },
]

export const WOCHENTAGE = [
  'Montag',
  'Dienstag',
  'Mittwoch',
  'Donnerstag',
  'Freitag',
  'Samstag',
  'Sonntag',
]

export const stammvereine = [
  {
    name: 'TV Undenheim',
    url: 'https://tv-undenheim.de/volleyball/',
    logo: '/vereine/TVU_Logo.png',
  },
  {
    name: 'SC Schornsheim',
    url: 'https://www.scs97.de/abteilungen/volleyball',
    logo: '/vereine/SCS_Logo.png',
  },
  { name: 'TV Nieder-Olm', url: 'https://www.tvno.de', logo: '/vereine/TVNO_Logo-Volleyball.png' },
]
