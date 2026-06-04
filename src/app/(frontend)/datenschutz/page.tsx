import PageHeader from '@/components/layout/PageHeader'

export const metadata = {
  title: 'Datenschutz | SG U.N.S. Rheinhessen',
  description: 'Datenschutzerklärung der SG U.N.S. Rheinhessen.',
  robots: { index: false },
}

export default function DatenschutzPage() {
  return (
    <div className="min-h-screen bg-white">
      <PageHeader title="Datenschutz" backHref="/" backLabel="Zurück" />
      <div className="max-w-4xl mx-auto px-6 py-16">
        <p className="text-gray-400 text-sm">Wird in Kürze ergänzt.</p>
      </div>
    </div>
  )
}
