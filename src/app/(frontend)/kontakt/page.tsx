import PageHeader from '@/components/layout/PageHeader'
import ContactForm from '@/components/forms/ContactForm'

export const metadata = {
  title: 'Kontakt | SG U.N.S. Rheinhessen',
  description: 'Schreib uns – wir freuen uns über deine Nachricht.',
}

export default function KontaktPage() {
  return (
    <div className="min-h-screen bg-white">
      <PageHeader eyebrow="SG U.N.S. Rheinhessen" title="Kontakt" backHref="/" backLabel="Startseite" />

      <div className="max-w-2xl mx-auto px-6 py-16">
        <ContactForm />
      </div>
    </div>
  )
}
