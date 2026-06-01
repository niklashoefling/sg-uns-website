import Image from 'next/image'

export function AdminLogo() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
      <Image
        src="/vereine/sguns_volleys.png"
        alt="SG U.N.S. Rheinhessen Volleys"
        width={120}
        height={60}
        style={{ width: 'auto', height: '40px', objectFit: 'contain' }}
      />
    </div>
  )
}

export function AdminIcon() {
  return (
    <Image
      src="/vereine/sguns_volleys.png"
      alt="SG U.N.S."
      width={40}
      height={40}
      style={{ width: '32px', height: '32px', objectFit: 'contain' }}
    />
  )
}
