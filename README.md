# SG U.N.S. Rheinhessen Volleys – Website

Next.js 16 + Payload CMS 3 Vereinswebseite für die SG U.N.S. Rheinhessen.

## Setup

```bash
npm install
npm run dev
```

Admin-Panel: `http://localhost:3000/admin`

## DSGVO & Datenschutz

### Neon (Datenbank)
Neon ist bei Auswahl der Region Frankfurt (`eu-central-1`, AWS) DSGVO-konform einsetzbar — Daten verlassen die EU nicht.

**Pflichten:**
- DPA (Auftragsverarbeitungsvertrag) in den Neon Account-Einstellungen unter „Legal" online unterzeichnen
- Neon als Auftragsverarbeiter in der Datenschutzerklärung nennen (Name, Zweck, Sitz)

**Vercel Analytics:**
Bereits eingebunden (`@vercel/analytics` in `layout.tsx`). Wird automatisch aktiv sobald die Website auf Vercel deployed ist — kein weiteres Setup nötig.
- Cookielos, keine personenbezogenen Daten → trotzdem in der Datenschutzerklärung erwähnen
- Dashboard: Vercel Projektseite → „Analytics"


- Payload-Admin-User (E-Mail, Passwort-Hash) — ausschließlich eigene Vereinsmitglieder, unkritisch
- Vereinsinhalte (Artikel, Mannschaften, Spielpläne) sind keine personenbezogenen Daten

**Achtung bei Kontaktformular:** Sobald Nachrichten von Außenstehenden gespeichert werden, müssen diese entweder nur kurz vorgehalten oder gar nicht persistiert werden (direkt per E-Mail weiterleiten, nicht in DB speichern).

### Spielerdaten (Kader)
Name, Position, Trikotnummer und Foto sind personenbezogene Daten — Spieler sind natürliche Personen.

**Rechtsgrundlage:**
- Name, Position, Trikotnummer: berechtigtes Interesse des Vereins (Art. 6 Abs. 1 lit. f DSGVO) ist für vereinstypische Veröffentlichungen ausreichend
- **Fotos: explizite schriftliche Einwilligung** jedes Spielers erforderlich (Art. 6 Abs. 1 lit. a DSGVO)

**Pflichten:**
- Spieler schriftlich informieren, was gespeichert und veröffentlicht wird (z.B. per Einwilligungserklärung beim Vereinseintritt)
- Widerspruchsrecht umsetzen — wenn ein Spieler nicht auf der Website erscheinen will, Datensatz löschen
- Datenschutzerklärung um Abschnitt „Vereinsmitglieder / Kader" ergänzen

---

## Offene TODOs

### E-Mail-Konfiguration (`src/app/api/kontakt/route.ts`)
- **`FALLBACK_EMAIL`** — Empfänger-Adresse für allgemeine Kontaktanfragen anpassen (aktuell `hoefling.niklas@gmx.de`)
- **`from`** — Absender-Adresse durch eine verifizierte Resend-Domain ersetzen (aktuell `onboarding@resend.dev`)
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
