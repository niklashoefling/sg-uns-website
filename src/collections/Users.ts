import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'email', 'rolle'],
  },
  auth: true,
  access: {
    read: ({ req }) => !!req.user,
    create: ({ req }) => isAdmin(req.user),
    update: ({ req }) => {
      if (isAdmin(req.user)) return true
      if (req.user?.rolle === 'trainer' || req.user?.rolle === 'redakteur') {
        return { id: { equals: req.user.id } }
      }
      return false
    },
    delete: ({ req }) => isAdmin(req.user),
  },
  fields: [
    {
      name: 'rolle',
      type: 'select',
      required: true,
      defaultValue: 'trainer',
      saveToJWT: true,
      access: {
        update: ({ req }) => isAdmin(req.user),
      },
      options: [
        { label: 'Admin', value: 'admin' },
        { label: 'Trainer', value: 'trainer' },
        { label: 'Redakteur', value: 'redakteur' },
      ],
    },
    {
      name: 'mannschaft',
      type: 'relationship',
      relationTo: 'mannschaften',
      admin: {
        description: 'Nur bei Rolle "Trainer" relevant',
        condition: (data) => data.rolle === 'trainer',
      },
    },
    {
      name: 'name',
      type: 'text',
      admin: {
        description: 'Vollständiger Name, z.B. "Max Mustermann"',
      },
    },
    {
      name: 'foto',
      type: 'upload',
      relationTo: 'media',
      admin: {
        condition: (data) => data.rolle === 'trainer',
      },
    },
    {
      name: 'lizenz',
      type: 'text',
      admin: {
        description: 'z.B. "B-Lizenz DVV"',
        condition: (data) => data.rolle === 'trainer',
      },
    },
    {
      name: 'kurzvorstellung',
      type: 'textarea',
      admin: {
        description: 'Kurze Vorstellung (2–3 Sätze)',
        condition: (data) => data.rolle === 'trainer',
      },
    },
    {
      name: 'aktivSeit',
      type: 'number',
      admin: {
        description: 'Jahr seit dem die Person als Trainer aktiv ist, z.B. 2018',
        condition: (data) => data.rolle === 'trainer',
      },
    },
  ],
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isAdmin(user: any): boolean {
  return user?.rolle === 'admin'
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isTrainerOf(user: any, mannschaftId: string | number | null | undefined): boolean {
  if (!user || !mannschaftId) return false
  if (isAdmin(user)) return true
  const eigene = typeof user.mannschaft === 'object' ? user.mannschaft?.id : user.mannschaft
  return String(eigene) === String(mannschaftId)
}
