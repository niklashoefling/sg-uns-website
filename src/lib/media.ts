import type { Media } from '@/payload-types'

export function resolveMediaUrl(obj: unknown): string | null {
  if (obj && typeof obj === 'object') {
    return (obj as Media).url ?? null
  }
  return null
}
