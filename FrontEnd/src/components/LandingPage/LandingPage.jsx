import React from 'react'
import HeroSection from './HeroSection/Herosection'
import AboutUsSection from './About us/Aboutus'
import Brand from './utils/Brand'
import Feature from './utils/Feature'
import LogoDisplay from './utils/KYN'
import ContactUs from './utils/ContactUs'
import Business from './utils/Business'

const LandingPage = () => {
  return (
    <div>
      <HeroSection />
      <AboutUsSection />
      <Brand />
      <Feature />
      <LogoDisplay />
      <Business />
      <ContactUs />
    </div>
  )
}

export default LandingPage
