import type { CollectionConfig } from 'payload'
import { isAdmin } from './Users'

export const Mannschaften: CollectionConfig = {
  slug: 'mannschaften',
  labels: {
    singular: 'Mannschaft',
    plural: 'Mannschaften',
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'liga'],
    description: 'Verwalte die Mannschaften der SG U.N.S. Rheinhessen',
  },
  access: {
    read: () => true,
    create: ({ req }) => isAdmin(req.user),
    delete: ({ req }) => isAdmin(req.user),
    update: ({ req }) => {
      if (isAdmin(req.user)) return true
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
    },
    {
      name: 'samsLeagueUuid',
      type: 'text',
      admin: {
        description: 'SAMS Liga-UUID für Spielplan und Tabelle (z.B. aus vvrp.de)',
      },
    },
    {
      name: 'samsTeamUuid',
      type: 'text',
      admin: {
        description:
          'SAMS Team-UUID für gefilterten Spielplan (z.B. aus vvrp.de/api/v2/leagues/{uuid}/teams)',
      },
    },
    {
      name: 'tabelleAufstieg',
      type: 'number',
      admin: {
        description: 'Anzahl Aufstiegsplätze in dieser Liga (z.B. 2)',
      },
    },
    {
      name: 'tabelleAbstieg',
      type: 'number',
      admin: {
        description: 'Anzahl Abstiegsplätze in dieser Liga (z.B. 3)',
      },
    },
    {
      name: 'beschreibung',
      type: 'textarea',
      required: true,
    },
    {
      name: 'trainer',
      type: 'join',
      collection: 'users',
      on: 'mannschaft',
      where: { rolle: { equals: 'trainer' } },
      admin: {
        description: 'Trainer dieser Mannschaft (werden beim User gesetzt)',
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
        {
          name: 'halle',
          type: 'relationship',
          relationTo: 'hallen',
          admin: {
            description: 'Halle für dieses Training',
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
