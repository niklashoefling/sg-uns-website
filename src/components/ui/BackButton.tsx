'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'

type Props = {
  href: string
  label: string
  variant?: 'dark' | 'light'
}

export default function BackButton({ href, label, variant = 'light' }: Props) {
  const router = useRouter()

  const className =
    variant === 'dark'
      ? 'inline-flex items-center gap-1.5 text-white/60 hover:text-white text-sm transition-colors'
      : 'inline-flex items-center gap-1.5 text-gray-400 hover:text-secondary text-sm transition-colors'

  return (
    <button
      onClick={() => {
        if (window.history.length > 1) {
          router.back()
        } else {
          router.push(href)
        }
      }}
      className={className}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M19 12H5M12 5l-7 7 7 7" />
      </svg>
      {label}
    </button>
  )
}
