import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { triggerHaptic } from '../utils/haptics'
import { ChefHat, Shirt, Tv, Layers, Hammer, Wrench, X, ArrowRight, Check } from 'lucide-react'

// Extended Service Types with details
const services = [
    {
        title: 'Modular Kitchens',
        description: 'Custom modular kitchens with premium materials and smart storage.',
        icon: '01',
        IconComponent: ChefHat,
        details: [
            'Ergonomic Work Triangles',
            'Premium Hettich/Hafele Hardware',
            'Waterproof Marine Ply (BWP)',
            'Acrylic, PU, and Glass Finishes',
            'Smart Storage Solutions'
        ]
    },
    {
        title: 'Wardrobes',
        description: 'Bespoke wardrobes and walk-in closets designed for maximum functionality.',
        icon: '02',
        IconComponent: Shirt,
        details: [
            'Floor-to-Ceiling Designs',
            'Walk-in Closet Organization',
            'Soft-close Sliding Systems',
            'Integrated Lighting Profiles',
            'Variety of Textures & Finishes'
        ]
    },
    {
        title: 'TV Units',
        description: 'Contemporary TV unit designs with integrated storage and cable management.',
        icon: '03',
        IconComponent: Tv,
        details: [
            'Floating Console Designs',
            'Hidden Cable Management',
            'Ambient Backlighting',
            'Display Shelving Integration',
            'Acoustic Paneling Options'
        ]
    },
    {
        title: 'False Ceiling',
        description: 'Elegant false ceiling designs with cove lighting and modern patterns.',
        icon: '04',
        IconComponent: Layers,
        details: [
            'Gypsum & POP Designs',
            'Cove & Profile Lighting',
            'Acoustic Treatment',
            'Wooden Rafter Accents',
            'Climate Control Integration'
        ]
    },
    {
        title: 'Renovation',
        description: 'Complete interior renovation including flooring, painting, and electrical.',
        icon: '05',
        IconComponent: Hammer,
        details: [
            'End-to-End Project Management',
            'Flooring & Tiling Upgrades',
            'Electrical & Plumbing overhaul',
            'Professional Painting & Texturing',
            'Civil Modifications'
        ]
    },
    {
        title: 'Custom Carpentry',
        description: 'Skilled carpentry for unique furniture and woodwork specifications.',
        icon: '06',
        IconComponent: Wrench,
        details: [
            'Bespoke Furniture Pieces',
            'Pooja Units & Mandirs',
            'Custom Shoe Racks',
            'Window Seating Storage',
            'Decorative Partitions'
        ]
    }
]

const ServiceCard = ({ service, index, onClick }: { service: typeof services[0], index: number, onClick: () => void }) => {
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
            whileHover={{
                y: -4,
                transition: { duration: 0.2, ease: "easeOut" }
            }}
            viewport={{
                once: !isMobile,
                amount: isMobile ? 0.3 : 0.6,
                margin: isMobile ? "-20% 0px -20% 0px" : "0px"
            }}
            transition={{
                delay: isMobile ? 0 : index * 0.05,
                duration: 0.4,
            }}
            className="group relative z-10 cursor-pointer"
            onClick={onClick}
            aria-label={`View details for ${service.title}`}
        >
            {/* Offset Shadow Box - shifts on hover */}
            <div
                className="absolute inset-0 bg-brand-green z-0 transition-transform duration-300 ease-out group-hover:translate-x-3 group-hover:translate-y-3"
                style={{ transform: 'translate(8px, 8px)' }}
            />

            <div
                className="h-full p-10 border border-white/10 bg-white relative z-10 overflow-hidden flex flex-col justify-between transition-all duration-300"
            >
                {/* Floating Glow Effect - GREEN */}
                <div
                    className="absolute -top-10 -right-10 w-40 h-40 bg-brand-green/20 blur-[60px] rounded-full pointer-events-none transition-opacity duration-300 group-hover:opacity-60"
                />

                <div className="relative z-10">
                    <div className="flex justify-between items-start mb-8">
                        <div className="flex items-center gap-4">
                            {/* Icon */}
                            <div
                                className="w-12 h-12 border border-charcoal/10 flex items-center justify-center bg-charcoal/5 transition-all duration-300 group-hover:bg-brand-green/10 group-hover:border-brand-green/30"
                            >
                                <service.IconComponent size={24} className="text-brand-green transition-transform duration-300 group-hover:scale-110" />
                            </div>
                            <h3
                                className="text-3xl font-[Oswald] font-bold uppercase italic text-charcoal"
                            >
                                {service.title}
                            </h3>
                        </div>
                        <span
                            className="text-5xl font-[Oswald] font-bold text-brand-green transition-transform duration-300 group-hover:scale-110"
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

                {/* Arrow Icon - slides on hover */}
                <div
                    className="mt-8 transition-transform duration-300 group-hover:translate-x-2 flex items-center gap-2 text-brand-green font-bold uppercase tracking-wider text-xs"
                >
                    View Details
                    <ArrowRight size={16} />
                </div>
            </div>
        </motion.div>
    )
}

