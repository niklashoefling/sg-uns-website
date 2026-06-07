# SG U.N.S. Rheinhessen Volleys – Website

Next.js 16 + Payload CMS 3 Vereinswebseite für die SG U.N.S. Rheinhessen.

---

## Setup

```bash
npm install
npm run dev
```

Admin-Panel: [http://localhost:3000/admin](http://localhost:3000/admin)

---

## Architektur

- Frontend: Next.js 16 (App Router)
- CMS: Payload CMS 3
- Hosting: Vercel
- Database: Neon (Postgres)
- Mail: Nodemailer + Netcup SMTP
- Analytics: Vercel Analytics (cookieless)

---

## DSGVO & Datenschutz

### Hosting – Vercel

- Anbieter: Vercel Inc., USA
- Serverstandort: Frankfurt (EU)
- **TODO: Vercel DPA abschließen** (Vercel Account → Settings → Legal)

### Datenbank – Neon

- Anbieter: Neon Inc., USA
- Region: EU (Frankfurt / AWS eu-central-1)
- **TODO: Neon DPA abschließen** (Neon Legal Settings)

### Kontaktformular

- Name, E-Mail, Nachricht
- Zweck: Bearbeitung von Anfragen
- Rechtsgrundlage: Art. 6 Abs. 1 lit. b oder f DSGVO
- Nur E-Mail-Versand, keine DB-Speicherung
- Nodemailer + Netcup SMTP
- Löschung nach Bearbeitung

### Spielerdaten

- Name, Position, Nummer, Foto
- Art. 6 Abs. 1 lit. f DSGVO
- Fotos nur mit Einwilligung
- Widerruf jederzeit möglich

### Analytics

- Vercel Analytics
- cookieless, keine personenbezogenen Daten

---

## CMS Struktur

Aktiv:

- Artikel
- Mannschaften
- Trainer
- Hallen

Geplant:

- Events
- Announcements
- Galerie

---

## Conversion & Engagement

### Kurzfristig (ohne SAMS)

**Announcement-Banner**

- Einzeiliger Banner oben auf der Homepage
- Aus Payload pflegbar (Titel + optionaler Link)
- Use Cases: Heimspiele, Trainingsänderungen, Kurznews
- Collection: Announcements

**Join-Section (Homepage)**

- Klarer CTA: "Komm zum Probetraining"
- Direktlink zum Kontaktformular
- Kein separater `/probetraining`-Funnel

### Mittelfristig (mit SAMS-API)

**Nächstes Spiel Widget**

- Countdown zum nächsten Heimspiel
- Heim/Auswärts-Unterscheidung
- Platzierung: Homepage Hero oder eigene Section

**Spielplan-Seite `/spiele`**

- Kommende Spiele nach Mannschaft gefiltert
- Vergangene Ergebnisse
- Optional: Kalender-Export (.ics)

---

## Geplante Features

### Announcements

- Titel + kurzer Text (1–5 Sätze)
- Optional: Bild, Mannschaftszuweisung
- Automatisches Datum
- Kein Editorial Workflow – schnelle Updates

### Events

- Titel, Datum/Zeit, Ort
- Mannschaftszuweisung
- Typ (Spiel, Turnier, Training, Sonstiges)
- Beschreibung

### Galerie

- Titel, Bilder, Beschreibung
- Zugehörigkeit: Team oder Verein
- Routen: `/galerie` und `/mannschaften/[team]/galerie`

---

## Content Governance

### Rollen

- Trainer: Team-Content (eigene Mannschaft)
- Redakteur: News-Artikel
- Admin: Struktur und alle Collections

### Prinzip

Content ist Teil des Trainingsbetriebs. Regel: Nach jedem Spiel mindestens ein Post.

---

## Zielsetzung

Spieler für die Mannschaften der SG U.N.S. Rheinhessen gewinnen — Interessenten treten einem der drei Stammvereine bei und spielen unter dem SG-Dach.
