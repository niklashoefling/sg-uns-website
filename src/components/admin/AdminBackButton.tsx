'use client'

export default function AdminBackButton() {
  return (
    <div style={{ padding: '8px 16px 0' }}>
      <a
        href="/"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          padding: '8px 8px',
          borderRadius: '4px',
          fontSize: '13px',
          fontWeight: 500,
          color: 'rgba(255,255,255,0.6)',
          textDecoration: 'none',
          transition: 'color 0.15s, background 0.15s',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.color = '#ffffff'
          e.currentTarget.style.background = 'rgba(255,255,255,0.08)'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.color = 'rgba(255,255,255,0.6)'
          e.currentTarget.style.background = 'transparent'
        }}
      >
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
      </a>
      <div style={{ height: '1px', background: 'rgba(255,255,255,0.1)', margin: '8px 8px 0' }} />
    </div>
  )
}
