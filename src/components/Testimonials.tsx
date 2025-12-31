import { motion } from 'framer-motion'
import { useState } from 'react'
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react'

const testimonials = [
    {
        id: 1,
        name: 'Vikram Reddy',
        role: 'Apartment Owner, Hitech City',
        text: "The team's attention to detail is unmatched. From the initial consultation to the final handover, the execution was flawless. They truly transformed our apartment into a sanctuary.",
        rating: 5
    },
    {
        id: 2,
        name: 'Anjali Rao',
        role: 'Villa Owner, Gachibowli',
        text: "I was looking for something unique for my modular kitchen, and IVR Interiors delivered beyond expectations. The quality of materials and the speed of delivery were impressive.",
        rating: 4
    },
    {
        id: 3,
        name: 'Rajesh Kumar',
        role: 'Commercial Space, Jubilee Hills',
        text: "We needed a modern yet functional office space. The design team nailed the brief perfectly, balancing aesthetics with productivity. Highly recommended for premium interiors.",
        rating: 5
    }
]

const Testimonials = () => {
    const [activeIndex, setActiveIndex] = useState(0)

    const nextTestimonial = () => {
        setActiveIndex((prev) => (prev + 1) % testimonials.length)
    }

    const prevTestimonial = () => {
        setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
    }

    return (
        <section id="testimonials" className="section-padding bg-black relative overflow-hidden">
            {/* Background Accents */}
            <div className="absolute top-0 right-0 w-1/3 h-full bg-[#4A3728] opacity-10 blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-1/3 h-full bg-gold opacity-5 blur-3xl pointer-events-none" />

            <div className="container mx-auto px-4 relative z-10">
                <div className="text-center mb-16">
                    <span className="text-gold tracking-[0.3em] uppercase text-xs mb-4 block">Client Stories</span>
                    <h2 className="text-4xl md:text-5xl">Trusted by 500+ Happy Families</h2>
                </div>

                <div className="max-w-4xl mx-auto relative">
                    <div className="bg-[#1a1a1a] border border-white/5 p-8 md:p-12 rounded-sm relative shadow-2xl">
                        <Quote className="text-gold opacity-20 w-16 h-16 absolute top-8 left-8" />

                        <motion.div
                            key={activeIndex}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.5 }}
                            className="text-center pt-8"
                        >
                            <div className="flex justify-center gap-1 mb-6">
                                {[...Array(5)].map((_, i) => (
                                    <Star
                                        key={i}
                                        size={16}
                                        className={i < testimonials[activeIndex].rating ? "fill-gold text-gold" : "text-white/20"}
                                    />
                                ))}
                            </div>
                            <p className="text-xl md:text-2xl font-light italic text-white/90 leading-relaxed mb-8">
                                "{testimonials[activeIndex].text}"
                            </p>
                            <div>
                                <h4 className="text-gold font-bold text-lg">{testimonials[activeIndex].name}</h4>
                                <p className="text-white/50 text-xs uppercase tracking-widest mt-1">{testimonials[activeIndex].role}</p>
                            </div>
                        </motion.div>
                    </div>

                    {/* Navigation Buttons */}
                    <div className="flex justify-center gap-4 mt-8">
                        <button
                            onClick={prevTestimonial}
                            className="p-3 border border-white/10 hover:border-gold hover:text-gold transition-all duration-300 rounded-full"
                        >
                            <ChevronLeft size={20} />
                        </button>
                        <button
                            onClick={nextTestimonial}
                            className="p-3 border border-white/10 hover:border-gold hover:text-gold transition-all duration-300 rounded-full"
                        >
                            <ChevronRight size={20} />
                        </button>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Testimonials
