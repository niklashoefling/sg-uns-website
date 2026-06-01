export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center bg-linear-to-br from-secondary via-[#2a527a] to-[#1a3050] overflow-hidden">
      <div className="absolute right-0 bottom-0 text-[28rem] leading-none opacity-[0.04] select-none pointer-events-none translate-x-16 translate-y-16">
        🏐
      </div>

      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_50%,rgba(249,115,22,0.10),transparent_55%)] pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 pt-28 pb-24 w-full">
        <h1 className="text-6xl md:text-8xl font-bold text-white leading-[1.05] mb-6">
          SG U.N.S.
          <br />
          <span className="text-primary">Rheinhessen</span>
        </h1>

        <p className="text-lg text-white/75 max-w-xl mb-10 leading-relaxed">
          Eine Spielgemeinschaft der Vereine TV Undenheim, SC Schornsheim und TV Nieder-Olm -
          Volleyball in Rheinhessen.
        </p>

        <div className="flex gap-4 flex-wrap">
          <a
            href="/mannschaften"
            className="bg-primary hover:bg-primary-dark text-white font-semibold px-7 py-3 rounded-lg transition-colors"
          >
            Unsere Mannschaften
          </a>
          <a
            href="/kontakt"
            className="border-2 border-white/60 text-white hover:border-white hover:bg-white/10 font-semibold px-7 py-3 rounded-lg transition-colors"
          >
            Mitspielen
          </a>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-20 bg-linear-to-t from-white/5 to-transparent pointer-events-none" />
    </section>
  )
}
