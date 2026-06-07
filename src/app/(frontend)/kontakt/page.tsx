import { getPayload } from 'payload'
import config from '@payload-config'
import PageHeader from '@/components/layout/PageHeader'
import ContactForm from '@/components/forms/ContactForm'

export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'Kontakt',
  description:
    'Kontaktiere die SG U.N.S. Rheinhessen – für Anfragen zu Mannschaften, Training oder der Spielgemeinschaft.',
}

export default async function KontaktPage() {
  const payload = await getPayload({ config })
  const { docs } = await payload.find({ collection: 'mannschaften', sort: 'name', depth: 0 })
  const anliegen = [
    { label: 'Allgemein', value: 'allgemein' },
    ...docs.map((m) => ({ label: m.name, value: m.slug })),
  ]

  return (
    <div className="min-h-screen bg-white">
      <PageHeader eyebrow="SG U.N.S. Rheinhessen" title="Kontakt" backHref="/" backLabel="Zurück" />

      <div className="max-w-2xl mx-auto px-6 py-16">
        <ContactForm anliegen={anliegen} />
      </div>
    </div>
  )
}
