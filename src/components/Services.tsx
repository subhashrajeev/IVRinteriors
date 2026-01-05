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
            initial="initial"
            whileInView="whileInView"
            whileHover={!isMobile ? "hover" : undefined}
            viewport={{
                once: !isMobile,
                amount: isMobile ? 0.3 : 0.6,
                margin: isMobile ? "-20% 0px -20% 0px" : "0px" // Stricter active zone for cleaner scroll
            }}
            className="group relative z-10 cursor-pointer"
            onClick={() => triggerHaptic('light')}
        >
            {/* Offset Shadow Box */}
            <motion.div
                variants={{
                    initial: { x: 0, y: 0, opacity: 0 },
                    whileInView: isMobile ? {
                        x: 8, // Reduced offset for cleaner look
                        y: 8,
                        opacity: 1
                    } : { opacity: 0 },
                    hover: {
                        x: 16,
                        y: 16,
                        opacity: 1
                    }
                }}
                transition={{
                    type: "spring",
                    stiffness: 200, // Softer spring
                    damping: 25,    // Less bounce
                    mass: 0.8
                }}
                className="absolute inset-0 bg-brand-green z-0"
            />

            <motion.div
                variants={{
                    initial: { opacity: 0, y: 20, scale: 1 },
                    whileInView: isMobile ? {
                        opacity: 1,
                        scale: 1, // Removed scaling on mobile to prevent layout jitter
                        backgroundColor: '#FFFFFF',
                        x: -4, // Subtle shift
                        y: -4,
                    } : {
                        opacity: 1,
                        y: 0,
                        scale: 1,
                        backgroundColor: '#050505',
                        x: 0
                    },
                    hover: {
                        backgroundColor: '#FFFFFF',
                        x: -4,
                        y: -4,
                        scale: 1
                    }
                }}
                transition={{
                    delay: isMobile ? 0 : index * 0.05, // Remove delay on mobile for instant feedback
                    duration: 0.4,
                    scale: { type: "spring", stiffness: 300, damping: 30 },
                    backgroundColor: { duration: 0.3 }
                }}
                className="h-full p-10 border border-white/10 bg-charcoal relative z-10 overflow-hidden flex flex-col justify-between"
            >
                {/* Floating Glow Effect - GREEN */}
                <motion.div
                    variants={{
                        initial: { opacity: 0 },
                        whileInView: { opacity: isMobile ? 1 : 0 },
                        hover: { opacity: 1 }
                    }}
                    className="absolute -top-10 -right-10 w-40 h-40 bg-brand-green/20 blur-[60px] rounded-full transition-opacity duration-500 pointer-events-none"
                />

                <div className="relative z-10">
                    <div className="flex justify-between items-start mb-8">
                        <div className="flex items-center gap-4">
                            {/* Icon */}
                            <motion.div
                                variants={{
                                    initial: { opacity: 0.3 },
                                    whileInView: isMobile ? { opacity: 1 } : { opacity: 0.3 },
                                    hover: { opacity: 1, scale: 1.1 }
                                }}
                                className="w-12 h-12 border border-white/10 flex items-center justify-center bg-white/5 transition-all duration-300"
                            >
                                <service.IconComponent size={24} className="text-brand-green" />
                            </motion.div>
                            <motion.h3
                                variants={{
                                    initial: { color: '#FFFFFF' },
                                    whileInView: isMobile ? { color: '#050505' } : { color: '#FFFFFF' },
                                    hover: { color: '#050505' }
                                }}
                                className="text-3xl font-[Oswald] font-bold uppercase italic text-white transition-colors duration-300"
                            >
                                {service.title}
                            </motion.h3>
                        </div>
                        <motion.span
                            variants={{
                                initial: { color: 'rgba(255,255,255,0.05)', y: 0 },
                                whileInView: isMobile ? {
                                    color: '#8CBF3F',
                                    y: -4
                                } : {
                                    color: 'rgba(255,255,255,0.05)',
                                    y: 0
                                },
                                hover: {
                                    color: '#8CBF3F',
                                    y: -8
                                }
                            }}
                            className="text-5xl font-[Oswald] font-bold text-white/5 transition-all duration-300"
                        >
                            {service.icon}
                        </motion.span>
                    </div>

                    <motion.p
                        variants={{
                            initial: { color: 'rgba(255,255,255,0.5)' },
                            whileInView: isMobile ? { color: 'rgba(5,5,5,0.7)' } : { color: 'rgba(255,255,255,0.5)' },
                            hover: { color: 'rgba(5,5,5,0.7)' }
                        }}
                        className="text-white/50 font-light leading-relaxed transition-colors duration-300"
                    >
                        {service.description}
                    </motion.p>
                </div>

                {/* Arrow Icon */}
                <motion.div
                    variants={{
                        initial: { opacity: 0, x: -10 },
                        whileInView: {
                            opacity: isMobile ? 1 : 0,
                            x: isMobile ? 0 : -10
                        },
                        hover: {
                            opacity: 1,
                            x: 0
                        }
                    }}
                    className="mt-8 transition-all duration-300"
                >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-brand-green">
                        <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </motion.div>
            </motion.div>
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
