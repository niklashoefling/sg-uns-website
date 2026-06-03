import type { CollectionConfig } from 'payload'
import { isAdmin, isTrainerOf } from './Users'

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
    create: ({ req }) => isAdmin(req.user),
    delete: ({ req }) => isAdmin(req.user),
    update: ({ req }) => {
      if (isAdmin(req.user)) return true
      // Trainer darf nur eigene Mannschaft bearbeiten – Payload prüft dann per ID-Constraint
      if (req.user?.rolle === 'trainer') {
        const eigene =
          typeof req.user.mannschaft === 'object' ? req.user.mannschaft?.id : req.user.mannschaft
        if (!eigene) return false
        return { id: { equals: eigene } }
      }
      return false
    },
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
      name: 'beschreibung',
      type: 'textarea',
      required: true,
    },
    {
      name: 'trainer',
      type: 'relationship',
      relationTo: 'users',
      hasMany: true,
      filterOptions: {
        rolle: { equals: 'trainer' },
      },
      admin: {
        description: 'Nur User mit Rolle "Trainer" werden angezeigt',
      },
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
      type: 'relationship',
      relationTo: 'hallen',
      required: true,
      admin: {
        description: 'Spielhalle der Mannschaft',
      },
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
        },
        {
          name: 'position',
          type: 'select',
          required: true,
          options: [
            { label: 'Zuspiel', value: 'Zuspiel' },
            { label: 'Außenangriff', value: 'Außenangriff' },
            { label: 'Diagonal', value: 'Diagonal' },
            { label: 'Mittelblock', value: 'Mittelblock' },
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
