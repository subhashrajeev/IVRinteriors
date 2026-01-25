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
            {/* Soft Shadow Box */}
            <div
                className="absolute inset-0 bg-anthropic-accent/10 rounded-lg z-0 transition-transform duration-300 ease-out group-hover:translate-x-2 group-hover:translate-y-2"
                style={{ transform: 'translate(4px, 4px)' }}
            />

            <div
                className="h-full p-8 border border-anthropic-stone bg-white rounded-lg relative z-10 overflow-hidden flex flex-col justify-between transition-all duration-300 group-hover:border-anthropic-accent/50 group-hover:shadow-lg hover:shadow-anthropic-accent/5"
            >
                <div>
                    <div className="flex justify-between items-start mb-6">
                        <div className="w-12 h-12 rounded-full bg-anthropic-beige flex items-center justify-center transition-colors duration-300 group-hover:bg-anthropic-accent/10">
                            <service.IconComponent size={24} className="text-anthropic-secondary group-hover:text-anthropic-accent transition-colors" />
                        </div>
                        <span className="text-4xl font-serif font-bold text-anthropic-stone/30 group-hover:text-anthropic-accent/20 transition-colors">
                            {service.icon}
                        </span>
                    </div>

                    <h3 className="text-2xl font-serif text-anthropic-text mb-3 group-hover:text-anthropic-accent transition-colors">
                        {service.title}
                    </h3>

                    <p className="text-anthropic-secondary text-sm leading-relaxed">
                        {service.description}
                    </p>
                </div>

                {/* Arrow Icon - slides on hover */}
                <div
                    className="mt-6 transition-transform duration-300 group-hover:translate-x-1 flex items-center gap-2 text-anthropic-accent font-medium text-xs uppercase tracking-wide opacity-0 group-hover:opacity-100"
                >
                    Details <ArrowRight size={14} />
                </div>
            </div>
        </motion.div>
    )
}

const Services = () => {
    const [selectedService, setSelectedService] = useState<typeof services[0] | null>(null)

    const handleRequestQuote = () => {
        triggerHaptic('medium');
        setSelectedService(null);
        const contactSection = document.getElementById('contact');
        if (contactSection) {
            contactSection.scrollIntoView({ behavior: 'smooth' });
        }
    }

    return (
        <section id="services" className="py-20 bg-anthropic-beige relative">
            <div className="container mx-auto px-6">
                {/* Header - Left Aligned */}
                <div className="mb-14 border-l-2 border-anthropic-accent pl-6">
                    <span className="text-anthropic-accent font-bold tracking-[0.2em] uppercase text-xs mb-2 block">
                        Expertise
                    </span>
                    <h2 className="text-4xl md:text-5xl font-serif text-anthropic-text leading-tight">
                        Bespoke <span className="italic text-anthropic-secondary">Solutions.</span>
                    </h2>
                </div>

                {/* Services Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
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
                        className="fixed inset-0 z-[100] bg-anthropic-beige/90 backdrop-blur-sm flex items-center justify-center p-4 md:p-8"
                        onClick={() => setSelectedService(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.95, y: 10 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.95, y: 10 }}
                            className="bg-white w-full max-w-2xl relative overflow-hidden shadow-2xl rounded-lg border border-anthropic-stone"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Decorative Top Bar */}
                            <div className="h-1 bg-anthropic-accent w-full" />

                            {/* Close Button */}
                            <button
                                onClick={() => setSelectedService(null)}
                                className="absolute top-4 right-4 p-2 hover:bg-anthropic-stone/20 transition-colors rounded-full z-20"
                            >
                                <X size={20} className="text-anthropic-text" />
                            </button>

                            <div className="p-8 md:p-10">
                                <div className="flex items-center gap-5 mb-8">
                                    <div className="w-16 h-16 bg-anthropic-beige rounded-full flex items-center justify-center">
                                        <selectedService.IconComponent size={32} className="text-anthropic-accent" />
                                    </div>
                                    <div>
                                        <span className="text-anthropic-secondary/60 font-mono text-xs uppercase tracking-widest block mb-1">0{services.indexOf(selectedService) + 1}</span>
                                        <h3 className="text-3xl md:text-4xl font-serif text-anthropic-text leading-none">
                                            {selectedService.title}
                                        </h3>
                                    </div>
                                </div>

                                <p className="text-lg text-anthropic-secondary leading-relaxed mb-8 border-l-2 border-anthropic-stone pl-4">
                                    {selectedService.description}
                                </p>

                                <div className="bg-anthropic-beige/50 p-6 mb-8 rounded-lg border border-anthropic-stone/30">
                                    <h4 className="text-xs font-bold uppercase tracking-widest text-anthropic-text/60 mb-4 flex items-center gap-2">
                                        <Layers size={12} /> Included Features
                                    </h4>
                                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                        {selectedService.details.map((detail, index) => (
                                            <li key={index} className="flex items-start gap-3 text-anthropic-text text-sm">
                                                <span className="mt-1 w-4 h-4 rounded-full bg-anthropic-accent/10 flex items-center justify-center flex-shrink-0">
                                                    <Check size={10} className="text-anthropic-accent" />
                                                </span>
                                                {detail}
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div className="flex gap-4">
                                    <button
                                        onClick={handleRequestQuote}
                                        className="flex-1 btn-primary rounded-md"
                                    >
                                        Request Quote
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
