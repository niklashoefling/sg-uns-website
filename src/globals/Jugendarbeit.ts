import type { GlobalConfig } from 'payload'

export const Jugendarbeit: GlobalConfig = {
  slug: 'jugendarbeit',
  label: 'Jugendarbeit',
  admin: {
    description: 'Inhalt der Jugendarbeit-Seite',
  },
  access: {
    read: () => true,
    update: ({ req }) => req.user?.rolle === 'admin',
  },
  fields: [
    {
      name: 'abschnitte',
      type: 'array',
      label: 'Abschnitte',
      minRows: 1,
      admin: {
        description: 'Textabschnitte der Jugendarbeit-Seite (Reihenfolge per Drag & Drop änderbar)',
      },
      fields: [
        {
          name: 'titel',
          type: 'text',
          required: true,
        },
        {
          name: 'inhalt',
          type: 'richText',
          required: true,
        },
      ],
    },
  ],
}
