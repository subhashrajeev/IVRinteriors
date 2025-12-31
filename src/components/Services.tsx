import { useState, useEffect } from 'react'
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
                amount: 0.6,
                margin: isMobile ? "-10% 0px -10% 0px" : "0px"
            }}
            className="group relative z-10 cursor-pointer"
            onClick={() => triggerHaptic('light')}
        >
            {/* Offset Shadow Box */}
            <motion.div
                variants={{
                    initial: { x: 0, y: 0, opacity: 0 },
                    whileInView: isMobile ? {
                        x: 12,
                        y: 12,
                        opacity: 1
                    } : { opacity: 0 },
                    hover: {
                        x: 16,
                        y: 16,
                        opacity: 1
                    }
                }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="absolute inset-0 bg-brand-green z-0"
            />

            <motion.div
                variants={{
                    initial: { opacity: 0, y: 20, scale: 1 },
                    whileInView: isMobile ? {
                        opacity: 1,
                        scale: 1.03,
                        backgroundColor: '#FFFFFF',
                        x: -6,
                        y: -6,
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
                    delay: index * 0.05,
                    duration: 0.5,
                    scale: { type: "spring", stiffness: 400, damping: 25 },
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
                        <motion.span
                            variants={{
                                initial: { color: 'rgba(255,255,255,0.05)', y: 0 },
                                whileInView: isMobile ? {
                                    color: '#8CBF3F',
                                    y: -8
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
                        <ServiceCard key={i} service={service} index={i} />
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Services
