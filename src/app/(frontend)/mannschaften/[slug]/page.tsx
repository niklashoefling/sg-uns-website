import { notFound } from 'next/navigation'
import Image from 'next/image'
import { getPayload } from 'payload'
import config from '@payload-config'
import type { Media } from '@/payload-types'
import { getMannschaft, mannschaften } from '@/lib/mannschaften'
import type { Spieler } from '@/lib/mannschaften'
import { getTabelle } from '@/lib/tabelle'
import LigaTabelle from '@/components/sections/LigaTabelle'
import type { SpielerData } from '@/components/cards/PlayerCard'
import KaderSection from '@/components/sections/KaderSection'
import SpielplanSection from '@/components/sections/SpielplanSection'
import BackButton from '@/components/ui/BackButton'

export async function generateStaticParams() {
  return mannschaften.map((m) => ({ slug: m.slug }))
}

function toSpielerData(s: {
  name: string; nummer?: number | null; position: string
  foto?: unknown; fotoUrl?: string | null
  nationalitaet?: string | null; geburtsjahr?: number | null; groesse?: number | null
}, resolveFoto?: (foto: unknown) => string | null): SpielerData {
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

function TeamDetails({ team }: {
  team: {
    trainer: string; cotrainer?: string | null
    halle: string; halleAdresse: string; beschreibung: string
    training: { tag: string; uhrzeit: string }[]
  }
}) {
  return (
    <div className="grid md:grid-cols-2 gap-10">
      <div>
        <h2 className="text-xs font-semibold uppercase tracking-widest text-primary mb-4">Über die Mannschaft</h2>
        <p className="text-gray-500 leading-relaxed">{team.beschreibung}</p>
      </div>
      <div>
        <h2 className="text-xs font-semibold uppercase tracking-widest text-primary mb-4">Details</h2>
        <div className="space-y-3">
          {[
            { label: 'Trainer', value: team.trainer },
            ...(team.cotrainer ? [{ label: 'Co-Trainer', value: team.cotrainer }] : []),
            { label: 'Halle', value: team.halle },
            { label: 'Adresse', value: team.halleAdresse },
          ].map(({ label, value }) => (
            <div key={label} className="flex gap-4 text-sm">
              <span className="w-24 shrink-0 font-semibold text-secondary">{label}</span>
              <span className="text-gray-500">{value}</span>
            </div>
          ))}
          <div className="flex gap-4 text-sm">
            <span className="w-24 shrink-0 font-semibold text-secondary">Training</span>
            <div className="space-y-1">
              {team.training.map((t) => (
                <div key={t.tag} className="text-gray-500">{t.tag} · {t.uhrzeit}</div>
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

  if (docs.length > 0) {
    const team = docs[0]
    const tabelle = getTabelle(slug)
    const teamfotoUrl =
      team.teamfoto && typeof team.teamfoto === 'object'
        ? (team.teamfoto as Media).url ?? null
        : null

    const staticTeam = getMannschaft(slug)
    const spielplan = staticTeam?.spielplan ?? []

    const spieler: SpielerData[] = (team.spieler ?? []).map((s) =>
      toSpielerData(s, (foto) =>
        foto && typeof foto === 'object' ? (foto as Media).url ?? null : null
      )
    )

    return (
      <div className="min-h-screen bg-white">
        <div className="bg-secondary pt-32 pb-32 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="mb-8">
              <BackButton href="/mannschaften" label="Alle Mannschaften" variant="dark" />
            </div>
            <span className="text-xs font-semibold uppercase tracking-widest text-primary mb-3 block">
              {team.liga} · Saison {team.saison}
            </span>
            <h1 className="text-5xl font-bold text-white">{team.name}</h1>
          </div>
        </div>

        {teamfotoUrl && (
          <div className="max-w-6xl mx-auto px-6 -mt-16">
            <div className="relative w-full h-56 md:h-72 rounded-xl overflow-hidden shadow-xl">
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
          <TeamDetails team={team} />
          {spieler.length > 0 && <KaderSection spieler={spieler} />}
          {tabelle && <LigaTabelle tabelle={tabelle} />}
          <SpielplanSection spielplan={spielplan} />
        </div>
      </div>
    )
  }

  const team = getMannschaft(slug)
  if (!team) notFound()

  const tabelle = getTabelle(slug)
  const spieler: SpielerData[] = team.spieler.map((s: Spieler) =>
    toSpielerData({ ...s, fotoUrl: s.foto ?? null })
  )

  return (
    <div className="min-h-screen bg-white">
      <div className="bg-secondary pt-32 pb-32 px-6">
        <div className="max-w-6xl mx-auto">
          <BackButton href="/mannschaften" label="Alle Mannschaften" variant="dark" />
          <span className="text-xs font-semibold uppercase tracking-widest text-primary mb-3 block">
            {team.liga} · Saison {team.saison}
          </span>
          <h1 className="text-5xl font-bold text-white">{team.name}</h1>
        </div>
      </div>

      {team.teamfoto && (
        <div className="max-w-6xl mx-auto px-6 -mt-16">
          <div className="relative w-full h-56 md:h-72 rounded-xl overflow-hidden shadow-xl">
            <Image
              src={team.teamfoto}
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
        <TeamDetails team={team} />
        <KaderSection spieler={spieler} />
        {tabelle && <LigaTabelle tabelle={tabelle} />}
        <SpielplanSection spielplan={team.spielplan} />
      </div>
    </div>
  )
}
