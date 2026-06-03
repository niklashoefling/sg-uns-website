export function formatDatum(datum: string) {
  return new Date(datum).toLocaleDateString('de-DE', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

type LexicalNode = {
  type: string
  text?: string
  children?: LexicalNode[]
}

function extractText(node: LexicalNode): string {
  if (node.type === 'text') return node.text ?? ''
  if (node.children) return node.children.map(extractText).join('')
  return ''
}

export function lexicalToPlainText(inhalt: unknown): string {
  if (!inhalt || typeof inhalt !== 'object') return ''
  const root = (inhalt as { root?: LexicalNode }).root
  if (!root) return ''
  return extractText(root).replace(/\s+/g, ' ').trim()
}

import type { TrainerData } from '@/components/cards/TrainerCard'
import { resolveMediaUrl } from '@/lib/media'

export function mapUserToTrainerData(user: unknown): TrainerData {
  const u = user as {
    email?: string
    name?: string
    foto?: unknown
    lizenz?: string
    aktivSeit?: number
  }
  return {
    name: u.name ?? u.email ?? '–',
    fotoUrl: resolveMediaUrl(u.foto),
    lizenz: u.lizenz,
    aktivSeit: u.aktivSeit,
  }
}

export function filterRelations(relations: unknown[]): unknown[] {
  return relations.filter((r) => typeof r === 'object' && r !== null)
}
