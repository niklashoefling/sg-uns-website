import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getPayload } from 'payload'
import config from '@payload-config'
import type { Metadata } from 'next'
import {
  resolveMediaUrl,
  mapUserToTrainerData,
  resolveHalleName,
  extractJoinDocs,
} from '@/lib/utils'
import LigaTabelle from '@/components/sections/LigaTabelle'
import { fetchSpielplan, fetchTabelle, fetchTeamName } from '@/lib/sams'
import type { Spiel, Tabelle } from '@/lib/mannschaften'
import type { SpielerData } from '@/components/cards/PlayerCard'
import KaderSection from '@/components/sections/KaderSection'
import SpielplanSection from '@/components/sections/SpielplanSection'
import BackButton from '@/components/ui/BackButton'
import TrainerCard, { type TrainerData } from '@/components/cards/TrainerCard'
import SectionHeading from '@/components/ui/SectionHeading'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const payload = await getPayload({ config })
  const { docs } = await payload.find({
    collection: 'mannschaften',
    where: { slug: { equals: slug } },
    depth: 1,
    limit: 1,
  })
  if (docs.length > 0) {
    const team = docs[0]
    const description = `${team.name} der SG U.N.S. Rheinhessen${team.liga ? ` – ${team.liga}` : ''}. Kader, Trainingszeiten und Spielplan.`
    const imageUrl = resolveMediaUrl(
      typeof team.teamfoto === 'object' && team.teamfoto !== null
        ? (team.teamfoto as { url?: string }).url
        : undefined,
    )
    return {
      title: team.name,
      description,
      openGraph: {
        title: `${team.name} | SG U.N.S. Rheinhessen`,
        description,
        ...(imageUrl ? { images: [{ url: imageUrl, alt: team.name }] } : {}),
      },
    }
  }
  return {}
}

function toSpielerData(
  s: {
    name: string
    nummer?: number | null
    position: string
    foto?: unknown
    fotoUrl?: string | null
    nationalitaet?: string | null
    geburtsjahr?: number | null
    groesse?: number | null
  },
  resolveFoto?: (foto: unknown) => string | null,
): SpielerData {
  return {
    name: s.name,
    nummer: s.nummer,
    position: s.position,
    fotoUrl: resolveFoto ? resolveFoto(s.foto) : (s.fotoUrl ?? null),
    nationalitaet: s.nationalitaet,
    geburtsjahr: s.geburtsjahr,
    groesse: s.groesse,
  }
}

function TeamDetails({
  team,
}: {
  team: {
    beschreibung: string
    training: { tag: string; uhrzeit: string; halle?: string | null }[]
  }
}) {
  return (
    <div className="grid md:grid-cols-2 gap-10">
      <div>
        <SectionHeading className="mb-4">Über die Mannschaft</SectionHeading>
        <p className="text-gray-500 leading-relaxed">{team.beschreibung}</p>
      </div>
      <div>
        <SectionHeading className="mb-4">Trainingsdaten</SectionHeading>
        <div className="space-y-3">
          <div className="flex gap-4 text-sm">
            <span className="w-24 shrink-0 font-semibold text-secondary">Training</span>
            <div className="space-y-1">
              {team.training.map((t) => (
                <div key={t.tag} className="text-gray-500">
                  {t.tag} · {t.uhrzeit}
                  {t.halle && (
                    <div>
                      <Link
                        href="/hallen"
                        className="text-gray-400 underline hover:text-primary transition-colors"
                      >
                        {t.halle}
                      </Link>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default async function MannschaftPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params

  const payload = await getPayload({ config })
  const { docs } = await payload.find({
    collection: 'mannschaften',
    where: { slug: { equals: slug } },
    depth: 2,
    limit: 1,
  })

  if (docs.length === 0) notFound()

  const team = docs[0]
  const teamfotoUrl = resolveMediaUrl(team.teamfoto)

  type TeamWithSams = typeof team & {
    samsLeagueUuid?: string
    samsTeamUuid?: string
    tabelleAufstieg?: number
    tabelleAbstieg?: number
  }
  const t = team as unknown as TeamWithSams
  const samsLeagueUuid = t.samsLeagueUuid ?? null
  const samsTeamUuid = t.samsTeamUuid ?? null
  const tabelleAufstieg = t.tabelleAufstieg
  const tabelleAbstieg = t.tabelleAbstieg

  const spieler: SpielerData[] = (team.spieler ?? []).map((s) =>
    toSpielerData(s, (foto) => resolveMediaUrl(foto)),
  )

  const trainer: TrainerData[] = extractJoinDocs<Parameters<typeof mapUserToTrainerData>[0]>(
    team.trainer,
  ).map(mapUserToTrainerData)

  const training = (team.training ?? []).map((tr) => ({
    tag: tr.tag,
    uhrzeit: tr.uhrzeit,
    halle: resolveHalleName(tr.halle),
  }))
  let ergebnisse: Spiel[] = []
  let naechsteSpiele: Spiel[] = []
  let tabelle: Tabelle | null = null
  let samsTeamName = team.name
  if (team.liga && samsLeagueUuid && samsTeamUuid) {
    ;[{ ergebnisse, naechsteSpiele }, tabelle, samsTeamName] = await Promise.all([
      fetchSpielplan(samsTeamUuid, samsLeagueUuid, { limit: 3 }).catch(() => ({
        ergebnisse: [],
        naechsteSpiele: [],
      })),
      fetchTabelle(samsLeagueUuid, { aufstieg: tabelleAufstieg, abstieg: tabelleAbstieg }).catch(
        () => null,
      ),
      fetchTeamName(samsTeamUuid).catch(() => team.name),
    ])
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="bg-secondary pt-32 pb-32 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <BackButton href="/mannschaften" label="Zurück" variant="dark" />
          </div>
          {team.liga && (
            <span className="text-xs font-semibold uppercase tracking-widest text-primary mb-3 block">
              {team.liga}
            </span>
          )}
          <h1 className="text-5xl font-bold text-white">{team.name}</h1>
        </div>
      </div>

      {teamfotoUrl && (
        <div className="max-w-6xl mx-auto px-6 -mt-16">
          <div className="relative w-full aspect-video rounded-xl overflow-hidden shadow-xl">
            <Image
              src={teamfotoUrl}
              alt={`${team.name} Teamfoto`}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 1152px"
              className="object-cover object-center"
            />
          </div>
        </div>
      )}

      <div className="max-w-6xl mx-auto px-6 py-16 space-y-16">
        <TeamDetails team={{ ...team, training }} />
        {trainer.length > 0 && (
          <div>
            <SectionHeading>Trainerstab</SectionHeading>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {trainer.map((t) => (
                <TrainerCard key={t.name} trainer={t} horizontal />
              ))}
            </div>
          </div>
        )}
        {spieler.length > 0 && <KaderSection spieler={spieler} />}
        {team.liga && samsLeagueUuid && samsTeamUuid && (
          <>
            <SpielplanSection
              ergebnisse={ergebnisse}
              naechsteSpiele={naechsteSpiele}
              teamName={samsTeamName}
            />
            <LigaTabelle tabelle={tabelle} />
          </>
        )}
      </div>
    </div>
  )
}
