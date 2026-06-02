import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { getPayload } from 'payload'
import config from '@payload-config'
import type { Metadata } from 'next'
import type { Hallen } from '@/payload-types'
import { resolveMediaUrl } from '@/lib/media'
import LigaTabelle from '@/components/sections/LigaTabelle'
import type { SpielerData } from '@/components/cards/PlayerCard'
import KaderSection from '@/components/sections/KaderSection'
import SpielplanSection from '@/components/sections/SpielplanSection'
import BackButton from '@/components/ui/BackButton'
import TrainerCard, { type TrainerData } from '@/components/cards/TrainerCard'

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
    depth: 0,
    limit: 1,
  })
  if (docs.length > 0) {
    const team = docs[0]
    return {
      title: `${team.name} | SG U.N.S. Rheinhessen`,
      description: `${team.name} – ${team.liga}, Saison ${team.saison}`,
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
  halle,
}: {
  team: {
    trainer: TrainerData[]
    beschreibung: string
    training: { tag: string; uhrzeit: string }[]
  }
  halle: { name: string; adresse: string } | null
}) {
  return (
    <div className="grid md:grid-cols-2 gap-10">
      <div>
        <h2 className="text-xs font-semibold uppercase tracking-widest text-primary mb-4">
          Über die Mannschaft
        </h2>
        <p className="text-gray-500 leading-relaxed">{team.beschreibung}</p>
      </div>
      <div>
        <h2 className="text-xs font-semibold uppercase tracking-widest text-primary mb-4">
          Details
        </h2>
        <div className="space-y-3">
          {team.trainer.length > 0 && (
            <div className="flex gap-4 text-sm">
              <span className="w-24 shrink-0 font-semibold text-secondary">
                {team.trainer.length === 1 ? 'Trainer' : 'Trainer'}
              </span>
              <div className="space-y-1">
                {team.trainer.map((t) => (
                  <div key={t.name} className="text-gray-500">
                    {t.name}
                  </div>
                ))}
              </div>
            </div>
          )}
          {halle && (
            <div className="flex gap-4 text-sm">
              <span className="w-24 shrink-0 font-semibold text-secondary">Halle</span>
              <Link href="/hallen" className="text-primary hover:underline">
                {halle.name}
              </Link>
            </div>
          )}
          <div className="flex gap-4 text-sm">
            <span className="w-24 shrink-0 font-semibold text-secondary">Training</span>
            <div className="space-y-1">
              {team.training.map((t) => (
                <div key={t.tag} className="text-gray-500">
                  {t.tag} · {t.uhrzeit}
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

  const spieler: SpielerData[] = (team.spieler ?? []).map((s) =>
    toSpielerData(s, (foto) => resolveMediaUrl(foto)),
  )

  const halle: { name: string; adresse: string } | null =
    team.halle && typeof team.halle === 'object' ? (team.halle as Hallen) : null

  const trainer: TrainerData[] = ((team.trainer as unknown[]) ?? [])
    .filter((t) => typeof t === 'object' && t !== null)
    .map((t) => {
      const u = t as {
        email?: string
        name?: string
        foto?: unknown
        lizenz?: string
        kurzvorstellung?: string
        aktivSeit?: number
      }
      return {
        name: u.name ?? u.email ?? '–',
        fotoUrl: resolveMediaUrl(u.foto),
        lizenz: u.lizenz,
        kurzvorstellung: u.kurzvorstellung,
        aktivSeit: u.aktivSeit,
      }
    })

  // Spielplan kommt später per SAMS API
  const spielplan: {
    datum: string
    uhrzeit: string
    heimspiel: boolean
    gegner: string
    ergebnis?: string
  }[] = []

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
        <TeamDetails team={{ ...team, trainer }} halle={halle} />
        {trainer.length > 0 && (
          <div>
            <h2 className="text-xs font-semibold uppercase tracking-widest text-primary mb-6">
              Trainerstab
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {trainer.map((t) => (
                <TrainerCard key={t.name} trainer={t} />
              ))}
            </div>
          </div>
        )}
        {spieler.length > 0 && <KaderSection spieler={spieler} />}
        <LigaTabelle tabelle={null} />
        <SpielplanSection spielplan={spielplan} />
      </div>
    </div>
  )
}
