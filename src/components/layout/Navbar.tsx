'use client'

import Image from 'next/image'
import { useState, useEffect } from 'react'

const links = [
  { href: '/#ueber-uns', label: 'Über U.N.S.' },
  { href: '/mannschaften', label: 'Mannschaften' },
  { href: '/jugendarbeit', label: 'Jugendarbeit' },
  { href: '/aktuelles', label: 'Aktuelles' },
]

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 bg-secondary transition-shadow ${scrolled ? 'shadow-lg' : ''}`}
    >
      <nav className="max-w-6xl mx-auto px-6 h-17 flex items-center justify-between">
        <a href="/" className="flex items-center overflow-hidden h-14">
          <Image
            src="/vereine/sguns_volleys.png"
            alt="SG U.N.S. Rheinhessen Volleys"
            width={200}
            height={200}
            className="brightness-0 invert w-44 h-auto mt-2"
            priority
          />
        </a>

        <ul className="hidden md:flex items-center gap-2 list-none">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-white/85 hover:text-white hover:bg-white/10 px-3 py-1.5 rounded text-sm font-medium transition-colors"
              >
                {link.label}
              </a>
            </li>
          ))}
          <li>
            <a
              href="/kontakt"
              className="bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-md text-sm font-semibold transition-colors"
            >
              Mitmachen
            </a>
          </li>
        </ul>

        <button
          className="md:hidden flex flex-col gap-1.5 p-1 bg-transparent border-none cursor-pointer"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menü öffnen"
        >
          <span
            className={`block w-6 h-0.5 bg-white rounded transition-transform ${menuOpen ? 'translate-y-2 rotate-45' : ''}`}
          />
          <span
            className={`block w-6 h-0.5 bg-white rounded transition-opacity ${menuOpen ? 'opacity-0' : ''}`}
          />
          <span
            className={`block w-6 h-0.5 bg-white rounded transition-transform ${menuOpen ? '-translate-y-2 -rotate-45' : ''}`}
          />
        </button>
      </nav>

      {menuOpen && (
        <div className="md:hidden bg-secondary-dark px-6 pb-6 flex flex-col gap-1">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-white/85 hover:text-white px-4 py-3 rounded text-base font-medium transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <a
            href="/kontakt"
            className="bg-primary hover:bg-primary-dark text-white px-4 py-3 rounded-md text-base font-semibold text-center mt-2 transition-colors"
            onClick={() => setMenuOpen(false)}
          >
            Mitmachen
          </a>
        </div>
      )}
    </header>
  )
}
