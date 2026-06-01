import HeroSection from '@/components/sections/HeroSection'
import UeberUnsSection from '@/components/sections/UeberUnsSection'
import AktuellesPreview from '@/components/sections/AktuellesPreview'

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <div id="ueber-uns" className="pt-16 -mt-16">
        <UeberUnsSection />
      </div>
      <div id="aktuelles" className="pt-16 -mt-16">
        <AktuellesPreview />
      </div>
    </>
  )
}
