import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  labels: {
    singular: 'Mediendatei',
    plural: 'Mediendateien',
  },
  access: {
    read: () => true,
    delete: ({ req }) => req.user?.rolle === 'admin',
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
