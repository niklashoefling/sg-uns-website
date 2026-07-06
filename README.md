# SG U.N.S. Rheinhessen Volleys – Website

Club website for [SG U.N.S. Rheinhessen](https://sgunsrheinhessen.de), a volleyball association in Rheinhessen, Germany.

Built with **Next.js 16** (App Router) + **Payload CMS 3**.

## Stack

| Layer     | Technology                    |
| --------- | ----------------------------- |
| Frontend  | Next.js 16 (App Router)       |
| CMS       | Payload CMS 3                 |
| Database  | Neon (Postgres, EU Frankfurt) |
| Hosting   | Vercel                        |
| Mail      | Nodemailer + Netcup SMTP      |
| Analytics | Vercel Analytics (cookieless) |
| Game data | SAMS REST API v2 (DVV/VVRP)   |

## Pages

| Route                  | Description                                       |
| ---------------------- | ------------------------------------------------- |
| `/`                    | Homepage                                          |
| `/mannschaften`        | Team overview with training times                 |
| `/mannschaften/[slug]` | Team detail: roster, coaches, schedule, standings |
| `/spiele`              | All teams' matches and results                    |
| `/spiel/[uuid]`        | Match detail: sets, location, Maps link           |
| `/aktuelles`           | News and match reports                            |
| `/aktuelles/[slug]`    | Article detail                                    |
| `/trainer`             | Coaching staff                                    |
| `/hallen`              | Gym/hall directory                                |
| `/kontakt`             | Contact form                                      |
| `/jugendarbeit`        | Youth development                                 |
| `/impressum`           | Legal notice                                      |
| `/datenschutz`         | Privacy policy                                    |

## CMS Collections

- **Mannschaften** – Teams with roster, coaches, training times, SAMS UUIDs
- **Artikel** – News articles and match reports
- **Users** – Coaches and admins (Payload Auth)
- **Hallen** – Gym locations
- **Media** – Uploaded images

## SAMS Integration

Live game data is fetched from the [SAMS REST API v2](https://www.vvrp.de/api/v2) (DVV's official game management system).

**Setup per team in CMS:**

- `samsLeagueUuid` — SAMS league UUID (from vvrp.de)
- `samsTeamUuid` — SAMS team UUID
- `tabelleAufstieg` — Number of promotion spots (shown in standings)
- `tabelleAbstieg` — Number of relegation spots (shown in standings)

**Caching:** All SAMS fetches use `next: { revalidate: 3600 }` — max one API call per hour per URL.

**Required env var:** `SAMS_API_KEY`

## Planned Features

### Announcements

- Title + short text (1–5 sentences)
- Optional: image, team assignment
- Auto-dated, no editorial workflow — fast updates

### Events

- Title, date/time, location
- Team assignment
- Type (match, tournament, training, other)
- Description

### Gallery

- Title, images, description
- Scope: team or club-wide
- Routes: `/galerie` and `/mannschaften/[team]/galerie`

## Conversion & Engagement Ideas

**Announcement Banner**

- Single-line banner at the top of the homepage
- Managed in Payload (title + optional link)
- Use cases: home matches, training changes, quick news

**Join Section (Homepage)**

- Clear CTA: "Come to a trial training"
- Direct link to contact form

**Next Match Widget**

- Countdown to next home match
- Placement: homepage hero or dedicated section

**Calendar export**

- `.ics` export from `/spiele`
- Standard format, importable into Google/Apple Calendar

## Content Governance

**Roles**

- Coach: team content (own team only)
- Editor: news articles
- Admin: full access to all collections

**Principle**
Content is part of club operations. Rule: at least one post after every match.

## Goal

Recruit players for the teams of SG U.N.S. Rheinhessen — interested players join one of the three member clubs and play under the SG umbrella.

## GDPR Notes

- **Hosting (Vercel):** Server location Frankfurt (EU). TODO: Sign Vercel DPA via Account → Settings → Legal.
- **Database (Neon):** Region EU (Frankfurt / AWS eu-central-1). TODO: Sign Neon DPA via Legal Settings.
- **Contact form:** Name, email, message — processed via email only, no DB storage. Deleted after handling. Legal basis: Art. 6(1)(b)/(f) GDPR.
- **Player data:** Name, position, number, photo — photos only with consent, revocable at any time. Legal basis: Art. 6(1)(f) GDPR.
- **Analytics:** Vercel Analytics, cookieless, no personal data collected.
