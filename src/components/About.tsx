import { motion } from 'framer-motion'
import CounterAnimation from './CounterAnimation'

const team = [
    { name: 'I. Venkataraju', role: 'Founder & execution lead', image: '/assets/ceo_latest.jpg' },
    { name: 'Haneesha', role: 'Client support', image: '/assets/social_media_manager.jpg' },
    { name: 'Rajeev', role: 'Design support', image: '/assets/content_writer.jpg' },
]

const principles = [
    {
        title: 'Simple design that lasts',
        description: 'We focus on clean work, useful layouts, and finishes that still look good after years of use.',
    },
    {
        title: 'Storage that makes sense',
        description: 'Wardrobes, cabinets, and utility areas are planned properly so the home stays organised.',
    },
    {
        title: 'Strong work on site',
        description: 'We stay involved during execution so the final result looks right, not just the design on paper.',
    },
]

const About = () => {
    return (
        <section id="about" className="section-padding">
            <div className="shell">
                <div className="grid gap-10 xl:grid-cols-[0.9fr_1.1fr]">
                    <div className="panel-strong overflow-hidden">
                        <div className="aspect-[4/4.6] overflow-hidden">
                            <img
                                src="/assets/IMG-20251203-WA0018.jpg"
                                alt="Refined interior by IVR Interiors"
                                className="h-full w-full object-cover"
                            />
                        </div>
                        <div className="grid gap-4 p-6 md:grid-cols-3 md:p-7">
                            <div className="metric-card text-center">
                                <p className="font-display text-4xl leading-none text-ink">
                                    <CounterAnimation end={15} suffix="+" duration={1800} />
                                </p>
                                <p className="mt-2 text-sm text-ink-soft">Years in interiors</p>
                            </div>
                            <div className="metric-card text-center">
                                <p className="font-display text-4xl leading-none text-ink">
                                    <CounterAnimation end={500} suffix="+" duration={2100} />
                                </p>
                                <p className="mt-2 text-sm text-ink-soft">Homes delivered</p>
                            </div>
                            <div className="metric-card text-center">
                                <p className="font-display text-4xl leading-none text-ink">
                                    <CounterAnimation end={1000} suffix="+" duration={2400} />
                                </p>
                                <p className="mt-2 text-sm text-ink-soft">Happy referrals</p>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col gap-6">
                        <div>
                            <span className="section-rule">About us</span>
                            <h2 className="section-heading text-balance text-ink">A Hyderabad team that keeps interiors simple and well done.</h2>
                            <p className="mt-6 text-base leading-7 text-ink-soft md:text-lg">
                                IVR Interiors works on homes that need good design, practical planning, and proper execution.
                                Clients come to us because they want one team that can guide the work clearly from the first visit to final handover.
                            </p>
                        </div>

                        <div className="grid gap-4">
                            {principles.map((principle, index) => (
                                <motion.article
                                    key={principle.title}
                                    initial={{ opacity: 0, y: 22 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: '-60px' }}
                                    transition={{ duration: 0.5, delay: index * 0.08 }}
                                    className="panel px-6 py-5"
                                >
                                    <p className="text-caption text-accent">0{index + 1}</p>
                                    <h3 className="mt-3 text-title text-ink">{principle.title}</h3>
                                    <p className="mt-3 text-sm leading-7 text-ink-soft md:text-base">{principle.description}</p>
                                </motion.article>
                            ))}
                        </div>

                        <div className="panel px-6 py-6">
                            <p className="text-caption text-accent">Meet the team</p>
                            <div className="mt-5 grid gap-4 sm:grid-cols-3">
                                {team.map((member) => (
                                    <div key={member.name} className="rounded-[24px] border border-ink/10 bg-paper/70 p-4 text-center">
                                        <div className="mx-auto h-20 w-20 overflow-hidden rounded-full border border-ink/10">
                                            <img src={member.image} alt={member.name} className="h-full w-full object-cover" />
                                        </div>
                                        <p className="mt-4 font-display text-[1.6rem] leading-none text-ink">{member.name}</p>
                                        <p className="mt-2 text-sm text-ink-soft">{member.role}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default About
