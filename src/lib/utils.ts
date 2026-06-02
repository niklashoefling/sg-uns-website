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
