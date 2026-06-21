import { getPayload } from 'payload'
import config from '@payload-config'
import HeroSection from '@/components/sections/HeroSection'
import UeberUnsSection from '@/components/sections/UeberUnsSection'
import AktuellesPreview from '@/components/sections/AktuellesPreview'
import { resolveMediaUrl } from '@/lib/utils'

export const metadata = {
  title: 'SG U.N.S. Rheinhessen',
  description:
    'Volleyball in Rheinhessen - SG U.N.S. Rheinhessen, Spielgemeinschaft aus Undenheim, Nieder-Olm und Schornsheim.',
}

export const dynamic = 'force-dynamic'

export default async function HomePage() {
  const payload = await getPayload({ config })
  const { docs } = await payload.find({
    collection: 'mannschaften',
    sort: 'name',
    limit: 1,
    depth: 1,
  })
  const heroBildUrl = resolveMediaUrl(docs[0]?.teamfoto) ?? null

  return (
    <>
      <HeroSection heroBildUrl={heroBildUrl} />
      <div id="ueber-uns" className="pt-16 -mt-16">
        <UeberUnsSection />
      </div>
      <div id="aktuelles" className="pt-16 -mt-16">
        <AktuellesPreview />
      </div>
    </>
  )
}
