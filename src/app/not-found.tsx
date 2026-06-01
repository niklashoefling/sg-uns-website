import Link from 'next/link'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import '@/app/(frontend)/globals.css'

export default function NotFound() {
  return (
    <>
      <Navbar />
      <div className="relative min-h-screen flex items-center justify-center bg-secondary overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center select-none pointer-events-none">
          <span className="text-[20rem] font-bold text-white/3 leading-none">404</span>
        </div>

        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(249,115,22,0.08),transparent_60%)] pointer-events-none" />

        <div className="relative z-10 text-center px-6">
          <span className="inline-block bg-primary/20 text-primary border border-primary/40 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest mb-8">
            Seite nicht gefunden
          </span>

          <h1 className="text-8xl md:text-9xl font-bold text-white leading-none mb-4">
            4<span className="text-primary">0</span>4
          </h1>

          <p className="text-white/60 text-lg max-w-sm mx-auto mb-10 leading-relaxed">
            Diese Seite existiert nicht – aber unsere Mannschaften schon.
          </p>

          <Link
            href="/"
            className="inline-block bg-primary hover:bg-primary-dark text-white font-semibold px-8 py-3 rounded-lg transition-colors"
          >
            Zurück zur Startseite
          </Link>
        </div>
      </div>
      <Footer />
    </>
  )
}
