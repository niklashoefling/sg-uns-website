type Props = {
  eyebrow?: string
  title: string
  backHref?: string
  backLabel?: string
  subtitle?: string
}

export default function PageHeader({ eyebrow, title, backHref, backLabel, subtitle }: Props) {
  return (
    <div className="bg-secondary pt-32 pb-16 px-6">
      <div className="max-w-6xl mx-auto">
        {backHref && (
          <a href={backHref} className="text-white/50 hover:text-white text-sm transition-colors mb-4 inline-block">
            ← {backLabel ?? 'Zurück'}
          </a>
        )}
        {eyebrow && (
          <span className="text-xs font-semibold uppercase tracking-widest text-primary mb-3 block">
            {eyebrow}
          </span>
        )}
        <h1 className="text-5xl font-bold text-white">{title}</h1>
        {subtitle && (
          <p className="text-white/60 mt-3 text-lg">{subtitle}</p>
        )}
      </div>
    </div>
  )
}
