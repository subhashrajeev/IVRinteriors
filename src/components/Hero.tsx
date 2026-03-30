import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight, ArrowUpRight, Layers3, Sparkles, Workflow } from 'lucide-react'

const metrics = [
    { value: '15+', label: 'Years of experience' },
    { value: '500+', label: 'Homes completed' },
    { value: '4.9/5', label: 'Client rating' },
]

const pillars = [
    {
        icon: Sparkles,
        title: 'Good-looking interiors',
        description: 'Clean designs, balanced colours, and finishes that make your home look polished.',
    },
    {
        icon: Workflow,
        title: 'Smooth execution',
        description: 'Clear planning, regular updates, and proper site work so the process stays easy to follow.',
    },
    {
        icon: Layers3,
        title: 'Useful storage',
        description: 'Smart wardrobes, cabinets, and storage planning that help your home stay neat every day.',
    },
]

const Hero = () => {
    const heroRef = useRef<HTMLElement>(null)
    const prefersReducedMotion = useReducedMotion()
    const { scrollYProgress } = useScroll({
        target: heroRef,
        offset: ['start start', 'end start'],
    })

    const imageY = useTransform(scrollYProgress, [0, 1], prefersReducedMotion ? [0, 0] : [0, -70])
    const textY = useTransform(scrollYProgress, [0, 1], prefersReducedMotion ? [0, 0] : [0, -30])

    const scrollToSection = (id: string) => {
        document.getElementById(id)?.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth' })
    }

    return (
        <section ref={heroRef} className="relative overflow-hidden pb-16 pt-32 md:pb-22 md:pt-40">
            <div className="pointer-events-none absolute inset-x-0 top-0 h-[38rem]">
                <div className="absolute left-[8%] top-8 h-52 w-52 rounded-full bg-accent/12 blur-3xl" />
                <div className="absolute right-[10%] top-28 h-64 w-64 rounded-full bg-forest/10 blur-3xl" />
                <div className="absolute left-1/2 top-1/3 h-48 w-[34rem] -translate-x-1/2 rounded-full bg-white/35 blur-3xl" />
            </div>

            <div className="shell relative z-10">
                <div className="grid items-end gap-14 xl:grid-cols-[1.05fr_0.95fr]">
                    <motion.div
                        style={{ y: textY }}
                        initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    >
                        <span className="section-rule">Home interiors in Hyderabad</span>
                        <h1 className="text-hero text-balance text-ink">
                            Homes that feel
                            <span className="block pl-[0.12em] italic text-accent">beautiful, comfortable, and practical.</span>
                        </h1>
                        <p className="mt-7 max-w-2xl text-lg leading-8 text-ink-soft md:text-xl">
                            IVR Interiors designs and completes home interiors in Hyderabad. We help with planning,
                            materials, storage, and full execution from start to finish.
                        </p>

                        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                            <button onClick={() => scrollToSection('projects')} className="btn-primary">
                                See Our Work
                                <ArrowRight className="h-4 w-4" />
                            </button>
                            <a href="/surfaces" className="btn-secondary">
                                View Materials
                                <ArrowUpRight className="h-4 w-4" />
                            </a>
                        </div>

                        <div className="mt-10 grid gap-4 md:grid-cols-3">
                            {metrics.map((metric) => (
                                <div key={metric.label} className="metric-card">
                                    <p className="font-display text-4xl leading-none text-ink md:text-[2.8rem]">{metric.value}</p>
                                    <p className="mt-3 text-sm leading-6 text-ink-soft">{metric.label}</p>
                                </div>
                            ))}
                        </div>

                        <div className="mt-8 flex flex-wrap gap-3 text-sm text-ink-soft">
                            <span className="soft-chip">Residential interiors</span>
                            <span className="soft-chip">Modular kitchens</span>
                            <span className="soft-chip">Wardrobes + custom joinery</span>
                            <span className="soft-chip">Site-managed execution</span>
                        </div>
                    </motion.div>

                    <motion.div
                        style={{ y: imageY }}
                        initial={prefersReducedMotion ? false : { opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
                        className="relative"
                    >
                        <div className="absolute -right-3 top-8 hidden h-28 w-28 rounded-full border border-paper/60 bg-white/35 blur-2xl md:block" />

                        <div className="media-frame aspect-[4/4.8] bg-[#d8c9b7] md:aspect-[4/4.4]">
                            <img
                                src="/assets/IMG-20251203-WA0011.jpg"
                                alt="Statement bedroom interior designed by IVR Interiors"
                                className="h-full w-full object-cover"
                            />
                            <div className="absolute inset-x-0 bottom-0 p-5 md:p-7">
                                <div className="panel-strong max-w-md px-5 py-4">
                                    <p className="text-caption text-accent">Featured project</p>
                                    <p className="mt-3 font-display text-[2rem] leading-none text-ink md:text-[2.4rem]">
                                        Warm colours, soft lighting, and smart storage.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="panel absolute -left-4 bottom-8 hidden max-w-[16rem] px-5 py-5 md:block">
                            <p className="text-caption text-accent">What clients say</p>
                            <p className="mt-3 font-display text-3xl leading-none text-ink">"This is exactly what we wanted."</p>
                            <p className="mt-3 text-sm leading-6 text-ink-soft">
                                We focus on clear planning and careful finishing so the final result matches what was promised.
                            </p>
                        </div>

                        <div className="panel absolute -right-4 top-8 hidden w-[15rem] px-5 py-5 md:block">
                            <p className="text-caption text-accent">Why clients choose us</p>
                            <div className="mt-4 space-y-3 text-sm text-ink-soft">
                                <div className="flex items-center justify-between border-b border-ink/10 pb-3">
                                    <span>Style</span>
                                    <span className="text-ink">Modern and practical</span>
                                </div>
                                <div className="flex items-center justify-between border-b border-ink/10 pb-3">
                                    <span>Location</span>
                                    <span className="text-ink">Hyderabad</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span>Consultation</span>
                                    <span className="text-ink">Free site visit</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>

                <div className="mt-16 grid gap-4 lg:grid-cols-3">
                    {pillars.map((pillar, index) => (
                        <motion.article
                            key={pillar.title}
                            initial={prefersReducedMotion ? false : { opacity: 0, y: 22 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: '-80px' }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            className="panel px-6 py-6"
                        >
                            <div className="flex items-center gap-4">
                                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent/10 text-accent">
                                    <pillar.icon className="h-5 w-5" />
                                </div>
                                <div>
                                    <p className="text-caption text-accent">0{index + 1}</p>
                                    <h2 className="mt-1 text-title text-ink">{pillar.title}</h2>
                                </div>
                            </div>
                            <p className="mt-4 text-sm leading-7 text-ink-soft md:text-base">{pillar.description}</p>
                        </motion.article>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Hero
