import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect, useCallback } from 'react'
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react'
import { triggerHaptic } from '../utils/haptics'
import AnimatedGradient from './AnimatedGradient'

const testimonials = [
    {
        id: 1,
        name: 'Vikram Reddy',
        role: 'Apartment Owner, Hitech City',
        text: "The team's attention to detail is unmatched. From the initial consultation to the final handover, the execution was flawless. They truly transformed our apartment into a sanctuary.",
        rating: 5,
        avatarGradient: 'from-brand-green to-emerald-600'
    },
    {
        id: 2,
        name: 'Anjali Rao',
        role: 'Villa Owner, Gachibowli',
        text: "I was looking for something unique for my modular kitchen, and IVR Interiors delivered beyond expectations. The quality of materials and the speed of delivery were impressive.",
        rating: 5,
        avatarGradient: 'from-amber-400 to-orange-500'
    },
    {
        id: 3,
        name: 'Rajesh Kumar',
        role: 'Commercial Space, Jubilee Hills',
        text: "We needed a modern yet functional office space. The design team nailed the brief perfectly, balancing aesthetics with productivity. Highly recommended for premium interiors.",
        rating: 5,
        avatarGradient: 'from-blue-400 to-purple-500'
    },
    {
        id: 4,
        name: 'Priya Sharma',
        role: 'Home Owner, Banjara Hills',
        text: "The attention to detail and craftsmanship is exceptional. Our living room transformation exceeded all expectations. Thank you IVR Interiors!",
        rating: 5,
        avatarGradient: 'from-pink-400 to-rose-500'
    }
]

const Testimonials = () => {
    const [activeIndex, setActiveIndex] = useState(0)
    const [isPaused, setIsPaused] = useState(false)

    const nextTestimonial = useCallback(() => {
        triggerHaptic('light')
        setActiveIndex((prev) => (prev + 1) % testimonials.length)
    }, [])

    const prevTestimonial = () => {
        triggerHaptic('light')
        setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
    }

    // Auto-rotate carousel
    useEffect(() => {
        if (isPaused) return

        const interval = setInterval(() => {
            nextTestimonial()
        }, 5000)

        return () => clearInterval(interval)
    }, [isPaused, nextTestimonial])

    return (
        <section
            id="testimonials"
            className="section-padding bg-charcoal relative overflow-hidden noise-bg"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
        >
            {/* Animated Background */}
            <AnimatedGradient colors={['gold', 'green']} className="opacity-30" />

            {/* Background Accents */}
            <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-brand-green/5 to-transparent pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-1/3 h-full bg-gradient-to-r from-gold/5 to-transparent pointer-events-none" />

            <div className="container mx-auto px-4 relative z-10">
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <span className="text-gold tracking-[0.3em] uppercase text-xs mb-4 block flex items-center justify-center gap-3">
                        <span className="w-8 h-[1px] bg-gold" />
                        Client Stories
                        <span className="w-8 h-[1px] bg-gold" />
                    </span>
                    <h2 className="text-4xl md:text-6xl font-[Oswald] font-bold italic uppercase">
                        Trusted by <span className="text-gold">500+</span> Happy Families
                    </h2>
                </motion.div>

                <div className="max-w-4xl mx-auto relative">
                    {/* Glassmorphism Card */}
                    <div className="glass p-8 md:p-12 relative shadow-2xl">
                        <Quote className="text-gold opacity-20 w-16 h-16 absolute top-8 left-8" />

                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeIndex}
                                initial={{ opacity: 0, x: 50 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -50 }}
                                transition={{ duration: 0.5, ease: [0.33, 1, 0.68, 1] }}
                                className="text-center pt-8"
                            >
                                {/* Abstract Avatar */}
                                <div className="flex justify-center mb-6">
                                    <div className={`w-20 h-20 rounded-full bg-gradient-to-br ${testimonials[activeIndex].avatarGradient} flex items-center justify-center text-white text-2xl font-bold font-[Oswald] shadow-lg animate-pulse-glow`}>
                                        {testimonials[activeIndex].name.split(' ').map(n => n[0]).join('')}
                                    </div>
                                </div>

                                {/* Stars */}
                                <div className="flex justify-center gap-1 mb-6">
                                    {[...Array(5)].map((_, i) => (
                                        <motion.div
                                            key={i}
                                            initial={{ opacity: 0, scale: 0 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{ delay: i * 0.1 }}
                                        >
                                            <Star
                                                size={18}
                                                className={i < testimonials[activeIndex].rating ? "fill-gold text-gold" : "text-white/20"}
                                            />
                                        </motion.div>
                                    ))}
                                </div>

                                {/* Quote */}
                                <p className="text-xl md:text-2xl font-light italic text-white/90 leading-relaxed mb-8">
                                    "{testimonials[activeIndex].text}"
                                </p>

                                {/* Name & Role */}
                                <div>
                                    <h4 className="text-gold font-bold text-lg font-[Oswald] uppercase tracking-wider">
                                        {testimonials[activeIndex].name}
                                    </h4>
                                    <p className="text-white/50 text-xs uppercase tracking-widest mt-1">
                                        {testimonials[activeIndex].role}
                                    </p>
                                </div>
                            </motion.div>
                        </AnimatePresence>

                        {/* Progress Indicator */}
                        <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10">
                            <motion.div
                                className="h-full bg-brand-green"
                                initial={{ width: "0%" }}
                                animate={{ width: "100%" }}
                                transition={{ duration: 5, ease: "linear" }}
                                key={activeIndex}
                            />
                        </div>
                    </div>

                    {/* Navigation Buttons */}
                    <div className="flex justify-center gap-4 mt-8">
                        <button
                            onClick={prevTestimonial}
                            className="p-3 glass hover:bg-brand-green/20 hover:border-brand-green transition-all duration-300 group"
                        >
                            <ChevronLeft size={20} className="group-hover:text-brand-green transition-colors" />
                        </button>

                        {/* Dots */}
                        <div className="flex items-center gap-2">
                            {testimonials.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => {
                                        triggerHaptic('light')
                                        setActiveIndex(index)
                                    }}
                                    className={`w-2 h-2 rounded-full transition-all duration-300 ${index === activeIndex
                                            ? 'bg-brand-green w-6'
                                            : 'bg-white/30 hover:bg-white/50'
                                        }`}
                                />
                            ))}
                        </div>

                        <button
                            onClick={nextTestimonial}
                            className="p-3 glass hover:bg-brand-green/20 hover:border-brand-green transition-all duration-300 group"
                        >
                            <ChevronRight size={20} className="group-hover:text-brand-green transition-colors" />
                        </button>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Testimonials

