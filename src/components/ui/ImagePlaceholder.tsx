type Props = {
  emoji: string
  size?: 'sm' | 'md' | 'lg'
}

const sizeMap = {
  sm: 'text-3xl',
  md: 'text-4xl',
  lg: 'text-5xl',
}

export default function ImagePlaceholder({ emoji, size = 'lg' }: Props) {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <span className={`${sizeMap[size]} opacity-20`}>{emoji}</span>
    </div>
  )
}
