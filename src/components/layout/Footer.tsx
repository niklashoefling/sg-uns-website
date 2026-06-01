import Link from 'next/link'
import Image from 'next/image'

const navLinks = [
  { href: '#ueber-uns', label: 'Über U.N.S.' },
  { href: '#mannschaften', label: 'Mannschaften' },
  { href: '#jugendarbeit', label: 'Jugendarbeit' },
  { href: '#aktuelles', label: 'Aktuelles' },
]

const stammvereine = [
  { name: 'TV Undenheim', url: 'https://tv-undenheim.de/volleyball/', logo: '/vereine/TVU_Logo.png' },
  {
    name: 'SC Schornsheim',
    url: 'https://www.scs97.de/abteilungen/volleyball',
    logo: '/vereine/SCS_Logo.png',
  },
  { name: 'TV Nieder-Olm', url: 'https://www.tvno.de', logo: '/vereine/TVNO_Logo-Volleyball.png' },
]

export default function Footer() {
  return (
    <footer className="bg-secondary-dark text-white/60">
      <div className="max-w-6xl mx-auto px-6 py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 pb-10 border-b border-white/10">
          <div className="flex flex-col gap-4">
            <Image
              src="/sguns_volleys.png"
              alt="SG U.N.S. Rheinhessen Volleys"
              width={200}
              height={200}
              className="brightness-0 invert w-44 h-auto"
            />
            <p className="text-sm leading-relaxed">
              Eine Spielgemeinschaft der Vereine TV Undenheim, SC Schornsheim und TV Nieder-Olm.
              Volleyball in Rheinhessen seit Jahrzehnten.
            </p>
            <a
              href="https://www.instagram.com/sgunsrheinhessen"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm hover:text-white transition-colors w-fit"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
              @sgunsrheinhessen
            </a>
          </div>

          <div>
            <h3 className="text-white text-sm font-semibold uppercase tracking-widest mb-4">
              Navigation
            </h3>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="text-sm hover:text-white transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white text-sm font-semibold uppercase tracking-widest mb-5">
              Stammvereine
            </h3>
            <div className="flex gap-6 items-end">
              {stammvereine.map((v) => (
                <a
                  key={v.name}
                  href={v.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center gap-2 group"
                >
                  <Image
                    src={v.logo}
                    alt={v.name}
                    width={64}
                    height={64}
                    className="w-14 h-14 object-contain opacity-80 group-hover:opacity-100 transition-opacity"
                  />
                  <span className="text-xs text-center leading-tight group-hover:text-white transition-colors">
                    {v.name}
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-xs">© {new Date().getFullYear()} SG U.N.S. Rheinhessen Volleys</p>
          <div className="flex gap-5">
            <Link href="/impressum" className="text-xs hover:text-white transition-colors">
              Impressum
            </Link>
            <Link href="/datenschutz" className="text-xs hover:text-white transition-colors">
              Datenschutz
            </Link>
            <Link href="/admin" className="text-xs hover:text-white transition-colors">
              Admin
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
