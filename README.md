# SG U.N.S. Rheinhessen Volleys – Website

Next.js 16 + Payload CMS 3 Vereinswebseite für die SG U.N.S. Rheinhessen.

---

## Setup

``` bash
npm install
npm run dev
```

Admin-Panel: [http://localhost:3000/admin](http://localhost:3000/admin)

---

## Architektur

* Frontend: Next.js 16 (App Router)
* CMS: Payload CMS 3
* Hosting: Vercel
* Database: Neon (Postgres)
* Mail: Strato SMTP (Nodemailer)
* Analytics: Vercel Analytics (cookieless)

---

## DSGVO & Datenschutz

### 1. Hosting – Vercel

* Anbieter: Vercel Inc., USA
* Serverstandort: Frankfurt (EU eingestellt)
* Zweck: Bereitstellung der Website
* DPA erforderlich (Vercel Account → Settings → Legal)
* Hinweis auf Drittlandtransfer (USA) + SCCs

### 2. Datenbank – Neon

* Anbieter: Neon Inc., USA
* Region: EU (Frankfurt / AWS eu-central-1)
* Zweck: Speicherung von CMS-Inhalten und Admin-Daten
* DPA erforderlich (Neon Legal Settings)
* Hinweis auf Drittlandtransfer + SCCs

### 3. Kontaktformular

* Name, E-Mail, Nachricht
* Zweck: Bearbeitung von Anfragen
* Rechtsgrundlage: Art. 6 Abs. 1 lit. b oder f DSGVO
* Nur E-Mail Versand, keine DB Speicherung
* Strato SMTP
* Löschung nach Bearbeitung

### 4. Spielerdaten

* Name, Position, Nummer, Foto
* Art. 6 Abs. 1 lit. f DSGVO
* Fotos nur mit Einwilligung
* Widerruf jederzeit möglich

### 5. Analytics

* Vercel Analytics
* cookieless
* keine personenbezogenen Daten

---

## Technische Pflichten

* Vercel DPA
* Neon DPA
* Strato SMTP Setup
* Cookie Banner
* Impressum (in Arbeit) + Datenschutz final
* Sitemap + robots prüfen

---

## E-Mail System

Aktuell: Resend

Geplante Migration: Nodemailer + Strato SMTP

* SMTP Host: smtp.strato.de
* User: [no-reply@sgunsrheinhessen.de](mailto:no-reply@sgunsrheinhessen.de)
* Passwort: Strato Mail Passwort

**TODO:**

* Resend entfernen
* Nodemailer einbauen
* API Route umbauen

---

## CMS Struktur

* Artikel
* Mannschaften
* Trainer
* Hallen
* Events
* Announcements
* Galerie

---

## Content Erweiterungen

### Announcement

* Titel
* kurzer Text
* optional Bild
* optional Team
* automatisch Datum

Ziel: schnelle Updates ohne Aufwand

---

### Event

* Titel
* Datum / Zeit
* Ort
* Mannschaft
* Typ
* Beschreibung

---

### Galerie

* Titel
* Bilder
* Zugehörigkeit (Team/Verein)
* Beschreibung

---

## Conversion Layer

### Probetraining Funnel

Route: /probetraining

Ziel: Anfrage in unter 30 Sekunden

Form:

* Name
* Alter
* Level
* Wunschteam
* Kontakt

Prinzip:

* minimal
* mobile first
* direkte CTA Führung

---

### CTA System

* Probetraining vereinbaren
* Team kennenlernen
* Jetzt mittrainieren

Kein „Kontakt“ als Hauptziel

---

### Mannschaftsseiten

* Beschreibung
* Trainingszeiten
* Liga
* Trainer
* Foto
* CTA

---

## Engagement Layer

### Team Galerien

/mannschaften/[team]/galerie

* Training
* Spiele
* Turniere
* Teamleben

---

### Vereins Galerie

/galerie

* Events
* Jugend
* Turniere
* Vereinsleben

---

### Social Proof

* Spielerzitate
* Trainer Statements
* Testimonials

---

## Spielbetrieb

### Spiele / Termine

/spiele

* kommende Spiele
* Heim / Auswärts
* optional Kalender

Ziel: aktiver Spielbetrieb sichtbar

---

## Content System

### Announcement System

* kurze Posts
* 1–5 Sätze
* kein Editorial Workflow

Use Cases:

* Spielankündigungen
* Trainingsänderungen
* Kurznews

### News Artikel

* längere Inhalte
* SEO relevant

---

## Growth Layer

### Newsletter

* basiert auf Content
* Announcements + Spiele + Artikel
* Brevo oder Mailchimp
* kein Extra Aufwand

---

### Social Sharing

* OG Images
* Share Buttons
* Teams + Spiele Fokus

---

## UX Struktur

### Homepage

* Hero
* Teams
* Jugend
* Join Section
* Aktuelles
* Sponsoren

### Navigation

* Teams
* Jugend
* Spiele
* Aktuelles
* Probetraining

---

## Content Governance

### Rollen

* Trainer: Team Content
* Redakteure: News
* Admin: Struktur

### Prinzip

Content ist Teil des Trainingsbetriebs

Regel:
Nach jedem Spiel mindestens ein Post

---

## Zielsetzung

Spieler für die Mannschaften der SG U.N.S. Rheinhessen gewinnen — Interessenten treten einem der drei Stammvereine bei und spielen unter dem SG-Dach.
