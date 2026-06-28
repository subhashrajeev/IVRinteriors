import { lazy, Suspense } from 'react'
import { SpeedInsights } from '@vercel/speed-insights/react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import FeaturePanels from './components/FeaturePanels'
import SmoothScroll from './components/SmoothScroll'
import ScrollProgress from './components/ScrollProgress'
import FloatingWhatsApp from './components/FloatingWhatsApp'

const ProjectGrid = lazy(() => import('./components/ProjectGrid'))
const Services = lazy(() => import('./components/Services'))
const About = lazy(() => import('./components/About'))
const Contact = lazy(() => import('./components/Contact'))
const Footer = lazy(() => import('./components/Footer'))
const SurfacesPage = lazy(() => import('./pages/SurfacesPage'))

const SectionLoader = () => (
  <div className="flex min-h-[35vh] items-center justify-center">
    <div className="panel flex items-center gap-3 px-5 py-4 text-sm text-ink-soft">
      <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-neon" />
      Loading section...
    </div>
  </div>
)

const App = () => {
  const isSurfacesPage = window.location.pathname.startsWith('/surfaces')

  return (
    <>
      <a href="#main-content" className="skip-link">Skip to content</a>
      <main id="main-content" className="page-shell min-h-screen text-ink">
        <SmoothScroll />
        <ScrollProgress />
        <Navbar />

        <Suspense fallback={<SectionLoader />}>
          {isSurfacesPage ? (
            <>
              <SurfacesPage />
              <Footer />
            </>
          ) : (
            <>
              <Hero />
              <FeaturePanels />
              <ProjectGrid />
              <Services />
              <About />
              <Contact />
              <Footer />
            </>
          )}
        </Suspense>

        <FloatingWhatsApp />
        <SpeedInsights />
      </main>
    </>
  )
}

export default App
