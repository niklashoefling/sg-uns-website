import type { CollectionConfig, CollectionAfterChangeHook } from 'payload'
import { resolvePayloadId, toNumIds } from '@/lib/utils'

export const syncingFromUser = new Set<number>()

const syncMannschaftTrainer: CollectionAfterChangeHook = async ({ doc, previousDoc, req }) => {
  if (doc.rolle !== 'trainer') return
  const { payload } = req

  const newMannschaftId = resolvePayloadId(doc.mannschaft)
  const oldMannschaftId = resolvePayloadId(previousDoc?.mannschaft)

  if (newMannschaftId === oldMannschaftId) return

  const trainerId = Number(doc.id)

  await Promise.all([
    (async () => {
      if (!oldMannschaftId || syncingFromUser.has(oldMannschaftId)) return
      syncingFromUser.add(oldMannschaftId)
      try {
        const old = await payload.findByID({
          collection: 'mannschaften',
          id: oldMannschaftId,
          select: { trainer: true },
        })
        await payload.update({
          collection: 'mannschaften',
          id: oldMannschaftId,
          data: { trainer: toNumIds(old.trainer as unknown[]).filter((id) => id !== trainerId) },
        })
      } finally {
        syncingFromUser.delete(oldMannschaftId)
      }
    })(),
    (async () => {
      if (!newMannschaftId || syncingFromUser.has(newMannschaftId)) return
      syncingFromUser.add(newMannschaftId)
      try {
        const next = await payload.findByID({
          collection: 'mannschaften',
          id: newMannschaftId,
          select: { trainer: true },
        })
        const current = toNumIds(next.trainer as unknown[])
        if (!current.includes(trainerId)) {
          await payload.update({
            collection: 'mannschaften',
            id: newMannschaftId,
            data: { trainer: [...current, trainerId] },
          })
        }
      } finally {
        syncingFromUser.delete(newMannschaftId)
      }
    })(),
  ])
}

export const Users: CollectionConfig = {
  slug: 'users',
  labels: {
    singular: 'Benutzer',
    plural: 'Benutzer',
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'email', 'rolle'],
  },
  auth: true,
  hooks: {
    afterChange: [syncMannschaftTrainer],
  },
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
      name: 'aktivSeit',
      type: 'number',
      admin: {
        description: 'Jahr seit dem die Person als Trainer aktiv ist, z.B. 2018',
        condition: (data) => data.rolle === 'trainer',
      },
    },
    {
      name: 'nationalitaet',
      type: 'text',
      admin: {
        description: 'z.B. "Deutschland"',
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
