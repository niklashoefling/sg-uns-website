import { getPayload } from 'payload'
import config from '@payload-config'
import PageHeader from '@/components/layout/PageHeader'
import SectionHeading from '@/components/ui/SectionHeading'
import RichTextRenderer from '@/components/ui/RichTextRenderer'

export const metadata = {
  title: 'Jugendarbeit',
  description:
    'Erfolgreiche Jugendarbeit der SG U.N.S. Rheinhessen - Tradition, Nachwuchs und Ziele.',
}

export const dynamic = 'force-dynamic'

export default async function JugendarbeitPage() {
  const payload = await getPayload({ config })
  const data = await payload.findGlobal({ slug: 'jugendarbeit' })
  const abschnitte = data?.abschnitte ?? []

  return (
    <div className="min-h-screen bg-white">
      <PageHeader
        eyebrow="SG U.N.S. Rheinhessen"
        title="Jugendarbeit"
        backHref="/"
        backLabel="Zurück"
      />

      <div className="max-w-4xl mx-auto px-6 py-16 space-y-12">
        {abschnitte.map((abschnitt, i) => (
          <div key={abschnitt.id ?? i} className={i > 0 ? 'border-t border-gray-100 pt-12' : ''}>
            <SectionHeading className="mb-4">{abschnitt.titel}</SectionHeading>
            <div className="text-gray-500 leading-relaxed">
              <RichTextRenderer content={abschnitt.inhalt} />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
