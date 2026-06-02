type Props = {
  label: string
  className?: string
}

export default function CategoryBadge({ label, className = '' }: Props) {
  return (
    <span className={`bg-primary/10 text-primary border border-primary/20 text-xs font-semibold px-2.5 py-0.5 rounded-full ${className}`}>
      {label}
    </span>
  )
}
