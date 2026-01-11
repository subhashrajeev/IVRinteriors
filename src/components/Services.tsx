import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { triggerHaptic } from '../utils/haptics'
import { ChefHat, Shirt, Tv, Layers, Hammer, Wrench } from 'lucide-react'

const services = [
    {
        title: 'Modular Kitchens',
        description: 'Custom modular kitchens with premium materials and smart storage.',
        icon: '01',
        IconComponent: ChefHat
    },
    {
        title: 'Wardrobes',
        description: 'Bespoke wardrobes and walk-in closets designed for maximum functionality.',
        icon: '02',
        IconComponent: Shirt
    },
    {
        title: 'TV Units',
        description: 'Contemporary TV unit designs with integrated storage and cable management.',
        icon: '03',
        IconComponent: Tv
    },
    {
        title: 'False Ceiling',
        description: 'Elegant false ceiling designs with cove lighting and modern patterns.',
        icon: '04',
        IconComponent: Layers
    },
    {
        title: 'Renovation',
        description: 'Complete interior renovation including flooring, painting, and electrical.',
        icon: '05',
        IconComponent: Hammer
    },
    {
        title: 'Custom Carpentry',
        description: 'Skilled carpentry for unique furniture and woodwork specifications.',
        icon: '06',
        IconComponent: Wrench
    }
]

const ServiceCard = ({ service, index }: { service: typeof services[0], index: number }) => {
    const [isMobile, setIsMobile] = useState(false)

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768)
        checkMobile()
        window.addEventListener('resize', checkMobile)
        return () => window.removeEventListener('resize', checkMobile)
    }, [])

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{
                once: !isMobile,
                amount: isMobile ? 0.3 : 0.6,
                margin: isMobile ? "-20% 0px -20% 0px" : "0px"
            }}
            transition={{
                delay: isMobile ? 0 : index * 0.05,
                duration: 0.4,
            }}
            className="group relative z-10"
            onClick={() => triggerHaptic('light')}
        >
            {/* Offset Shadow Box - always visible */}
            <div
                className="absolute inset-0 bg-brand-green z-0"
                style={{ transform: 'translate(8px, 8px)' }}
            />

            <div
                className="h-full p-10 border border-white/10 bg-white relative z-10 overflow-hidden flex flex-col justify-between"
            >
                {/* Floating Glow Effect - GREEN */}
                <div
                    className="absolute -top-10 -right-10 w-40 h-40 bg-brand-green/20 blur-[60px] rounded-full pointer-events-none"
                />

                <div className="relative z-10">
                    <div className="flex justify-between items-start mb-8">
                        <div className="flex items-center gap-4">
                            {/* Icon */}
                            <div
                                className="w-12 h-12 border border-charcoal/10 flex items-center justify-center bg-charcoal/5"
                            >
                                <service.IconComponent size={24} className="text-brand-green" />
                            </div>
                            <h3
                                className="text-3xl font-[Oswald] font-bold uppercase italic text-charcoal"
                            >
                                {service.title}
                            </h3>
                        </div>
                        <span
                            className="text-5xl font-[Oswald] font-bold text-brand-green"
                        >
                            {service.icon}
                        </span>
                    </div>

                    <p
                        className="text-charcoal/70 font-light leading-relaxed"
                    >
                        {service.description}
                    </p>
                </div>

                {/* Arrow Icon - always visible */}
                <div
                    className="mt-8"
                >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-brand-green">
                        <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </div>
            </div>
        </motion.div>
    )
}

const Services = () => {
    return (
        <section id="services" className="py-16 md:py-20 bg-charcoal relative noise-bg">
            <div className="container mx-auto px-6">
                {/* Header - Left Aligned */}
                <div className="mb-10 md:mb-14 border-l-4 border-brand-green pl-6">
                    <span className="text-brand-green font-bold tracking-[0.3em] uppercase text-xs mb-4 block flex items-center gap-3">
                        <span className="w-4 h-[2px] bg-brand-green" />
                        Expertise
                    </span>
                    <h2 className="text-6xl md:text-8xl font-[Oswald] font-bold uppercase italic text-white leading-none">
                        Bespoke <br /> <span className="text-transparent stroke-text" style={{ WebkitTextStroke: '1px white' }}>Solutions</span>
                    </h2>
                </div>

                {/* Services Grid - Neo-brutalist Interactive */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {services.map((service, i) => (
                        <ServiceCard key={i} service={service} index={i} />
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Services
