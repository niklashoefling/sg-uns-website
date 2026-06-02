# SG U.N.S. Rheinhessen Volleys – Website

Next.js 16 + Payload CMS 3 Vereinswebseite für die SG U.N.S. Rheinhessen.

## Setup

```bash
npm install
npm run dev
```

`.env` benötigt:
```
DATABASE_URL=postgresql://...   (Neon Connection String)
PAYLOAD_SECRET=<beliebiger-string>
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

### Wegbeschreibungen zu den Hallen
Karten-Embeds für die Spielhallen auf den Mannschaftsdetailseiten.
- Google Maps Embed API (kein API-Key nötig für einfache Embeds)
- Adresse ist bereits in der Mannschaften-Collection als `halleAdresse` gespeichert
- Embed-URL Schema: `https://maps.google.com/maps?q=<adresse>&output=embed`

### Kontaktformular – E-Mail-Versand
Aktuell zeigt das Formular nur eine Erfolgsmeldung ohne echten Versand.
- Empfehlung: Resend (resend.com) – einfaches Setup, großzügiges Gratis-Kontingent
- Alternative: Nodemailer mit SMTP
- API-Route in `src/app/api/kontakt/route.ts` anlegen
- Formular auf `fetch('/api/kontakt', ...)` umstellen

### Impressum & Datenschutz
Gesetzlich Pflicht vor dem Go-Live.
- Seiten `/impressum` und `/datenschutz` sind angelegt (Platzhalter)
- Inhalt muss noch eingetragen werden
- Datenschutzerklärung muss auf den eingesetzten Cookie/Tracking-Stand passen
- Aktuell kein Tracking → einfache Erklärung reicht

**Impressum — Besonderheit Spielgemeinschaft:**
Die SG ist kein eigenständiger Verein und hat keine eigene Rechtspersönlichkeit. Deshalb:
- Einen der drei Stammvereine als **verantwortlichen Rechtsträger** festlegen (derjenige, der die Website offiziell betreibt)
- Dessen Daten ins Impressum: vollständiger Vereinsname, Postadresse, Vorstand (Name), Vereinsregister-Nr. + zuständiges Amtsgericht, E-Mail, Telefon
- „Inhaltlich verantwortlich" (§ 18 Abs. 2 MStV): konkrete Person, meist der 1. Vorsitzende des betreibenden Vereins
- Die anderen beiden Stammvereine können zusätzlich genannt werden, ist aber nicht Pflicht
- Empfehlung: Impressum-Generator von eRecht24 nutzen (kostenlose Basisversion reicht), betreibenden Stammverein eintragen, Text direkt im Payload Admin unter `/impressum` eintragen

### Rollen & Rechteverwaltung
Trainer sollen nur ihre eigene Mannschaft bearbeiten dürfen.
- `Users` Collection um `rolle`-Feld erweitern (`admin` | `trainer`)
- Trainer-User einer Mannschaft zuweisen (Relationship-Feld)
- Access Control in `Mannschaften` Collection: Trainer darf nur eigene Mannschaft bearbeiten
- Siehe Payload Docs: Access Control mit Query Constraints

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

### Trainingszeiten
Trainingszeiten der Mannschaften anzeigen — wann und wo welches Team trainiert.
- Trainingszeiten als Feld in der `Mannschaften` Collection ergänzen (z.B. strukturiertes Feld: Wochentag, Uhrzeit, Halle)
- Auf der Mannschaftsdetailseite unterhalb der Spielplan-/Tabelleninfo anzeigen
- Optional: Zentrale Trainingsübersicht als eigene Seite oder Sektion

### Bildergalerie
Fotos von Spielen, Events und Mannschaften auf der Website präsentieren.
- Eigene `Galerien` Collection in Payload anlegen mit: Titel, Datum, Mannschaft (Relationship), Bilder (Array von `Media`-Relationships)
- Galerie-Übersichtsseite unter `/galerie` und Detailseite unter `/galerie/[slug]`
- Optional: Galerie-Vorschau auf der Startseite oder Mannschaftsdetailseite einbinden

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

### Trainerstab *(Nice to have)*
Trainerprofile auf den Mannschaftsdetailseiten oder einer eigenen Seite.
- `Trainer` Collection anlegen mit: Name, Foto, Lizenz (A/B/C-Lizenz), zugeordnete Mannschaft
- Auf der Mannschaftsdetailseite einbinden
- Optional: Zentrale Trainerübersicht unter „Über uns"

### Alle Mannschaften ins CMS
2. und 3. Herren müssen noch im Admin angelegt werden.
- Im Admin weitere Mannschaften anlegen (slug: `2-herren`, `3-herren`)
- Alle Felder (Trainer, Halle, Training, Spieler, Spielplan) befüllen

