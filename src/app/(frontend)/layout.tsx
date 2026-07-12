import React from 'react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const BASE_URL = 'https://sgunsrheinhessen.de'

export const metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: 'SG U.N.S. Rheinhessen',
    template: '%s | SG U.N.S. Rheinhessen',
  },
  description:
    'SG U.N.S. Rheinhessen – Volleyball in Rheinhessen. Spielgemeinschaft aus Undenheim, Nieder-Olm und Schornsheim.',
  icons: {
    icon: '/vereine/SG-Icon.png',
  },
  openGraph: {
    type: 'website' as const,
    locale: 'de_DE',
    url: BASE_URL,
    siteName: 'SG U.N.S. Rheinhessen',
    title: 'SG U.N.S. Rheinhessen',
    description:
      'SG U.N.S. Rheinhessen – Volleyball in Rheinhessen. Spielgemeinschaft aus Undenheim, Nieder-Olm und Schornsheim.',
    images: [
      { url: '/vereine/SG-Icon.png', width: 512, height: 512, alt: 'SG U.N.S. Rheinhessen' },
    ],
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SportsOrganization',
  name: 'SG U.N.S. Rheinhessen Volleys',
  url: BASE_URL,
  logo: `${BASE_URL}/vereine/SG-Icon.png`,
  sport: 'Volleyball',
  areaServed: 'Rheinhessen',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="de">
      <body className="antialiased text-gray-900 bg-white">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Navbar />
        <main>{children}</main>
        <Footer />
        <Analytics />
      </body>
    </html>
  )
}
