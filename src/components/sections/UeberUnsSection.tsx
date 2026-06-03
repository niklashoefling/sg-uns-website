import Image from 'next/image'
import { stammvereine } from '@/lib/site'
import SectionHeading from '@/components/ui/SectionHeading'

export default function UeberUnsSection() {
  return (
    <section className="py-20 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <SectionHeading as="span" className="mb-3 block">
              Über U.N.S.
            </SectionHeading>
            <h2 className="text-4xl font-bold text-secondary leading-tight mb-6">
              Volleyball in Rheinhessen seit Jahrzehnten
            </h2>
            <div className="space-y-4 text-gray-500 leading-relaxed">
              <p>
                Die SG U.N.S. Rheinhessen ist eine Spielgemeinschaft der Vereine TV Undenheim, SC
                Schornsheim und TV Nieder-Olm. Was als enge Zusammenarbeit in der Jugend begann, ist
                heute eine starke Gemeinschaft mit drei Herrenmannschaften in unterschiedlichen
                Ligen.
              </p>
              <p>
                Unser Ziel: talentierten Spielern aus der Region ein passendes Umfeld bieten. Vom
                Nachwuchs bis zum ambitionierten Vereinsspieler. Wer Volleyball liebt und in
                Rheinhessen zu Hause ist, ist bei uns richtig.
              </p>
            </div>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-6">
              Unsere Stammvereine
            </p>
            <div className="grid grid-cols-3 gap-6">
              {stammvereine.map((v) => (
                <a
                  key={v.name}
                  href={v.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center gap-3 group"
                >
                  <div className="w-20 h-20 flex items-center justify-center">
                    <Image
                      src={v.logo}
                      alt={v.name}
                      width={80}
                      height={80}
                      className="w-full h-full object-contain opacity-70 group-hover:opacity-100 transition-opacity"
                    />
                  </div>
                  <span className="text-xs text-center text-gray-400 group-hover:text-secondary transition-colors leading-tight">
                    {v.name}
                  </span>
                </a>
              ))}
            </div>

            <div className="mt-10 grid grid-cols-3 gap-4 border-t border-gray-100 pt-8">
              {[
                { zahl: '3', label: 'Mannschaften' },
                { zahl: '3', label: 'Stammvereine' },
                { zahl: '50+', label: 'Aktive Spieler' },
              ].map(({ zahl, label }) => (
                <div key={label} className="text-center">
                  <div className="text-3xl font-bold text-secondary">{zahl}</div>
                  <div className="text-xs text-gray-400 mt-1">{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
