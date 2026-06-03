'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { navLinks } from '@/lib/site'

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const pathname = usePathname()

  useEffect(() => {
    setOpenDropdown(null)
    setMenuOpen(false)
  }, [pathname])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const onPopState = () => setOpenDropdown(null)
    window.addEventListener('popstate', onPopState)
    return () => window.removeEventListener('popstate', onPopState)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 bg-secondary transition-shadow ${scrolled ? 'shadow-lg' : ''}`}
    >
      {openDropdown && <div className="fixed inset-0 z-40" onClick={() => setOpenDropdown(null)} />}

      <nav className="max-w-6xl mx-auto px-6 h-17 flex items-center justify-between">
        {' '}
        <Link href="/" className="flex items-center overflow-hidden h-14">
          <Image
            src="/vereine/sguns_volleys.png"
            alt="SG U.N.S. Rheinhessen Volleys"
            width={200}
            height={200}
            className="brightness-0 invert w-44 h-auto mt-2"
            priority
          />
        </Link>
        <ul className="hidden md:flex items-center gap-2 list-none relative z-50">
          {navLinks.map((link) =>
            link.children ? (
              <li key={link.href} className="relative">
                <button
                  type="button"
                  onClick={() => setOpenDropdown(openDropdown === link.href ? null : link.href)}
                  className="flex items-center gap-1 text-white/85 hover:text-white hover:bg-white/10 px-3 py-1.5 rounded text-sm font-medium transition-colors cursor-pointer bg-transparent border-none"
                >
                  {link.label}
                  <svg
                    className={`w-3 h-3 transition-transform ${openDropdown === link.href ? 'rotate-180' : ''}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2.5}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {openDropdown === link.href && (
                  <div className="absolute top-full left-0 mt-1 bg-white rounded-lg shadow-lg border border-gray-100 py-1 min-w-44 z-50">
                    {link.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className="block px-4 py-2.5 text-sm text-secondary hover:bg-gray-50 hover:text-primary transition-colors"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </li>
            ) : (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-white/85 hover:text-white hover:bg-white/10 px-3 py-1.5 rounded text-sm font-medium transition-colors"
                >
                  {link.label}
                </Link>
              </li>
            ),
          )}
          <li>
            <Link
              href="/kontakt"
              className="bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-md text-sm font-semibold transition-colors"
            >
              Mitmachen
            </Link>
          </li>
        </ul>
        <button
          type="button"
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
        <div className="md:hidden bg-secondary px-6 pb-6 flex flex-col gap-1">
          {navLinks.map((link) =>
            link.children ? (
              <div key={link.href}>
                <span className="text-white/85 px-4 py-3 block text-base font-medium">
                  {link.label}
                </span>
                <div className="pl-4 flex flex-col gap-0.5">
                  {link.children.map((child) => (
                    <Link
                      key={child.href}
                      href={child.href}
                      className="text-white/85 hover:text-white px-4 py-2 rounded text-base font-medium transition-colors"
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              </div>
            ) : (
              <Link
                key={link.href}
                href={link.href}
                className="text-white/85 hover:text-white px-4 py-3 rounded text-base font-medium transition-colors"
              >
                {link.label}
              </Link>
            ),
          )}
          <Link
            href="/kontakt"
            className="bg-primary hover:bg-primary-dark text-white px-4 py-3 rounded-md text-base font-semibold text-center mt-2 transition-colors"
          >
            Mitmachen
          </Link>
        </div>
      )}
    </header>
  )
}
