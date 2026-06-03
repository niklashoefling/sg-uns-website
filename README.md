# SG U.N.S. Rheinhessen Volleys – Website

Next.js 16 + Payload CMS 3 Vereinswebseite für die SG U.N.S. Rheinhessen.

## Setup

```bash
npm install
npm run dev
```

Admin-Panel: `http://localhost:3000/admin`

## DSGVO & Datenschutz

### Was in die Datenschutzerklärung muss

#### 1. Hosting — Vercel
- Anbieter: Vercel Inc., USA
- Serverstandort: Frankfurt (EU) eingestellt
- Zweck: Bereitstellung der Website
- DPA mit Vercel abschließen (Vercel Account → Settings → Legal)
- Hinweis auf Drittlandtransfer in die USA + Standardvertragsklauseln (SCCs) als Schutzmaßnahme nennen

#### 2. Datenbank — Neon
- Anbieter: Neon Inc., USA
- Serverstandort: Frankfurt (`eu-central-1`, AWS)
- Zweck: Speicherung von Vereinsinhalten und Admin-Zugängen
- DPA in den Neon Account-Einstellungen unter „Legal" unterzeichnen
- Hinweis auf Drittlandtransfer + SCCs nennen

#### 3. Kontaktformular
- Erhobene Daten: Name, E-Mail-Adresse, Nachricht
- Zweck: Bearbeitung der Kontaktanfrage
- Rechtsgrundlage: Art. 6 Abs. 1 lit. b DSGVO (vorvertragliche Maßnahmen) oder lit. f (berechtigtes Interesse)
- Speicherung: Daten werden **nicht in der Datenbank gespeichert**, sondern ausschließlich per E-Mail weitergeleitet
- E-Mail-Versand über Strato SMTP (`no-reply@sgunsrheinhessen.de`) — deutsches Unternehmen, kein Drittlandtransfer
- Löschung: E-Mails nach Bearbeitung der Anfrage löschen

#### 4. Spielerdaten (Kader)
- Erhobene Daten: Name, Position, Trikotnummer, Foto
- Rechtsgrundlage:
  - Name, Position, Trikotnummer: berechtigtes Interesse des Vereins (Art. 6 Abs. 1 lit. f DSGVO)
  - **Fotos: explizite schriftliche Einwilligung** jedes Spielers (Art. 6 Abs. 1 lit. a DSGVO)
- Widerspruchsrecht: Spieler können Löschung verlangen — Datensatz dann aus Payload entfernen
- Spieler vor Veröffentlichung schriftlich informieren (z.B. per Einwilligungserklärung beim Vereinseintritt)

#### 5. Vercel Analytics
- Anbieter: Vercel Inc., USA (gleicher Hinweis wie Hosting)
- Cookielos, keine personenbezogenen Daten, keine Weitergabe an Dritte
- Zweck: Anonyme Reichweitenmessung
- Trotzdem in der Datenschutzerklärung erwähnen

---

### Technische Pflichten (Setup)

- Vercel DPA abschließen: Vercel Account → Settings → Legal
- Neon DPA abschließen: Neon Account → Settings → Legal
- Strato SMTP einrichten (siehe TODO unten) — ersetzt Resend
- Cookie-Banner vor Go-Live einbauen (siehe Backlog)
- Datenschutzerklärung und Impressum unter `/datenschutz` und `/impressum` befüllen

### Hinweise

- Payload-Admin-User (E-Mail, Passwort-Hash) — ausschließlich eigene Vereinsmitglieder, unkritisch
- Vereinsinhalte (Artikel, Mannschaften, Spielpläne) sind keine personenbezogenen Daten
- Kontaktformular-Nachrichten **nicht** in der Datenbank speichern — nur per E-Mail weiterleiten

---

## Offene TODOs

### E-Mail-Konfiguration (`src/app/api/kontakt/route.ts`)
Aktuell läuft der E-Mail-Versand über Resend (kostenlose Version). Das ist **nicht DSGVO-konform** (DPA nur in kostenpflichtigen Plänen). Geplanter Wechsel auf **Nodemailer + Strato SMTP**:

**Was zu tun ist (sobald Strato-Zugang vorhanden):**
1. Postfach `no-reply@sgunsrheinhessen.de` bei Strato anlegen
2. Strato SMTP-Zugangsdaten als Umgebungsvariablen eintragen:
   - `SMTP_HOST` → `smtp.strato.de`
   - `SMTP_USER` → `no-reply@sgunsrheinhessen.de`
   - `SMTP_PASS` → Passwort des Postfachs
3. `resend` durch `nodemailer` ersetzen (`npm remove resend && npm install nodemailer`)
4. `route.ts` umbauen: `from: no-reply@sgunsrheinhessen.de`, `replyTo` bleibt die E-Mail aus dem Formular
5. `RESEND_API_KEY` aus den Umgebungsvariablen entfernen

**Warum Nodemailer + Strato:**
- Strato ist ein deutsches Unternehmen → DSGVO-konform ohne DPA nötig
- Kein Drittanbieter, E-Mail läuft direkt über die eigene Domain
- Kostenlos (im Strato-Hosting enthalten)

**Weitere offene Punkte:**
- **`FALLBACK_EMAIL`** — Empfänger-Adresse für allgemeine Kontaktanfragen anpassen (aktuell `hoefling.niklas@gmx.de`)
- E-Mail-Adresse pro Mannschaft direkt im Payload Admin beim jeweiligen Mannschafts-Eintrag pflegen

---

## Geplante Features / Backlog

