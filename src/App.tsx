import Navbar from './components/Navbar'
import Hero from './components/Hero'
import ProjectGrid from './components/ProjectGrid'
import Footer from './components/Footer'
import SmoothScroll from './components/SmoothScroll'
import Services from './components/Services'
import Testimonials from './components/Testimonials'
import Contact from './components/Contact'
import { SpeedInsights } from '@vercel/speed-insights/react'
import { motion } from 'framer-motion'
import { useState } from 'react'

const AboutSection = () => {
  const [isInView, setIsInView] = useState(false)

  return (
    <section id="about" className="py-32 bg-charcoal border-b border-white/5 relative overflow-hidden">
      <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-20 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="lg:col-span-7"
        >
          <span className="text-gold font-bold tracking-[0.3em] uppercase text-xs mb-8 block">Who We Are</span>
          <h2 className="text-5xl md:text-7xl font-[Oswald] font-bold uppercase italic text-white mb-10 leading-[0.9]">
            Crafting <br /> <span className="text-gold">Legacy.</span>
          </h2>
          <p className="text-white/60 text-lg font-light leading-relaxed mb-12">
            Founded by I. Venkata Raju, IVR Interiors has been a cornerstone of design excellence in Hyderabad for over 15 years. We merge the raw strength of industrial aesthetics with the warmth of organic luxury, curating spaces that are not just lived in, but felt.
          </p>

          <div className="flex gap-12 border-t border-white/10 pt-8">
            <div>
              <h4 className="text-gold text-5xl font-[Oswald] font-bold italic mb-0">500+</h4>
              <p className="text-[10px] uppercase tracking-widest text-white/40 mt-2 font-bold">Clients</p>
            </div>
            <div>
              <h4 className="text-gold text-5xl font-[Oswald] font-bold italic mb-0">15+</h4>
              <p className="text-[10px] uppercase tracking-widest text-white/40 mt-2 font-bold">Years</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          onViewportEnter={() => setIsInView(true)}
          transition={{ duration: 0.8 }}
          className="relative lg:col-span-5"
        >
          <div className="aspect-[3/4] overflow-hidden">
            <img
              src="/assets/IMG-20251203-WA0011.jpg"
              alt="Philosophy"
              className={`w-full h-full object-cover transition-all duration-700 ${isInView ? 'grayscale-0' : 'grayscale'} md:grayscale md:hover:grayscale-0`}
            />
          </div>
          {/* Accent Box - Integrated */}
          <div className="absolute top-3 left-3 w-full h-full border border-gold/30 pointer-events-none -z-10" />
        </motion.div>
      </div>
    </section>
  )
}

const App = () => {
  return (
    <main className="bg-charcoal">
      <SmoothScroll />
      <Navbar />
      <Hero />
      <AboutSection />
      <ProjectGrid />
      <Services />
      <Testimonials />
      <Contact />
      <Footer />
      <SpeedInsights />
    </main>
  )
}

export default App
