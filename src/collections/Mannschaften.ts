import type { CollectionConfig } from 'payload'

export const Mannschaften: CollectionConfig = {
  slug: 'mannschaften',
  labels: {
    singular: 'Mannschaft',
    plural: 'Mannschaften',
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'liga', 'saison'],
    description: 'Verwalte die Mannschaften der SG U.N.S. Rheinhessen',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      index: true,
      admin: {
        description: 'URL-Bezeichner, z.B. "1-herren"',
      },
    },
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'liga',
      type: 'text',
      required: true,
    },
    {
      name: 'saison',
      type: 'text',
      required: true,
      admin: {
        description: 'z.B. "2025/26"',
      },
    },
    {
      name: 'beschreibung',
      type: 'textarea',
      required: true,
    },
    {
      name: 'trainer',
      type: 'text',
      required: true,
    },
    {
      name: 'cotrainer',
      type: 'text',
    },
    {
      name: 'email',
      type: 'email',
      admin: {
        description: 'Kontaktadresse der Mannschaft, z.B. "1herren@sg-uns.de"',
      },
    },
    {
      name: 'halle',
      type: 'text',
      required: true,
    },
    {
      name: 'halleAdresse',
      type: 'text',
      required: true,
    },
    {
      name: 'training',
      type: 'array',
      required: true,
      minRows: 1,
      fields: [
        {
          name: 'tag',
          type: 'text',
          required: true,
          admin: {
            description: 'z.B. "Mittwoch"',
          },
        },
        {
          name: 'uhrzeit',
          type: 'text',
          required: true,
          admin: {
            description: 'z.B. "20:00 - 22:00 Uhr"',
          },
        },
      ],
    },
    {
      name: 'teamfoto',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'spieler',
      type: 'array',
      fields: [
        {
          name: 'name',
          type: 'text',
          required: true,
        },
        {
          name: 'nummer',
          type: 'number',
          required: true,
        },
        {
          name: 'position',
          type: 'select',
          required: true,
          options: [
            { label: 'Zuspiel', value: 'Zuspiel' },
            { label: 'Außenannahme', value: 'Außenannahme' },
            { label: 'Diagonal', value: 'Diagonal' },
            { label: 'Mittelblocker', value: 'Mittelblocker' },
            { label: 'Libero', value: 'Libero' },
            { label: 'Universal', value: 'Universal' },
          ],
        },
        {
          name: 'foto',
          type: 'upload',
          relationTo: 'media',
        },
        {
          name: 'nationalitaet',
          type: 'text',
        },
        {
          name: 'geburtsjahr',
          type: 'number',
        },
        {
          name: 'groesse',
          type: 'number',
          admin: {
            description: 'in cm',
          },
        },
      ],
    },
  ],
}
