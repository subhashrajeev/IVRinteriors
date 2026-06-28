import { motion } from 'framer-motion'
import { ArrowUpRight, ChefHat, Hammer, Layers, Shirt, Tv, Wrench } from 'lucide-react'

const services = [
    {
        id: '01',
        title: 'Modular kitchens',
        description: 'Well-planned kitchens with good storage, strong fittings, and a clean everyday look.',
        icon: ChefHat,
        features: ['Work triangle planning', 'Premium Hettich / Hafele fittings', 'Waterproof marine ply options'],
    },
    {
        id: '02',
        title: 'Wardrobes & closets',
        description: 'Wardrobes and dressing units that give you more storage without making the room feel heavy.',
        icon: Shirt,
        features: ['Sliding and hinged shutters', 'Integrated mirrors and lighting', 'Compartment planning for accessories'],
    },
    {
        id: '03',
        title: 'TV units & focal walls',
        description: 'TV units and feature walls that look neat and keep wires, storage, and display in order.',
        icon: Tv,
        features: ['Floating consoles', 'Ambient backlighting', 'Hidden cable routing'],
    },
    {
        id: '04',
        title: 'False ceilings & lighting',
        description: 'Ceiling and lighting work that improves the look of the room without overdoing it.',
        icon: Layers,
        features: ['Cove and profile lighting', 'Gypsum and POP detailing', 'Accent feature ceilings'],
    },
    {
        id: '05',
        title: 'Renovation packages',
        description: 'Complete renovation support covering civil work, paint, electrical, plumbing, and interiors.',
        icon: Hammer,
        features: ['Civil coordination', 'Electrical and plumbing support', 'End-to-end schedule management'],
    },
    {
        id: '06',
        title: 'Custom carpentry',
        description: 'Custom units for pooja spaces, partitions, shoe racks, and other home needs.',
        icon: Wrench,
        features: ['Made-to-measure joinery', 'Decorative partitions', 'Special-use storage pieces'],
    },
]

const process = ['First call', 'Site visit', 'Design approval', 'Work completion']

const Services = () => {
    return (
        <section id="services" className="section-padding">
            <div className="shell">
                <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
                    <div className="panel-strong px-6 py-7 md:px-8 md:py-9">
                        <span className="section-rule">What we do</span>
                        <h2 className="section-heading text-balance text-ink">Design and execution in one place.</h2>
                        <p className="mt-6 text-base leading-7 text-ink-soft md:text-lg">
                            We handle the design, material selection, and site work together, so you do not have to coordinate with too many people.
                        </p>

                        <div className="mt-8 space-y-3">
                            {process.map((step, index) => (
                                <div key={step} className="flex items-center gap-4 rounded-full border border-white/10 bg-white/5 px-4 py-3">
                                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-accent text-sm font-semibold text-white">
                                        {index + 1}
                                    </span>
                                    <span className="text-sm text-ink-soft md:text-base">{step}</span>
                                </div>
                            ))}
                        </div>

                        <div className="mt-8 rounded-[20px] border border-white/10 bg-gradient-to-br from-[#ff6b9d]/20 via-[#1a1a28] to-[#0f0f18] px-5 py-5 text-paper">
                            <p className="text-caption text-neon-soft">What you get</p>
                            <p className="mt-3 font-display text-[2.3rem] leading-none">
                                A home that looks good and works well every day.
                            </p>
                        </div>
                    </div>

                    <div className="grid gap-5 md:grid-cols-2">
                        {services.map((service, index) => (
                            <motion.article
                                key={service.id}
                                initial={{ opacity: 0, y: 28 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: '-60px' }}
                                transition={{ duration: 0.55, delay: index * 0.06 }}
                                className="story-card px-6 py-6"
                            >
                                <div className="flex items-start justify-between gap-4">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent/10 text-accent">
                                        <service.icon className="h-5 w-5" />
                                    </div>
                                    <span className="text-caption text-accent">{service.id}</span>
                                </div>

                                <h3 className="mt-5 text-title text-ink">{service.title}</h3>
                                <p className="mt-4 text-sm leading-7 text-ink-soft md:text-base">{service.description}</p>

                                <div className="mt-6 space-y-3">
                                    {service.features.map((feature) => (
                                        <div key={feature} className="flex items-center gap-3 text-sm text-ink-soft">
                                            <span className="h-2 w-2 rounded-full bg-accent" />
                                            {feature}
                                        </div>
                                    ))}
                                </div>

                                <a href="#contact" className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-accent">
                                    Ask about this service
                                    <ArrowUpRight className="h-4 w-4" />
                                </a>
                            </motion.article>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Services
