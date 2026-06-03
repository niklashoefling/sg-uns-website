type Props = {
  children: React.ReactNode
  as?: 'h2' | 'h3' | 'span'
  className?: string
}

export default function SectionHeading({ children, as: Tag = 'h2', className = 'mb-6' }: Props) {
  return (
    <Tag className={`text-xs font-semibold uppercase tracking-widest text-primary ${className}`}>
      {children}
    </Tag>
  )
}
