import React from 'react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import './globals.css'

export const metadata = {
  description: 'SG U.N.S. Rheinhessen – Volleyball in Rheinhessen',
  title: 'SG U.N.S. Rheinhessen',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="de">
      <body className="antialiased text-gray-900 bg-white">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