### SAMS API – Tabellen & Spielpläne
Die Ligatabellen und Spielpläne sollen langfristig automatisch aus der SAMS-Datenbank des DVV gezogen werden.
- SAMS ist die offizielle Volleyball-Datenbank des DVV
- API-Zugang muss beantragt werden (erst nach Projektgenehmigung)
- Aktuell: Tabellen zeigen Platzhaltertext, Spielpläne als Feld in der `Mannschaften` Collection
- Ziel: Tabellen- und Spielplandaten durch SAMS API-Calls ersetzen

### Google Kalender – Spieltermine
Öffentlichen Google Kalender einbetten um Spieltermine zentral zu pflegen.
- Kalender in Google Calendar anlegen und auf „öffentlich" stellen
- Embed-Code über Google Calendar → Einstellungen → Kalender einbetten
- Auf der Mannschaftsdetailseite oder einer eigenen Terminseite einbinden
- Alternativ: iCal-Feed per API auslesen für natives Rendering

### Impressum & Datenschutz *(Inhalt ausstehend)*
Seiten `/impressum` und `/datenschutz` sind technisch angelegt — Inhalt muss noch eingetragen werden.

**Impressum — Besonderheit Spielgemeinschaft:**
Die SG ist kein eigenständiger Verein und hat keine eigene Rechtspersönlichkeit. Deshalb:
- Einen der drei Stammvereine als **verantwortlichen Rechtsträger** festlegen (derjenige, der die Website offiziell betreibt)
- Dessen Daten ins Impressum: vollständiger Vereinsname, Postadresse, Vorstand (Name), Vereinsregister-Nr. + zuständiges Amtsgericht, E-Mail, Telefon
- „Inhaltlich verantwortlich" (§ 18 Abs. 2 MStV): konkrete Person, meist der 1. Vorsitzende des betreibenden Vereins
- Empfehlung: Impressum-Generator von eRecht24 nutzen, Text direkt im Payload Admin unter `/impressum` eintragen

### Sponsoren
Sponsoren-Sektion auf der Startseite einbauen sobald Logos und URLs vorliegen.
- Logos als PNG in `public/sponsoren/` ablegen
- Neue Section `SpensorenSection.tsx` analog zu `UeberUnsSection.tsx`
- Auf der Startseite zwischen Über uns und Aktuelles einbinden

### Newsletter
E-Mail-Newsletter für Vereinsnachrichten.
- Empfehlung: Brevo (brevo.com) oder Mailchimp — kostenlos für kleine Verteiler
- Anmeldeformular auf der Webseite einbinden
- Newsletter werden direkt im jeweiligen Tool erstellt, kein Code nötig

### Cookie-Banner
Rechtlicher Hinweis zum Datenschutz vor dem Go-Live.
- Aktuell kein Tracking → einfacher Hinweis-Banner ohne Consent-Management ausreichend
- Empfehlung: Leichtgewichtige Eigenlösung mit `localStorage` (kein externer Dienst nötig)
- Alternative: `cookie-consent` oder `react-cookie-consent` npm-Paket
- Banner-Text auf die Datenschutzerklärung abstimmen

### Open Graph Bilder
Automatisch generierte Vorschaubilder für Social Sharing (WhatsApp, Facebook, etc.).
- Next.js `ImageResponse` via `opengraph-image.tsx` direkt in den Route-Ordnern
- Pro Artikel: Artikelbild + Titel als OG-Bild generieren
- Statisches Fallback-OG-Bild für Seiten ohne eigenes Bild (z.B. Vereinslogo auf blauem Hintergrund)
- Siehe Next.js Docs: `opengraph-image` File Convention

### RSS-Feed
Aktuelles-Artikel als RSS-Feed bereitstellen für Abonnenten und Aggregatoren.
- Route Handler in `src/app/feed.xml/route.ts` anlegen
- Artikel aus der `Artikel` Collection per Payload API abrufen und als XML ausgeben
- Feed-URL in `<head>` via `alternates.types` in den Metadaten eintragen

### robots.txt & Sitemap
Next.js kann beides automatisch generieren — bereits angelegt als `src/app/robots.ts` und `src/app/sitemap.ts`, müssen aber noch mit den echten URLs befüllt werden.
- `robots.ts`: `siteUrl` auf die echte Domain setzen (aktuell Platzhalter)
- `sitemap.ts`: dynamische Routen (Artikel, Mannschaften) aus der DB laden und eintragen
- Wichtig vor Go-Live: korrekte Domain eintragen damit Google-Bot die Seite crawlen kann

### Suche *(Nice to have)*
Artikel und Mannschaften auf der Website durchsuchbar machen.
- Einfachste Variante: Client-seitiger Filter auf der Aktuelles-Seite nach Titel
- Bessere Variante: Meilisearch oder Algolia (beide haben kostenloses Kontingent für kleine Projekte)
- Payload hat ein eingebautes Such-Plugin (`@payloadcms/plugin-search`) das einen Suchindex aufbaut

### Ähnliche Artikel *(Nice to have)*
Vorschläge zu thematisch verwandten Artikeln am Ende einer Artikel-Detailseite.
- In `aktuelles/[slug]/page.tsx` nach dem Artikel-Inhalt eine „Weitere Artikel"-Sektion einbauen
- Einfachste Variante: Die 3 neuesten anderen Artikel anzeigen (nach `publishedDate` sortiert, aktuellen Artikel ausschließen)
- Bessere Variante: Artikel mit gemeinsamen Tags filtern (erfordert `tags`-Feld in der `Artikel` Collection)
- Umsetzung als eigene `AehnlicheArtikel`-Komponente analog zu `ArtikelCard`
