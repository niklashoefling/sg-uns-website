import Link from 'next/link'
import { getPayload } from 'payload'
import config from '@payload-config'
import PageHeader from '@/components/layout/PageHeader'

export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'Impressum | SG U.N.S. Rheinhessen',
  description: 'Impressum der SG U.N.S. Rheinhessen.',
  robots: { index: false },
}

export default async function ImpressumPage() {
  const payload = await getPayload({ config })
  const data = await payload.findGlobal({ slug: 'impressum' })

  const vereine = data.vereine ?? []
  const redaktionell = data.redaktionellVerantwortlicher
  const socialMedia = data.socialMedia ?? []
  const kontaktEmail = data.kontaktEmail

  return (
    <div className="min-h-screen bg-white">
      <PageHeader
        eyebrow="SG U.N.S. Rheinhessen"
        title="Impressum"
        backHref="/"
        backLabel="Zurück"
      />
      <div className="max-w-3xl mx-auto px-6 py-16 space-y-12 text-gray-800">
        <section className="space-y-1">
          <p className="text-sm font-semibold uppercase tracking-widest text-gray-400 mt-6">
            Angaben gemäß § 5 DDG
          </p>

          {vereine.length === 0 && (
            <p className="text-sm text-gray-400 italic">Wird in Kürze ergänzt.</p>
          )}

          {vereine.map((verein, i) => (
            <div key={verein.id ?? i}>
              {i > 0 && <p className="text-sm text-gray-400 py-3">und:</p>}
              <p className="font-semibold mt-2">{verein.name}</p>
              <p>{verein.strasse}</p>
              <p>{verein.ort}</p>
              <div className="pt-2 pb-2 space-y-1 text-sm text-gray-600">
                {verein.telefon && (
                  <p>
                    <span className="font-medium text-gray-800">Telefon:</span> {verein.telefon}
                  </p>
                )}
                {verein.email && (
                  <p>
                    <span className="font-medium text-gray-800">E-Mail:</span>{' '}
                    <a
                      href={`mailto:${verein.email}`}
                      className="text-gray-500 underline hover:text-primary transition-colors"
                    >
                      {verein.email}
                    </a>
                  </p>
                )}
                {verein.website && (
                  <p>
                    <span className="font-medium text-gray-800">Website:</span>{' '}
                    <a
                      href={verein.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-500 underline hover:text-primary transition-colors"
                    >
                      {verein.website}
                    </a>
                  </p>
                )}
                {verein.vereinsregister && (
                  <p>
                    <span className="font-medium text-gray-800">Vereinsregister:</span>{' '}
                    {verein.vereinsregister}
                  </p>
                )}
                {verein.registergericht && (
                  <p>
                    <span className="font-medium text-gray-800">Registergericht:</span>{' '}
                    {verein.registergericht}
                  </p>
                )}
                {verein.vertretung && (
                  <p>
                    <span className="font-medium text-gray-800">Vertreten durch:</span>{' '}
                    {verein.vertretung}
                  </p>
                )}
              </div>
            </div>
          ))}
        </section>

        <div className="border-t border-gray-100" />

        <section className="space-y-2">
          <h2 className="text-sm font-semibold uppercase tracking-widest text-gray-400">
            Redaktionell verantwortlich{' '}
            <span className="normal-case tracking-normal font-normal text-gray-400">
              (§ 18 Abs. 2 MStV)
            </span>
          </h2>
          {redaktionell?.name ? (
            <div className="text-sm text-gray-600 space-y-1">
              <p>{redaktionell.name}</p>
              {redaktionell.adresse && <p>{redaktionell.adresse}</p>}
            </div>
          ) : (
            <p className="text-sm text-gray-400 italic">Wird in Kürze ergänzt.</p>
          )}
        </section>

        <div className="border-t border-gray-100" />

        <section className="space-y-3 bg-gray-50 rounded-xl p-6">
          <h2 className="text-sm font-semibold uppercase tracking-widest text-gray-400">Kontakt</h2>
          <p className="text-sm leading-relaxed text-gray-600">
            Für Anfragen bezüglich dieser Webseite oder des Spielbetriebs der Spielgemeinschaft
            nutzen Sie bitte die zentrale Kontaktadresse:
          </p>
          {kontaktEmail ? (
            <a
              href={`mailto:${kontaktEmail}`}
              className="text-gray-500 underline hover:text-primary transition-colors"
            >
              {kontaktEmail}
            </a>
          ) : (
            <p className="text-sm text-gray-400 italic">Wird in Kürze ergänzt.</p>
          )}
        </section>

        {socialMedia.length > 0 && (
          <>
            <div className="border-t border-gray-100" />
            <section className="space-y-2">
              <h2 className="text-sm font-semibold uppercase tracking-widest text-gray-400">
                Social Media und andere Onlinepräsenzen
              </h2>
              <p className="text-sm text-gray-600">
                Dieses Impressum gilt auch für die folgenden Social-Media-Präsenzen und
                Onlineprofile:
              </p>
              <div className="space-y-1">
                {socialMedia.map((profil, i) => (
                  <p key={profil.id ?? i}>
                    <a
                      href={profil.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-500 underline hover:text-primary transition-colors"
                    >
                      {profil.url}
                    </a>
                  </p>
                ))}
              </div>
            </section>
          </>
        )}

        <div className="border-t border-gray-100" />

        <section className="space-y-2">
          <h2 className="text-sm font-semibold uppercase tracking-widest text-gray-400">
            Haftung für Links
          </h2>
          <p className="text-sm leading-relaxed text-gray-600">
            Unser Angebot enthält Links zu externen Webseiten Dritter, auf deren Inhalte wir keinen
            Einfluss haben. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter
            oder Betreiber verantwortlich. Die verlinkten Seiten wurden zum Zeitpunkt der Verlinkung
            auf mögliche Rechtsverstöße überprüft. Rechtswidrige Inhalte waren zum Zeitpunkt der
            Verlinkung nicht erkennbar.
          </p>
        </section>

        <div className="border-t border-gray-100" />

        <section className="space-y-2">
          <h2 className="text-sm font-semibold uppercase tracking-widest text-gray-400">
            Urheberrecht
          </h2>
          <p className="text-sm leading-relaxed text-gray-600">
            Die durch uns erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen
            Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung
            außerhalb der Grenzen des Urheberrechtes bedürfen unserer schriftlichen Zustimmung.
            Downloads und Kopien dieser Seite sind nur für den privaten, nicht kommerziellen
            Gebrauch gestattet.
          </p>
        </section>

        <div className="border-t border-gray-100" />

        <section className="space-y-2">
          <h2 className="text-sm font-semibold uppercase tracking-widest text-gray-400">
            Verbraucherstreitbeilegung
          </h2>
          <p className="text-sm leading-relaxed text-gray-600">
            Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer
            Verbraucherschlichtungsstelle teilzunehmen.
          </p>
        </section>

        <div className="border-t border-gray-100" />

        <section className="space-y-4">
          <h2 className="text-sm font-semibold uppercase tracking-widest text-gray-400">
            Bildnachweise &amp; Technische Umsetzung
          </h2>

          <div className="space-y-1">
            <h3 className="text-sm font-semibold text-gray-700">Bildnachweise</h3>
            <p className="text-sm leading-relaxed text-gray-600">
              Die auf dieser Website verwendeten Fotos stammen aus privaten Archiven von
              Mitgliedern, Spielern und Trainern der Spielgemeinschaft, sofern nicht anders direkt
              am Bild angegeben.
            </p>
          </div>

          <div className="space-y-1">
            <h3 className="text-sm font-semibold text-gray-700">Design &amp; Programmierung</h3>
            <a
              href="https://niklas-hoefling.de/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-gray-500 underline hover:text-primary transition-colors"
            >
              Niklas Höfling
            </a>
          </div>
        </section>

        <div className="border-t border-gray-100" />

        <p className="text-sm text-gray-500">
          Weitere Informationen zum Umgang mit deinen Daten findest du in unserer{' '}
          <Link
            href="/datenschutz"
            className="text-gray-500 underline hover:text-primary transition-colors"
          >
            Datenschutzerklärung
          </Link>
          .
        </p>
      </div>
    </div>
  )
}
