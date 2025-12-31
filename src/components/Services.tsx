import { motion } from 'framer-motion'
import { triggerHaptic } from '../utils/haptics'

const services = [
    {
        title: 'Modular Kitchens',
        description: 'Custom modular kitchens with premium materials and smart storage.',
        icon: '01'
    },
    {
        title: 'Wardrobes',
        description: 'Bespoke wardrobes and walk-in closets designed for maximum functionality.',
        icon: '02'
    },
    {
        title: 'TV Units',
        description: 'Contemporary TV unit designs with integrated storage and cable management.',
        icon: '03'
    },
    {
        title: 'False Ceiling',
        description: 'Elegant false ceiling designs with cove lighting and modern patterns.',
        icon: '04'
    },
    {
        title: 'Renovation',
        description: 'Complete interior renovation including flooring, painting, and electrical.',
        icon: '05'
    },
    {
        title: 'Custom Carpentry',
        description: 'Skilled carpentry for unique furniture and woodwork specifications.',
        icon: '06'
    }
]

const Services = () => {
    return (
        <section id="services" className="py-32 bg-charcoal relative">
            <div className="container mx-auto px-6">
                {/* Header - Left Aligned */}
                <div className="mb-24 border-l-4 border-gold pl-8">
                    <span className="text-gold font-bold tracking-[0.3em] uppercase text-xs mb-4 block">Expertise</span>
                    <h2 className="text-6xl md:text-8xl font-[Oswald] font-bold uppercase italic text-white leading-none">
                        Bespoke <br /> <span className="text-transparent stroke-text" style={{ WebkitTextStroke: '1px white' }}>Solutions</span>
                    </h2>
                </div>

                {/* Services Grid - Neo-brutalist Interactive */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {services.map((service, i) => (
                        <div key={i} className="group relative z-10" onClick={() => triggerHaptic('light')}>
                            {/* Offset Shadow Box (Appears on Hover) - Now inside local stacking context */}
                            <div className="absolute inset-0 bg-brand-green translate-x-0 translate-y-0 group-hover:translate-x-4 group-hover:translate-y-4 z-0 opacity-0 group-hover:opacity-100 transition-all duration-300 ease-out" />

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ margin: "-50px" }}
                                transition={{ delay: i * 0.1, duration: 0.5 }}
                                className="h-full p-10 border border-white/10 bg-charcoal group-hover:bg-white group-hover:-translate-x-1 group-hover:-translate-y-1 transition-all duration-300 relative z-10 overflow-hidden flex flex-col justify-between"
                            >
                                {/* Floating Glow Effect - GREEN */}
                                <div className="absolute -top-10 -right-10 w-40 h-40 bg-brand-green/20 blur-[60px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                                <div className="relative z-10">
                                    <div className="flex justify-between items-start mb-8">
                                        <h3 className="text-3xl font-[Oswald] font-bold uppercase italic text-white group-hover:text-charcoal transition-colors duration-300">
                                            {service.title}
                                        </h3>
                                        <span className="text-5xl font-[Oswald] font-bold text-white/5 group-hover:text-brand-green transition-colors duration-300 translate-y-0 group-hover:-translate-y-2 transform">
                                            {service.icon}
                                        </span>
                                    </div>

                                    <p className="text-white/50 font-light leading-relaxed group-hover:text-charcoal/70 transition-colors duration-300">
                                        {service.description}
                                    </p>
                                </div>

                                {/* Arrow Icon that appears/moves - GREEN */}
                                <div className="mt-8 opacity-0 group-hover:opacity-100 transform translate-x-[-10px] group-hover:translate-x-0 transition-all duration-300">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-brand-green">
                                        <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </div>
                            </motion.div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Services
