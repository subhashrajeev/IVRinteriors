import { motion, useScroll, useTransform } from 'framer-motion'
import { useState, useRef, useEffect } from 'react'
import CounterAnimation from './CounterAnimation'

const About = () => {
    const [isInView, setIsInView] = useState(false)
    const [isMobile, setIsMobile] = useState(false)
    const sectionRef = useRef<HTMLElement>(null)
    const imageRef = useRef<HTMLDivElement>(null)

    // Check if mobile on mount
    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768)
        checkMobile()
        window.addEventListener('resize', checkMobile)
        return () => window.removeEventListener('resize', checkMobile)
    }, [])

    // Parallax effect for the image - only on desktop
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"]
    })

    // Disable parallax on mobile for performance
    const imageY = useTransform(scrollYProgress, [0, 1], isMobile ? [0, 0] : [50, -50])

    return (
        <section ref={sectionRef} id="about" className="py-16 md:py-20 bg-charcoal border-b border-white/5 relative overflow-hidden noise-bg">
            {/* Static Gradient Orbs - No JS animation for performance */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
                <div className="absolute top-[10%] left-[10%] w-[300px] h-[300px] bg-gradient-to-r from-gold/30 to-transparent rounded-full blur-[80px] md:animate-float" />
                <div className="absolute bottom-[20%] right-[5%] w-[400px] h-[400px] bg-gradient-to-r from-brand-green/30 to-transparent rounded-full blur-[80px] md:animate-float" style={{ animationDelay: '2s' }} />
            </div>

            <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-14 items-center relative z-10">
                <motion.div
                    initial={{ opacity: 0, x: isMobile ? 0 : -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: isMobile ? 0.4 : 0.6 }}
                    className="lg:col-span-7"
                >
                    <span className="text-gold font-bold tracking-[0.3em] uppercase text-xs mb-8 block flex items-center gap-3">
                        <span className="w-8 h-[2px] bg-gold" />
                        Who We Are
                    </span>
                    <h2 className="text-5xl md:text-7xl font-[Oswald] font-bold uppercase italic text-white mb-10 leading-[0.9]">
                        Crafting <br /> <span className="text-gold">Legacy.</span>
                    </h2>
                    <p className="text-white/60 text-lg font-light leading-relaxed mb-12">
                        Founded by <span className="text-gold text-3xl font-bold mx-2" style={{ fontFamily: "'Great Vibes', cursive" }}>I. Venkataraju</span>, IVR Interiors has been a cornerstone of design excellence in Hyderabad for over 15 years. We merge the raw strength of industrial aesthetics with the warmth of organic luxury, curating spaces that are not just lived in, but felt.
                    </p>

                    <div className="flex flex-wrap gap-8 md:gap-12 border-t border-white/10 pt-8 items-end">
                        <div className="group">
                            <h4 className="text-gold text-5xl font-[Oswald] font-bold italic mb-0">
                                <CounterAnimation end={500} suffix="+" duration={2500} />
                            </h4>
                            <p className="text-[10px] uppercase tracking-widest text-white/40 mt-2 font-bold group-hover:text-gold transition-colors">Happy Clients</p>
                        </div>
                        <div className="group">
                            <h4 className="text-gold text-5xl font-[Oswald] font-bold italic mb-0">
                                <CounterAnimation end={15} suffix="+" duration={2000} />
                            </h4>
                            <p className="text-[10px] uppercase tracking-widest text-white/40 mt-2 font-bold group-hover:text-gold transition-colors">Years Excellence</p>
                        </div>
                        <div className="group">
                            <h4 className="text-gold text-5xl font-[Oswald] font-bold italic mb-0">
                                <CounterAnimation end={1000} suffix="+" duration={3000} />
                            </h4>
                            <p className="text-[10px] uppercase tracking-widest text-white/40 mt-2 font-bold group-hover:text-gold transition-colors">Projects Done</p>
                        </div>

                        <div className="ml-auto text-right w-full md:w-auto mt-4 md:mt-0">
                            <div className="flex items-center justify-end gap-4 md:block">
                                <div className="text-right md:mb-2">
                                    <span
                                        className="text-gold text-xl block"
                                        style={{ fontFamily: "'Great Vibes', cursive" }}
                                    >
                                        I. Venkataraju
                                    </span>
                                    <p className="text-white/40 text-[9px] uppercase tracking-[0.2em] font-bold">
                                        Founder
                                    </p>
                                </div>
                                <div className="w-16 h-20 md:w-24 md:h-32 overflow-hidden border border-white/10 flex-shrink-0 glass-light">
                                    <img
                                        src="/assets/ceo_latest.jpg"
                                        alt="Founder"
                                        loading="lazy"
                                        className={`w-full h-full object-cover transition-all duration-700 ${isInView ? 'grayscale-0' : 'grayscale'} md:grayscale md:hover:grayscale-0`}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>

                <motion.div
                    ref={imageRef}
                    initial={{ opacity: 0, scale: isMobile ? 1 : 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, margin: "-50px" }}
                    onViewportEnter={() => setIsInView(true)}
                    transition={{ duration: isMobile ? 0.4 : 0.6 }}
                    className="relative lg:col-span-5"
                >
                    <div className="aspect-[3/4] overflow-hidden">
                        {isMobile ? (
                            <img
                                src="/assets/IMG-20251203-WA0011.jpg"
                                alt="Philosophy"
                                loading="lazy"
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <motion.img
                                src="/assets/IMG-20251203-WA0011.jpg"
                                alt="Philosophy"
                                loading="lazy"
                                style={{ y: imageY }}
                                className={`w-full h-[120%] object-cover transition-all duration-700 grayscale hover:grayscale-0 parallax-image`}
                            />
                        )}
                    </div>
                    {/* Accent Box - Integrated */}
                    <div className="absolute top-3 left-3 w-full h-full border border-gold/30 pointer-events-none -z-10" />
                    {/* Corner Accent */}
                    <div className="absolute -bottom-4 -right-4 w-24 h-24 border-r-2 border-b-2 border-gold/50 pointer-events-none" />
                </motion.div>
            </div>
        </section>
    )
}

export default About

