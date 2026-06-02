import type { CollectionConfig } from 'payload'
import { isAdmin } from './Users'

export const Artikel: CollectionConfig = {
  slug: 'artikel',
  labels: {
    singular: 'Artikel',
    plural: 'Artikel',
  },
  admin: {
    useAsTitle: 'titel',
    defaultColumns: ['titel', 'kategorie', 'datum', 'autor'],
    description: 'News und Beiträge für die Aktuelles-Seite',
  },
  access: {
    read: () => true,
    create: ({ req }) => !!req.user,
    update: ({ req }) => {
      if (isAdmin(req.user)) return true
      if (req.user?.rolle === 'trainer') {
        return { autor: { equals: req.user.id } }
      }
      return false
    },
    delete: ({ req }) => {
      if (isAdmin(req.user)) return true
      if (req.user?.rolle === 'trainer') {
        return { autor: { equals: req.user.id } }
      }
      return false
    },
  },
  hooks: {
    beforeChange: [
      async ({ data, operation, req }) => {
        if (operation === 'create' && req.user) {
          data.autor = req.user.id
        }
        return data
      },
    ],
  },
  fields: [
    {
      name: 'titel',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      index: true,
      admin: {
        description: 'URL-Bezeichner, z.B. "saisonauftakt-2025"',
      },
    },
    {
      name: 'datum',
      type: 'date',
      required: true,
      admin: {
        date: {
          pickerAppearance: 'dayOnly',
          displayFormat: 'dd.MM.yyyy',
        },
      },
    },
    {
      name: 'kategorie',
      type: 'select',
      required: true,
      options: [
        { label: 'Spieltag', value: 'Spieltag' },
        { label: 'Vereinsnews', value: 'Vereinsnews' },
        { label: 'Jugend', value: 'Jugend' },
        { label: 'Sonstiges', value: 'Sonstiges' },
      ],
      defaultValue: 'Vereinsnews',
    },
    {
      name: 'teaser',
      type: 'textarea',
      required: true,
      admin: {
        description: 'Kurze Vorschau für die Übersichtsseite (1–2 Sätze)',
      },
    },
    {
      name: 'inhalt',
      type: 'richText',
      required: true,
    },
    {
      name: 'bild',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'autor',
      type: 'relationship',
      relationTo: 'users',
      admin: {
        readOnly: true,
        description: 'Wird automatisch beim Erstellen gesetzt',
        position: 'sidebar',
      },
    },
  ],
}
