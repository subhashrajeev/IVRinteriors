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

                    {/* Heading with CEO beside it */}
                    <div className="flex flex-col md:flex-row md:items-end md:gap-8 mb-10">
                        <h2 className="text-5xl md:text-7xl font-[Oswald] font-bold uppercase italic text-white leading-[0.9]">
                            Crafting <br /> <span className="text-gold">Legacy.</span>
                        </h2>

                        {/* CEO Card - Subtle & Premium */}
                        <div className="flex items-center gap-6 mt-8 md:mt-0 md:mb-2 group">
                            {/* Refined Photo Frame */}
                            <div className="relative">
                                {/* Subtle Ambient Glow */}
                                <div className="absolute -inset-3 bg-gold/10 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                                <div className="relative w-20 h-28 md:w-24 md:h-32 border border-gold/20 p-1.5 transition-transform duration-500 group-hover:scale-105">
                                    {/* Corner Accents */}
                                    <div className="absolute -top-1 -left-1 w-3 h-3 border-t border-l border-gold/60" />
                                    <div className="absolute -bottom-1 -right-1 w-3 h-3 border-b border-r border-gold/60" />

                                    <div className="w-full h-full overflow-hidden bg-charcoal">
                                        <img
                                            src="/assets/ceo_latest.jpg"
                                            alt="Founder"
                                            loading="lazy"
                                            className={`w-full h-full object-cover transition-all duration-1000 ${isInView ? 'grayscale-0' : 'grayscale'} md:grayscale group-hover:grayscale-0 contrast-[1.1] brightness-[1.05]`}
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Sophisticated Text */}
                            <div className="space-y-1">
                                <span
                                    className="text-gold text-2xl md:text-3xl block transition-all duration-500 group-hover:tracking-wider"
                                    style={{ fontFamily: "'Great Vibes', cursive" }}
                                >
                                    I. Venkataraju
                                </span>
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-[1px] bg-gradient-to-r from-gold/50 to-transparent" />
                                    <p className="text-white/40 text-[10px] uppercase tracking-[0.3em] font-bold">
                                        Founder
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <p className="text-white/60 text-lg font-light leading-relaxed mb-12">
                        With over 15 years of design excellence in Hyderabad, IVR Interiors merges the raw strength of industrial aesthetics with the warmth of organic luxury, curating spaces that are not just lived in, but felt.
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

