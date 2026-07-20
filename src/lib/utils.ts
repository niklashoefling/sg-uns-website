import type { TrainerData } from '@/components/cards/TrainerCard'
import type { Media } from '@/payload-types'

export function resolveMediaUrl(obj: unknown): string | null {
  if (obj && typeof obj === 'object') {
    return (obj as Media).url ?? null
  }
  return null
}

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

export function mapUserToTrainerData(user: unknown): TrainerData {
  const u = user as {
    email?: string
    name?: string
    foto?: unknown
    lizenz?: string
    aktivSeit?: number
    nationalitaet?: string
    mannschaft?: { name?: string } | null
  }
  const mannschaftName =
    u.mannschaft && typeof u.mannschaft === 'object' ? (u.mannschaft.name ?? null) : null
  return {
    name: u.name ?? u.email ?? '–',
    fotoUrl: resolveMediaUrl(u.foto),
    lizenz: u.lizenz,
    aktivSeit: u.aktivSeit,
    nationalitaet: u.nationalitaet,
    mannschaft: mannschaftName,
  }
}

export function resolveHalleName(halle: unknown): string | null {
  if (halle && typeof halle === 'object') {
    return (halle as { name?: string }).name ?? null
  }
  return null
}

export function obfuscateEmail(email: string): string {
  return email
    .split('')
    .map((c) => `&#${c.charCodeAt(0)};`)
    .join('')
}

export function extractJoinDocs<T>(join: unknown): T[] {
  if (join && typeof join === 'object' && 'docs' in join) {
    return (join as { docs: T[] }).docs ?? []
  }
  return []
}
