import type { CollectionConfig } from 'payload'
import { list } from '@vercel/blob'

export const Media: CollectionConfig = {
  slug: 'media',
  labels: {
    singular: 'Mediendatei',
    plural: 'Mediendateien',
  },
  access: {
    read: () => true,
  },
  hooks: {
    afterChange: [
      async ({ doc, req, operation }) => {
        if ((operation !== 'create' && operation !== 'update') || !doc.filename) return doc
        if (!doc.url?.includes('localhost')) return doc

        const token = process.env.BLOB_READ_WRITE_TOKEN
        if (!token) return doc

        try {
          const { blobs } = await list({ token })
          const match = blobs.find((b) => b.pathname === doc.filename)
          if (!match) return doc

          await req.payload.update({
            collection: 'media',
            id: doc.id,
            data: { url: match.url },
            context: { skipBlobUrlFix: true },
            req,
          })
          return { ...doc, url: match.url }
        } catch {
          return doc
        }
      },
    ],
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
    },
  ],
  upload: true,
}
