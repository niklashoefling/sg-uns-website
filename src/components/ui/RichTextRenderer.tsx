type LexicalNode = {
  type: string
  version: number
  tag?: string
  format?: string | number
  text?: string
  children?: LexicalNode[]
  url?: string
  [k: string]: unknown
}

function nodeKey(node: LexicalNode, index: number): string {
  return `${node.type}-${index}`
}

function renderNode(node: LexicalNode, index: number): React.ReactNode {
  if (node.type === 'text') {
    let content: React.ReactNode = node.text ?? ''
    const format = typeof node.format === 'number' ? node.format : 0
    if (format & 1) content = <strong key={nodeKey(node, index)}>{content}</strong>
    if (format & 2) content = <em key={nodeKey(node, index)}>{content}</em>
    if (format & 8) content = <u key={nodeKey(node, index)}>{content}</u>
    return content
  }

  if (node.type === 'paragraph') {
    return (
      <p key={nodeKey(node, index)} className="mb-4 text-gray-500 leading-relaxed">
        {node.children?.map((child, i) => renderNode(child, i))}
      </p>
    )
  }

  if (node.type === 'heading') {
    const tag = (node.tag as string) ?? 'h2'
    const classes: Record<string, string> = {
      h2: 'text-2xl font-bold text-secondary mt-8 mb-3',
      h3: 'text-xl font-bold text-secondary mt-6 mb-2',
      h4: 'text-lg font-semibold text-secondary mt-4 mb-2',
    }
    const className = classes[tag] ?? classes.h2
    if (tag === 'h2')
      return (
        <h2 key={nodeKey(node, index)} className={className}>
          {node.children?.map((c, i) => renderNode(c, i))}
        </h2>
      )
    if (tag === 'h3')
      return (
        <h3 key={nodeKey(node, index)} className={className}>
          {node.children?.map((c, i) => renderNode(c, i))}
        </h3>
      )
    return (
      <h4 key={nodeKey(node, index)} className={className}>
        {node.children?.map((c, i) => renderNode(c, i))}
      </h4>
    )
  }

  if (node.type === 'list') {
    const isOrdered = node.listType === 'number'
    const items = node.children?.map((child, i) => (
      <li key={`listitem-${i}`} className="mb-1">
        {child.children?.map((c, j) => renderNode(c, j))}
      </li>
    ))
    return isOrdered ? (
      <ol
        key={nodeKey(node, index)}
        className="list-decimal list-inside mb-4 text-gray-500 space-y-1"
      >
        {items}
      </ol>
    ) : (
      <ul key={nodeKey(node, index)} className="list-disc list-inside mb-4 text-gray-500 space-y-1">
        {items}
      </ul>
    )
  }

  if (node.type === 'link') {
    const fields = node.fields as { url?: string; newTab?: boolean } | undefined
    const href = fields?.url ?? (typeof node.url === 'string' ? node.url : '#')
    const newTab = fields?.newTab ?? true
    return (
      <a
        key={nodeKey(node, index)}
        href={href}
        className="text-primary hover:underline"
        target={newTab ? '_blank' : undefined}
        rel={newTab ? 'noopener noreferrer' : undefined}
      >
        {node.children?.map((c, i) => renderNode(c, i))}
      </a>
    )
  }

  if (node.children) {
    return <span key={nodeKey(node, index)}>{node.children.map((c, i) => renderNode(c, i))}</span>
  }

  return null
}

export default function RichTextRenderer({ content }: { content: { root: LexicalNode } }) {
  if (!content?.root?.children) return null
  return <div>{content.root.children.map((node, i) => renderNode(node, i))}</div>
}
