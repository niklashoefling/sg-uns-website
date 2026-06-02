import type { CollectionConfig } from 'payload'

export const Hallen: CollectionConfig = {
  slug: 'hallen',
  labels: {
    singular: 'Halle',
    plural: 'Hallen',
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'adresse'],
    description: 'Spielhallen der SG U.N.S. Rheinhessen',
  },
  access: {
    read: () => true,
    create: ({ req }) => req.user?.rolle === 'admin',
    update: ({ req }) => req.user?.rolle === 'admin',
    delete: ({ req }) => req.user?.rolle === 'admin',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      admin: {
        description: 'z.B. "Sporthalle Nieder-Olm"',
      },
    },
    {
      name: 'adresse',
      type: 'text',
      required: true,
      admin: {
        description: 'z.B. "Jahnstraße 1, 55268 Nieder-Olm"',
      },
    },
    {
      name: 'beschreibung',
      type: 'textarea',
      admin: {
        description: 'Optionale Hinweise zur Halle (Parkplätze, Eingang, etc.)',
      },
    },
    {
      name: 'foto',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: 'Foto der Halle (optional)',
      },
    },
  ],
}
