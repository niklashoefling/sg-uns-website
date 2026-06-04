import type { MetadataRoute } from 'next'
import { getPayload } from 'payload'
import config from '@payload-config'

const BASE_URL = 'https://sg-uns-website.vercel.app'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE_URL, priority: 1.0 },
    { url: `${BASE_URL}/mannschaften`, priority: 0.9 },
    { url: `${BASE_URL}/trainer`, priority: 0.7 },
    { url: `${BASE_URL}/hallen`, priority: 0.6 },
    { url: `${BASE_URL}/aktuelles`, priority: 0.9 },
    { url: `${BASE_URL}/jugendarbeit`, priority: 0.7 },
    { url: `${BASE_URL}/kontakt`, priority: 0.6 },
    { url: `${BASE_URL}/impressum`, priority: 0.3 },
    { url: `${BASE_URL}/datenschutz`, priority: 0.3 },
  ]

  let mannschaftRoutes: MetadataRoute.Sitemap = []
  let artikelRoutes: MetadataRoute.Sitemap = []

  try {
    const payload = await getPayload({ config })

    const [{ docs: teams }, { docs: artikel }] = await Promise.all([
      payload.find({ collection: 'mannschaften', limit: 100, depth: 0 }),
      payload.find({ collection: 'artikel', limit: 100, depth: 0 }),
    ])

    mannschaftRoutes = teams.map((m) => ({
      url: `${BASE_URL}/mannschaften/${m.slug}`,
      priority: 0.8,
    }))

    artikelRoutes = artikel.map((a) => ({
      url: `${BASE_URL}/aktuelles/${a.slug}`,
      lastModified: new Date(a.updatedAt),
      priority: 0.7,
    }))
  } catch {
    // CMS not available during build
  }

  return [...staticRoutes, ...mannschaftRoutes, ...artikelRoutes]
}
