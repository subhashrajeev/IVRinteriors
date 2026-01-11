import { lazy, Suspense, useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import SmoothScroll from './components/SmoothScroll'
import PageLoader from './components/PageLoader'
import ScrollProgress from './components/ScrollProgress'
import FloatingWhatsApp from './components/FloatingWhatsApp'

import { SpeedInsights } from '@vercel/speed-insights/react'

// Lazy load heavy components for better initial load performance
const ProjectGrid = lazy(() => import('./components/ProjectGrid'))
const Services = lazy(() => import('./components/Services'))
const About = lazy(() => import('./components/About'))
const Contact = lazy(() => import('./components/Contact'))
const Footer = lazy(() => import('./components/Footer'))

// Minimal loading fallback
const SectionLoader = () => (
  <div className="min-h-[50vh] flex items-center justify-center">
    <div className="w-8 h-8 border-2 border-brand-green border-t-transparent rounded-full animate-spin" />
  </div>
)

const App = () => {
  const [isLoading, setIsLoading] = useState(true)

  return (
    <main className="bg-charcoal">
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
        <Suspense fallback={<SectionLoader />}>
          <ProjectGrid />
          <Services />
          <About />
          <Contact />
          <Footer />
        </Suspense>
        <FloatingWhatsApp />
      </div>
      <SpeedInsights />
    </main>
  )
}

export default App

