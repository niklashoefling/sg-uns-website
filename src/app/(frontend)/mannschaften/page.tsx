import { mannschaften } from '@/lib/mannschaften'
import PageHeader from '@/components/layout/PageHeader'
import TeamCard from '@/components/cards/TeamCard'

export default function MannschaftenPage() {
  return (
    <div className="min-h-screen bg-white">
      <PageHeader eyebrow="SG U.N.S. Rheinhessen" title="Mannschaften" backHref="/" backLabel="Startseite" />

      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="flex flex-col gap-5">
          {mannschaften.map((team, i) => (
            <TeamCard key={team.slug} team={team} index={i} />
          ))}
        </div>
      </div>
    </div>
  )
}
