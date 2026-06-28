import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

const Hero = () => {
    const heroRef = useRef<HTMLElement>(null)
    const prefersReducedMotion = useReducedMotion()
    const { scrollYProgress } = useScroll({
        target: heroRef,
        offset: ['start start', 'end start'],
    })

    const imageScale = useTransform(scrollYProgress, [0, 1], prefersReducedMotion ? [1, 1] : [1, 1.12])
    const imageY = useTransform(scrollYProgress, [0, 1], prefersReducedMotion ? [0, 0] : [0, 120])
    const contentOpacity = useTransform(scrollYProgress, [0, 0.55], [1, 0])
    const contentY = useTransform(scrollYProgress, [0, 0.55], [0, -40])

    const scrollToProjects = () => {
        document.getElementById('projects')?.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth' })
    }

    return (
        <>
            <section ref={heroRef} className="relative min-h-[100svh] overflow-hidden">
                <motion.div className="absolute inset-0" style={{ scale: imageScale, y: imageY }}>
                    <img
                        src="/assets/IMG-20251203-WA0011.jpg"
                        alt="Bedroom interior designed by IVR Interiors"
                        className="h-full w-full object-cover"
                        fetchPriority="high"
                        decoding="async"
                    />
                </motion.div>

                <div className="vi-hero-vignette pointer-events-none absolute inset-0" />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-void/75 via-void/35 to-void" />

                <motion.div
                    style={{ opacity: contentOpacity, y: contentY }}
                    className="relative z-10 flex min-h-[100svh] flex-col items-center justify-center px-5 pb-28 pt-28 text-center md:px-8 md:pb-32 md:pt-36"
                >
                    <p className="text-caption text-neon-soft">Hyderabad, India</p>

                    <h1 className="mt-6 max-w-[14ch] font-display text-[clamp(3.2rem,11vw,7.5rem)] uppercase leading-[0.88] tracking-[-0.04em]">
                        <span className="vi-gradient-text block">IVR</span>
                        <span className="block text-paper">Interiors</span>
                    </h1>

                    <p className="mt-6 max-w-xl text-base leading-8 text-ink-soft md:text-lg">
                        The warmest side of everyday living — design, materials, and execution for homes that feel
                        beautiful and work in real life.
                    </p>

                    <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
                        <a href="#contact" className="btn-primary min-w-[12rem]">
                            Book free site visit
                        </a>
                        <button type="button" onClick={scrollToProjects} className="btn-secondary min-w-[12rem]">
                            See our work
                        </button>
                    </div>

                    <p className="mt-10 text-[0.65rem] font-medium uppercase tracking-[0.35em] text-ink-soft/80">
                        Scroll for more
                    </p>
                </motion.div>

                <button
                    type="button"
                    onClick={scrollToProjects}
                    className="absolute bottom-8 left-1/2 z-20 flex h-12 w-12 -translate-x-1/2 items-center justify-center rounded-full border border-white/15 bg-white/5 text-paper backdrop-blur-md transition hover:bg-white/10"
                    aria-label="Scroll to portfolio"
                >
                    <ChevronDown className="h-5 w-5 animate-bounce" />
                </button>
            </section>

            <section className="relative border-y border-white/8 bg-void-elevated py-10 md:py-14">
                <div className="shell">
                    <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-center">
                        <div>
                            <h2 className="font-display text-[clamp(2rem,4.5vw,3.5rem)] uppercase leading-[0.92] text-paper">
                                Hyderabad, India.
                            </h2>
                            <p className="mt-5 max-w-lg text-base leading-8 text-ink-soft md:text-lg">
                                Residential interiors planned with clear budgets, practical storage, and finishes chosen
                                to last — from Nizampet to Kompally and across the city.
                            </p>
                        </div>
                        <div className="media-frame aspect-[16/10]">
                            <img
                                src="/assets/IMG-20251203-WA0020.jpg"
                                alt="Living room interior by IVR Interiors"
                                loading="lazy"
                                decoding="async"
                                className="h-full w-full object-cover"
                            />
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Hero