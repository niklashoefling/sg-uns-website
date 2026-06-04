export const navLinks = [
  { href: '/#ueber-uns', label: 'Über U.N.S.' },
  {
    href: '/mannschaften',
    label: 'Verein',
    children: [
      { href: '/mannschaften', label: 'Mannschaften' },
      { href: '/jugendarbeit', label: 'Jugendarbeit' },
      { href: '/trainer', label: 'Trainerstab' },
      { href: '/hallen', label: 'Hallenverzeichnis' },
    ],
  },
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

const FLAGGEN: Record<string, string> = {
  deutschland: '🇩🇪',
  österreich: '🇦🇹',
  schweiz: '🇨🇭',
  frankreich: '🇫🇷',
  niederlande: '🇳🇱',
  belgien: '🇧🇪',
  italien: '🇮🇹',
  spanien: '🇪🇸',
  portugal: '🇵🇹',
  polen: '🇵🇱',
  tschechien: '🇨🇿',
  slowakei: '🇸🇰',
  ungarn: '🇭🇺',
  kroatien: '🇭🇷',
  serbien: '🇷🇸',
  slowenien: '🇸🇮',
  russland: '🇷🇺',
  ukraine: '🇺🇦',
  türkei: '🇹🇷',
  brasilien: '🇧🇷',
  usa: '🇺🇸',
  kanada: '🇨🇦',
  argentinien: '🇦🇷',
  kuba: '🇨🇺',
  japan: '🇯🇵',
  china: '🇨🇳',
  südkorea: '🇰🇷',
  iran: '🇮🇷',
  bulgarien: '🇧🇬',
  rumänien: '🇷🇴',
  griechenland: '🇬🇷',
  finnland: '🇫🇮',
  schweden: '🇸🇪',
  norwegen: '🇳🇴',
  dänemark: '🇩🇰',
}

export function toFlagge(nationalitaet: string): string {
  return FLAGGEN[nationalitaet.toLowerCase()] ?? nationalitaet
}
