import { getPayload } from 'payload'
import config from '@payload-config'
import PageHeader from '@/components/layout/PageHeader'

export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'Datenschutz | SG U.N.S. Rheinhessen',
  description: 'Datenschutzerklärung der SG U.N.S. Rheinhessen.',
  robots: { index: false },
}

export default async function DatenschutzPage() {
  const payload = await getPayload({ config })
  const impressum = await payload.findGlobal({ slug: 'impressum' })
  const vereine = impressum.vereine ?? []
  const kontaktEmail = impressum.kontaktEmail

  return (
    <div className="min-h-screen bg-white">
      <PageHeader
        eyebrow="SG U.N.S. Rheinhessen"
        title="Datenschutz"
        backHref="/"
        backLabel="Zurück"
      />
      <div className="max-w-3xl mx-auto px-6 py-16 space-y-12 text-gray-800">
        {/* Präambel */}
        <section className="space-y-2">
          <h2 className="text-sm font-semibold uppercase tracking-widest text-gray-400">
            Präambel
          </h2>
          <p className="text-sm leading-relaxed text-gray-600">
            Mit der folgenden Datenschutzerklärung möchten wir Sie darüber aufklären, welche Arten
            Ihrer personenbezogenen Daten (nachfolgend auch kurz als „Daten" bezeichnet) wir zu
            welchen Zwecken und in welchem Umfang verarbeiten. Die Datenschutzerklärung gilt für
            alle von uns durchgeführten Verarbeitungen personenbezogener Daten, sowohl im Rahmen der
            Erbringung unserer Leistungen als auch insbesondere auf unserer Website sowie innerhalb
            externer Onlinepräsenzen, wie z.&nbsp;B. unserer Social-Media-Profile (nachfolgend
            zusammenfassend bezeichnet als „Onlineangebot").
          </p>
          <p className="text-sm leading-relaxed text-gray-600">
            Die verwendeten Begriffe sind nicht geschlechtsspezifisch.
          </p>
          <p className="text-sm text-gray-400">Stand: Juni 2025</p>
        </section>

        <div className="border-t border-gray-100" />

        {/* Verantwortliche */}
        <section className="space-y-2">
          <h2 className="text-sm font-semibold uppercase tracking-widest text-gray-400">
            Verantwortliche
          </h2>
          {vereine.length === 0 && (
            <p className="text-sm text-gray-400 italic">Wird in Kürze ergänzt.</p>
          )}
          {vereine.map((verein, i) => (
            <div key={verein.id ?? i}>
              {i > 0 && <p className="text-sm text-gray-400 py-3">und:</p>}
              <p className="font-semibold mt-2">{verein.name}</p>
              <p className="text-sm text-gray-600">{verein.strasse}</p>
              <p className="text-sm text-gray-600">{verein.ort}</p>
              {verein.email && (
                <p className="text-sm text-gray-600 pt-1">
                  <span className="font-medium text-gray-800">E-Mail:</span>{' '}
                  <a
                    href={`mailto:${verein.email}`}
                    className="text-gray-500 underline hover:text-primary transition-colors"
                  >
                    {verein.email}
                  </a>
                </p>
              )}
            </div>
          ))}
          <p className="text-sm text-gray-600 pt-1">
            <span className="font-medium text-gray-800">Impressum:</span>{' '}
            <a
              href="/impressum"
              className="text-gray-500 underline hover:text-primary transition-colors"
            >
              sgunsrheinhessen.de/impressum
            </a>
          </p>
        </section>

        {/* Kontakt-Box */}
        <section className="space-y-3 bg-gray-50 rounded-xl p-6">
          <h2 className="text-sm font-semibold uppercase tracking-widest text-gray-400">Kontakt</h2>
          <p className="text-sm leading-relaxed text-gray-600">
            Für Anfragen zum Datenschutz oder zur Ausübung Ihrer Rechte nutzen Sie bitte die
            zentrale Kontaktadresse:
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

        <div className="border-t border-gray-100" />

        {/* Sicherheitsmaßnahmen */}
        <section className="space-y-2">
          <h2 className="text-sm font-semibold uppercase tracking-widest text-gray-400">
            Sicherheitsmaßnahmen
          </h2>
          <p className="text-sm leading-relaxed text-gray-600">
            Wir treffen nach Maßgabe der gesetzlichen Vorgaben unter Berücksichtigung des Stands der
            Technik geeignete technische und organisatorische Maßnahmen, um ein dem Risiko
            angemessenes Schutzniveau zu gewährleisten. Dazu gehört insbesondere die Sicherung von
            Online-Verbindungen durch TLS-/SSL-Verschlüsselungstechnologie (HTTPS).
          </p>
        </section>

        <div className="border-t border-gray-100" />

        {/* Hosting */}
        <section className="space-y-2">
          <h2 className="text-sm font-semibold uppercase tracking-widest text-gray-400">
            Hosting &amp; Server-Logfiles
          </h2>
          <p className="text-sm leading-relaxed text-gray-600">
            Diese Seite wird bei Vercel gehostet (Vercel Inc., 440 N Barranca Ave #4133, Covina, CA
            91723, USA). Bei jedem Aufruf erfasst der Hoster automatisch Informationen
            (Server-Logfiles): Browsertyp und -version, Betriebssystem, Referrer URL, Hostname,
            Uhrzeit der Serveranfrage und IP-Adresse.
          </p>
          <p className="text-sm leading-relaxed text-gray-600">
            Rechtsgrundlage ist Art.&nbsp;6 Abs.&nbsp;1 lit.&nbsp;f DSGVO. Logfile-Informationen
            werden für maximal 30 Tage gespeichert und danach gelöscht oder anonymisiert. Da Vercel
            ein US-amerikanisches Unternehmen ist, stützt Vercel den Transfer auf
            Standardvertragsklauseln gemäß Art.&nbsp;46 Abs.&nbsp;2 lit.&nbsp;c DSGVO. Weitere
            Informationen:{' '}
            <a
              href="https://vercel.com/legal/privacy-policy"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 underline hover:text-primary transition-colors"
            >
              Datenschutzerklärung von Vercel
            </a>
            .
          </p>
        </section>

        <div className="border-t border-gray-100" />

        {/* Datenbankdienstleister */}
        <section className="space-y-2">
          <h2 className="text-sm font-semibold uppercase tracking-widest text-gray-400">
            Datenbankdienstleister
          </h2>
          <p className="text-sm leading-relaxed text-gray-600">
            Zur Speicherung von Website-Inhalten (Mannschafts- und Trainerdaten, Artikel, Medien)
            nutzen wir den Datenbankdienst der Neon Inc. (jetzt Teil von Databricks), 160 Spear
            Street, 13th Floor, San Francisco, CA 94105, USA. Die Daten werden auf Servern in der EU
            (Region eu-central-1, Frankfurt/Deutschland) gespeichert. Da Neon ein US-amerikanisches
            Unternehmen ist, stützen wir die Übermittlung auf Standardvertragsklauseln gemäß
            Art.&nbsp;46 Abs.&nbsp;2 lit.&nbsp;c DSGVO. Wir haben einen Vertrag über
            Auftragsverarbeitung (AVV) mit Neon geschlossen. Weitere Informationen:{' '}
            <a
              href="https://neon.tech/privacy-policy"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 underline hover:text-primary transition-colors"
            >
              Datenschutzerklärung von Neon
            </a>
            .
          </p>
        </section>

        <div className="border-t border-gray-100" />

        {/* Dateispeicherung */}
        <section className="space-y-2">
          <h2 className="text-sm font-semibold uppercase tracking-widest text-gray-400">
            Dateispeicherung
          </h2>
          <p className="text-sm leading-relaxed text-gray-600">
            Hochgeladene Bilder und Mediadateien (z.&nbsp;B. Mannschafts- und Trainerfotos) werden
            über Vercel Blob, einem Dateispeicherdienst der Vercel Inc., gespeichert und öffentlich
            bereitgestellt. Die Datenübertragung in die USA erfolgt auf Grundlage der
            Standardvertragsklauseln der EU-Kommission und ist vom AVV mit Vercel abgedeckt.
          </p>
        </section>

        <div className="border-t border-gray-100" />

        {/* Webanalyse */}
        <section className="space-y-2">
          <h2 className="text-sm font-semibold uppercase tracking-widest text-gray-400">
            Webanalyse durch Vercel Analytics
          </h2>
          <p className="text-sm leading-relaxed text-gray-600">
            Diese Website nutzt „Vercel Analytics", ein Analysetool der Vercel Inc. Das Tool dient
            der statistischen Auswertung der Seitennutzung ohne den Einsatz von Cookies. Dabei
            werden keine personenbezogenen Daten dauerhaft gespeichert. Die IP-Adresse wird
            lediglich kurzzeitig zur Bestimmung des Standorts (auf Regionsebene) verarbeitet und
            dann umgehend verworfen. Rechtsgrundlage ist Art.&nbsp;6 Abs.&nbsp;1 lit.&nbsp;f DSGVO.
            Weitere Informationen:{' '}
            <a
              href="https://vercel.com/legal/privacy-policy"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 underline hover:text-primary transition-colors"
            >
              Datenschutzerklärung von Vercel
            </a>
            .
          </p>
        </section>

        <div className="border-t border-gray-100" />

        {/* Kontaktformular */}
        <section className="space-y-2">
          <h2 className="text-sm font-semibold uppercase tracking-widest text-gray-400">
            Kontaktformular, E-Mail &amp; Telefon
          </h2>
          <p className="text-sm leading-relaxed text-gray-600">
            Wenn Sie uns per Kontaktformular Anfragen zukommen lassen, werden Ihre Angaben (Name,
            E-Mail-Adresse, Anliegen, Betreff und Nachricht) zur Bearbeitung der Anfrage per E-Mail
            an die zuständige Stelle weitergeleitet. Die Daten werden nicht in einer Datenbank
            gespeichert und nicht ohne Ihre Einwilligung an Dritte weitergegeben.
          </p>
          <p className="text-sm leading-relaxed text-gray-600">
            Wenn Sie uns per E-Mail oder Telefon kontaktieren, wird Ihre Anfrage inklusive aller
            daraus hervorgehenden personenbezogenen Daten (Name, Anfrage) zum Zwecke der Bearbeitung
            Ihres Anliegens bei uns gespeichert und verarbeitet. Diese Daten geben wir nicht ohne
            Ihre Einwilligung weiter.
          </p>
          <p className="text-sm leading-relaxed text-gray-600">
            Für den E-Mail-Versand nutzen wir den SMTP-Dienst der netcup GmbH, Daimlerstraße 25,
            76185 Karlsruhe, Deutschland. Netcup ist ein deutscher Anbieter; es findet kein
            Datentransfer in Drittländer statt. Rechtsgrundlage ist Art.&nbsp;6 Abs.&nbsp;1
            lit.&nbsp;f DSGVO.
          </p>
        </section>

        <div className="border-t border-gray-100" />

        {/* Personendaten */}
        <section className="space-y-2">
          <h2 className="text-sm font-semibold uppercase tracking-widest text-gray-400">
            Veröffentlichung von Vereins- und Personendaten
          </h2>
          <p className="text-sm leading-relaxed text-gray-600">
            Auf den Mannschaftsseiten dieser Website werden personenbezogene Daten von Spielerinnen,
            Spielern und Trainern veröffentlicht (Name, Trikotnummer, Position, Jahrgang, Größe,
            Nationalität, Lizenz). Die Veröffentlichung erfolgt auf Grundlage von Art.&nbsp;6
            Abs.&nbsp;1 lit.&nbsp;f DSGVO im Rahmen des berechtigten Vereinsinteresses an der
            Darstellung der Mannschaften. Fotos werden ausschließlich nach vorheriger Einwilligung
            (Art.&nbsp;6 Abs.&nbsp;1 lit.&nbsp;a DSGVO) veröffentlicht. Die Einwilligung kann
            jederzeit mit Wirkung für die Zukunft widerrufen werden.
          </p>
          <p className="text-sm leading-relaxed text-gray-600">
            Betroffene Personen können jederzeit die Löschung oder Berichtigung ihrer Daten
            verlangen. Bitte wenden Sie sich dazu über das{' '}
            <a
              href="/kontakt"
              className="text-gray-500 underline hover:text-primary transition-colors"
            >
              Kontaktformular
            </a>{' '}
            an uns.
          </p>
        </section>

        <div className="border-t border-gray-100" />

        {/* Social Media */}
        <section className="space-y-2">
          <h2 className="text-sm font-semibold uppercase tracking-widest text-gray-400">
            Präsenzen in sozialen Netzwerken
          </h2>
          <p className="text-sm leading-relaxed text-gray-600">
            Wir unterhalten Onlinepräsenzen innerhalb sozialer Netzwerke. Auf dieser Website
            befinden sich ausschließlich Links zu diesen Profilen – es sind keine
            Social-Media-Plugins, Schaltflächen oder Einbettungen integriert. Durch das bloße
            Aufrufen dieser Website werden keine Daten an Social-Media-Plattformen übermittelt. Beim
            Anklicken eines Links verlassen Sie diese Website; es gelten dann die
            Datenschutzbestimmungen des jeweiligen Anbieters. Nutzerdaten können dabei außerhalb der
            EU verarbeitet werden.
          </p>
        </section>

        <div className="border-t border-gray-100" />

        {/* Rechtsgrundlagen */}
        <section className="space-y-2">
          <h2 className="text-sm font-semibold uppercase tracking-widest text-gray-400">
            Maßgebliche Rechtsgrundlagen
          </h2>
          <p className="text-sm leading-relaxed text-gray-600">
            Im Folgenden eine Übersicht der Rechtsgrundlagen der DSGVO, auf deren Basis wir
            personenbezogene Daten verarbeiten:
          </p>
          <div className="text-sm text-gray-600 space-y-2 pt-1">
            <p>
              <span className="font-medium text-gray-800">
                Einwilligung (Art.&nbsp;6 Abs.&nbsp;1 S.&nbsp;1 lit.&nbsp;a DSGVO)
              </span>{' '}
              — Die betroffene Person hat ihre Einwilligung in die Verarbeitung für einen
              spezifischen Zweck gegeben.
            </p>
            <p>
              <span className="font-medium text-gray-800">
                Berechtigte Interessen (Art.&nbsp;6 Abs.&nbsp;1 S.&nbsp;1 lit.&nbsp;f DSGVO)
              </span>{' '}
              — Die Verarbeitung ist zur Wahrung der berechtigten Interessen des Verantwortlichen
              notwendig, sofern die Interessen der betroffenen Person nicht überwiegen.
            </p>
          </div>
          <p className="text-sm leading-relaxed text-gray-600">
            Zusätzlich gelten nationale Regelungen zum Datenschutz in Deutschland, insbesondere das
            Bundesdatenschutzgesetz (BDSG).
          </p>
        </section>

        <div className="border-t border-gray-100" />

        {/* Löschung */}
        <section className="space-y-2">
          <h2 className="text-sm font-semibold uppercase tracking-widest text-gray-400">
            Datenspeicherung und Löschung
          </h2>
          <p className="text-sm leading-relaxed text-gray-600">
            Wir löschen personenbezogene Daten, sobald die zugrundeliegenden Einwilligungen
            widerrufen werden oder keine weiteren rechtlichen Grundlagen für die Verarbeitung
            bestehen. Ausnahmen bestehen, wenn gesetzliche Pflichten eine längere Aufbewahrung
            erfordern (z.&nbsp;B. 10 Jahre für Buchungsunterlagen, 3 Jahre reguläre Verjährungsfrist
            gemäß §§&nbsp;195, 199 BGB).
          </p>
        </section>

        <div className="border-t border-gray-100" />

        {/* Betroffenenrechte */}
        <section className="space-y-2">
          <h2 className="text-sm font-semibold uppercase tracking-widest text-gray-400">
            Rechte der betroffenen Personen
          </h2>
          <p className="text-sm leading-relaxed text-gray-600">
            Ihnen stehen als Betroffene nach der DSGVO verschiedene Rechte zu (Art.&nbsp;15–21
            DSGVO):
          </p>
          <div className="text-sm text-gray-600 space-y-2 pt-1">
            <p>
              <span className="font-medium text-gray-800">Widerspruchsrecht</span> — Recht,
              jederzeit gegen die Verarbeitung auf Basis von Art.&nbsp;6 Abs.&nbsp;1 lit.&nbsp;e
              oder f DSGVO Widerspruch einzulegen.
            </p>
            <p>
              <span className="font-medium text-gray-800">Widerrufsrecht</span> — Recht, erteilte
              Einwilligungen jederzeit zu widerrufen.
            </p>
            <p>
              <span className="font-medium text-gray-800">Auskunftsrecht</span> — Recht auf Auskunft
              über Ihre verarbeiteten Daten sowie auf eine Kopie.
            </p>
            <p>
              <span className="font-medium text-gray-800">Recht auf Berichtigung</span> — Recht, die
              Berichtigung unrichtiger Daten zu verlangen.
            </p>
            <p>
              <span className="font-medium text-gray-800">
                Recht auf Löschung und Einschränkung
              </span>{' '}
              — Recht, Löschung oder Einschränkung der Verarbeitung zu verlangen.
            </p>
            <p>
              <span className="font-medium text-gray-800">
                Recht auf Einschränkung der Verarbeitung
              </span>{' '}
              — Sie können die Einschränkung der Verarbeitung Ihrer Daten verlangen, wenn Sie die
              Richtigkeit der Daten bestreiten (für die Dauer der Prüfung), wenn die Verarbeitung
              unrechtmäßig war und Sie statt Löschung Einschränkung verlangen, wenn wir die Daten
              nicht mehr benötigen, Sie sie aber zur Geltendmachung von Rechtsansprüchen brauchen,
              oder wenn Sie Widerspruch nach Art.&nbsp;21 Abs.&nbsp;1 DSGVO eingelegt haben und noch
              nicht feststeht, wessen Interessen überwiegen.
            </p>
            <p>
              <span className="font-medium text-gray-800">Recht auf Datenübertragbarkeit</span> —
              Recht, Ihre Daten in einem maschinenlesbaren Format zu erhalten.
            </p>
            <p>
              <span className="font-medium text-gray-800">Beschwerderecht</span> — Recht auf
              Beschwerde bei einer Aufsichtsbehörde. Zuständig für Rheinland-Pfalz:{' '}
              <a
                href="https://www.datenschutz.rlp.de"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 underline hover:text-primary transition-colors"
              >
                Landesbeauftragter für den Datenschutz und die Informationsfreiheit Rheinland-Pfalz
              </a>
              .
            </p>
          </div>
        </section>

        <div className="border-t border-gray-100" />

        {/* Änderungen */}
        <section className="space-y-2">
          <h2 className="text-sm font-semibold uppercase tracking-widest text-gray-400">
            Änderung und Aktualisierung
          </h2>
          <p className="text-sm leading-relaxed text-gray-600">
            Wir passen die Datenschutzerklärung an, sobald Änderungen der von uns durchgeführten
            Datenverarbeitungen dies erforderlich machen. Wir bitten Sie, sich regelmäßig über den
            Inhalt dieser Datenschutzerklärung zu informieren.
          </p>
        </section>
      </div>
    </div>
  )
}
