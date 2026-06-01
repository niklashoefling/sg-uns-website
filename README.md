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

## Geplante Features / Backlog

### SAMS API – Tabellen & Spielpläne
Die Ligatabellen und Spielpläne sollen langfristig automatisch aus der SAMS-Datenbank des DVV gezogen werden.
- SAMS ist die offizielle Volleyball-Datenbank des DVV
- API-Zugang muss beantragt werden (erst nach Projektgenehmigung)
- Aktuell: Tabellendaten statisch in `src/lib/tabelle.ts`, Spielpläne in `src/lib/mannschaften.ts`
- Ziel: `getTabelle(slug)` und Spielplan-Daten durch API-Calls ersetzen

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
- Seiten unter `/impressum` und `/datenschutz` anlegen
- Datenschutzerklärung muss auf den eingesetzten Cookie/Tracking-Stand passen
- Aktuell kein Tracking → einfache Erklärung reicht

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

### Admin CSS Branding
Payload Admin-Panel in Vereinsfarben — aktuell wegen fehlender Typ-Unterstützung deaktiviert.
- `css`-Feld in `admin` Config ist in dieser Payload-Version nicht im Typ definiert
- Custom CSS liegt bereits unter `src/app/(payload)/admin/custom.css`
- Mit `// @ts-ignore` oberhalb der Zeile lässt sich das temporär erzwingen

### Alle Mannschaften ins CMS
Aktuell werden 2. und 3. Herren noch aus statischen Daten geladen.
- Im Admin weitere Mannschaften anlegen (slug: `2-herren`, `3-herren`)
- Danach statische Einträge in `src/lib/mannschaften.ts` entfernen

