import type { MetadataRoute } from 'next'
import { getPayload } from 'payload'
import config from '@payload-config'

const BASE_URL = 'https://sgunsrheinhessen.de'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date()

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE_URL, priority: 1.0, changeFrequency: 'weekly', lastModified: now },
    { url: `${BASE_URL}/aktuelles`, priority: 0.9, changeFrequency: 'daily', lastModified: now },
    {
      url: `${BASE_URL}/mannschaften`,
      priority: 0.9,
      changeFrequency: 'weekly',
      lastModified: now,
    },
    { url: `${BASE_URL}/trainer`, priority: 0.7, changeFrequency: 'monthly', lastModified: now },
    {
      url: `${BASE_URL}/jugendarbeit`,
      priority: 0.7,
      changeFrequency: 'monthly',
      lastModified: now,
    },
    { url: `${BASE_URL}/hallen`, priority: 0.6, changeFrequency: 'monthly', lastModified: now },
    { url: `${BASE_URL}/kontakt`, priority: 0.6, changeFrequency: 'yearly', lastModified: now },
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
      changeFrequency: 'weekly' as const,
      lastModified: new Date(m.updatedAt),
    }))

    artikelRoutes = artikel.map((a) => ({
      url: `${BASE_URL}/aktuelles/${a.slug}`,
      lastModified: new Date(a.updatedAt),
      priority: 0.7,
      changeFrequency: 'never' as const,
    }))
  } catch {
    // CMS not available during build
  }

  return [...staticRoutes, ...mannschaftRoutes, ...artikelRoutes]
}
