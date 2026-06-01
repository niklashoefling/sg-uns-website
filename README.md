# SG U.N.S. Rheinhessen Volleys – Website

Next.js 16 + Payload CMS 3 Vereinswebseite für die SG U.N.S. Rheinhessen.

## Setup

```bash
npm install
npm run dev
```

`.env` benötigt:
```
DATABASE_URL=file:./payload.db
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

### Spielplan im CMS
Aktuell sind Spielpläne statisch in `src/lib/mannschaften.ts` hardcodiert.
- Neue Payload Collection `spiele` mit Feldern: datum, uhrzeit, heimspiel, gegner, ergebnis, mannschaft (Relation)
- Detailseite liest Spielplan dann aus Payload statt aus statischer Datei
- Erst relevant wenn SAMS-API nicht kommt
