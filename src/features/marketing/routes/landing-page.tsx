import Navbar from '@/components/ui/Navbar'
import React from 'react'
import { HeroSection } from '../components/HeroSection'
import HostingSection from '../components/HostingSection'
import PopularEventsSection from '@/features/events/discovery/components/PopularEventsSection'
import FeaturesShowcaseSection from '../components/FeaturesShowcaseSection'
import FinalCtaSection from '../components/FinalCtaSection'
import Footer from '../components/Footer'

const LandingPage = () => {
  return (
    <div>
      <Navbar />
      <HeroSection />
      <HostingSection />
      <PopularEventsSection />
      <FeaturesShowcaseSection />
      <FinalCtaSection />
      <Footer />
    </div>
  )
}

export default LandingPage