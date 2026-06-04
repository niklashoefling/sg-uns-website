'use client'

import Link from 'next/link'
import styles from './AdminBackButton.module.css'

export default function AdminBackButton() {
  return (
    <div className={styles.wrapper}>
      <Link href="/" className={styles.link}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="13"
          height="13"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M19 12H5M12 5l-7 7 7 7" />
        </svg>
        Zur Website
      </Link>
      <div className={styles.divider} />
    </div>
  )
}