const Services = () => {
    const [selectedService, setSelectedService] = useState<typeof services[0] | null>(null)

    // We don't have isMobileMenuOpen here, simplified handler
    const handleRequestQuote = () => {
        triggerHaptic('medium');
        setSelectedService(null);
        const contactSection = document.getElementById('contact');
        if (contactSection) {
            contactSection.scrollIntoView({ behavior: 'smooth' });
            setTimeout(() => {
                const nameInput = document.getElementById('name');
                if (nameInput) nameInput.focus();
            }, 800);
        }
    }

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
                        <ServiceCard
                            key={i}
                            service={service}
                            index={i}
                            onClick={() => {
                                triggerHaptic('light')
                                setSelectedService(service)
                            }}
                        />
                    ))}
                </div>
            </div>

            {/* Service Detail Modal */}
            <AnimatePresence>
                {selectedService && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 md:p-8"
                        onClick={() => setSelectedService(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 20 }}
                            className="bg-white w-full max-w-2xl relative overflow-hidden shadow-2xl"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Decorative Top Bar */}
                            <div className="h-2 bg-brand-green w-full" />

                            {/* Close Button */}
                            <button
                                onClick={() => setSelectedService(null)}
                                className="absolute top-4 right-4 p-2 hover:bg-black/5 transition-colors rounded-full z-20"
                            >
                                <X size={24} className="text-charcoal" />
                            </button>

                            <div className="p-8 md:p-12">
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="w-16 h-16 bg-brand-green/10 flex items-center justify-center">
                                        <selectedService.IconComponent size={32} className="text-brand-green" />
                                    </div>
                                    <div>
                                        <span className="text-brand-green font-mono text-sm uppercase tracking-widest block mb-1">0{services.indexOf(selectedService) + 1}</span>
                                        <h3 className="text-4xl md:text-5xl font-[Oswald] font-bold uppercase italic text-charcoal leading-none">
                                            {selectedService.title}
                                        </h3>
                                    </div>
                                </div>

                                <p className="text-lg text-charcoal/70 mb-8 border-l-2 border-brand-green pl-4">
                                    {selectedService.description}
                                </p>

                                <div className="bg-charcoal/5 p-6 mb-8 group">
                                    <h4 className="text-sm font-bold uppercase tracking-widest text-charcoal/40 mb-4 flex items-center gap-2">
                                        <Layers size={14} /> What's Included
                                    </h4>
                                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {selectedService.details.map((detail, index) => (
                                            <li key={index} className="flex items-start gap-3 text-charcoal/80">
                                                <span className="mt-1 w-4 h-4 rounded-full bg-brand-green/20 flex items-center justify-center flex-shrink-0">
                                                    <Check size={10} className="text-brand-green" />
                                                </span>
                                                {detail}
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div className="flex flex-col md:flex-row gap-4">
                                    <button
                                        onClick={handleRequestQuote}
                                        className="flex-1 bg-brand-green text-charcoal font-bold py-4 px-8 uppercase tracking-widest hover:bg-charcoal hover:text-white transition-colors flex items-center justify-center gap-2 group"
                                    >
                                        Request Quote
                                        <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                                    </button>
                                    <button
                                        onClick={() => setSelectedService(null)}
                                        className="px-8 py-4 font-bold uppercase tracking-widest text-charcoal/40 hover:text-charcoal transition-colors border border-charcoal/10 hover:border-charcoal/30 text-sm"
                                    >
                                        Close
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    )
}

export default Services
