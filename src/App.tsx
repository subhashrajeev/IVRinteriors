import Navbar from './components/Navbar'
import Hero from './components/Hero'
import ProjectGrid from './components/ProjectGrid'
import Footer from './components/Footer'
import SmoothScroll from './components/SmoothScroll'
import Services from './components/Services'
import Testimonials from './components/Testimonials'
import Contact from './components/Contact'
import CustomCursor from './components/CustomCursor'
import PageLoader from './components/PageLoader'
import ScrollProgress from './components/ScrollProgress'
import FloatingWhatsApp from './components/FloatingWhatsApp'

import About from './components/About'

import { SpeedInsights } from '@vercel/speed-insights/react'
import { useState } from 'react'

const App = () => {
  const [isLoading, setIsLoading] = useState(true)

  return (
    <main className="bg-charcoal">
      <CustomCursor />
      <PageLoader onComplete={() => setIsLoading(false)} />

      {/* Content renders immediately but is hidden behind loader - allows LCP elements to start loading */}
      <div style={{
        visibility: isLoading ? 'hidden' : 'visible',
        opacity: isLoading ? 0 : 1,
        transition: 'opacity 0.3s ease-out'
      }}>
        <ScrollProgress />
        <SmoothScroll />
        <Navbar />
        <Hero />
        <ProjectGrid />
        <Services />
        <About />
        <Testimonials />
        <Contact />

        <Footer />
        <FloatingWhatsApp />
      </div>
      <SpeedInsights />
    </main>
  )
}

export default App
