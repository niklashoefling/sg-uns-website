import BackButton from '@/components/ui/BackButton'

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
          <div className="mb-4">
            <BackButton href={backHref} label={backLabel ?? 'Zurück'} variant="dark" />
          </div>
        )}
        {eyebrow && (
          <span className="text-xs font-semibold uppercase tracking-widest text-primary mb-3 block">
            {eyebrow}
          </span>
        )}
        <h1 className="text-5xl font-bold text-white">{title}</h1>
        {subtitle && <p className="text-white/60 mt-3 text-lg">{subtitle}</p>}
      </div>
    </div>
  )
}
