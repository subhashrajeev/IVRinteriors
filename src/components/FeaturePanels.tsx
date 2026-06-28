import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'

const panels = [
    {
        eyebrow: 'Portfolio',
        title: 'Completed homes',
        description: 'Living rooms, bedrooms, kitchens, and storage — real projects across Hyderabad.',
        href: '#projects',
        cta: 'Explore work',
        accent: 'from-[#ff6b9d]/30 via-[#a855f7]/20 to-transparent',
    },
    {
        eyebrow: 'Services',
        title: 'Design to handover',
        description: 'Modular kitchens, wardrobes, ceilings, renovation, and custom carpentry in one team.',
        href: '#services',
        cta: 'See services',
        accent: 'from-[#38bdf8]/25 via-[#6366f1]/15 to-transparent',
    },
    {
        eyebrow: 'Materials',
        title: 'Surface library',
        description: 'Laminates, textures, and finishes you can compare before we lock the design.',
        href: '/surfaces',
        cta: 'View collections',
        accent: 'from-[#fbbf24]/25 via-[#f97316]/15 to-transparent',
    },
    {
        eyebrow: 'Contact',
        title: 'Start your home',
        description: 'Free site visit, clear estimates, and updates through execution.',
        href: '#contact',
        cta: 'Book a visit',
        accent: 'from-[#34d399]/25 via-[#14b8a6]/15 to-transparent',
    },
]

const FeaturePanels = () => {
    return (
        <section className="relative z-10 -mt-6 pb-8 md:-mt-10 md:pb-14">
            <div className="shell">
                <div className="grid gap-4 md:grid-cols-2">
                    {panels.map((panel, index) => (
                        <motion.a
                            key={panel.title}
                            href={panel.href}
                            initial={{ opacity: 0, y: 28 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: '-40px' }}
                            transition={{ duration: 0.55, delay: index * 0.08 }}
                            className="vi-panel group block text-left"
                        >
                            <div className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${panel.accent} opacity-80`} />
                            <div className="relative flex min-h-[11.5rem] flex-col justify-between p-6 md:min-h-[12.5rem] md:p-8">
                                <div>
                                    <p className="text-caption text-neon">{panel.eyebrow}</p>
                                    <h3 className="mt-3 font-display text-[clamp(1.75rem,3vw,2.35rem)] uppercase leading-[0.95] tracking-tight text-paper">
                                        {panel.title}
                                    </h3>
                                    <p className="mt-4 max-w-md text-sm leading-7 text-ink-soft md:text-base">{panel.description}</p>
                                </div>
                                <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-neon transition-colors group-hover:text-paper">
                                    {panel.cta}
                                    <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                                </span>
                            </div>
                        </motion.a>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default FeaturePanels