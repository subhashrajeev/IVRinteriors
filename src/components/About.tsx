import { motion } from 'framer-motion'
import { useState } from 'react'

const About = () => {
    const [isInView, setIsInView] = useState(false)

    return (
        <section id="about" className="py-32 bg-charcoal border-b border-white/5 relative overflow-hidden">
            <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-20 items-center">
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1 }}
                    className="lg:col-span-7"
                >
                    <span className="text-gold font-bold tracking-[0.3em] uppercase text-xs mb-8 block">Who We Are</span>
                    <h2 className="text-5xl md:text-7xl font-[Oswald] font-bold uppercase italic text-white mb-10 leading-[0.9]">
                        Crafting <br /> <span className="text-gold">Legacy.</span>
                    </h2>
                    <p className="text-white/60 text-lg font-light leading-relaxed mb-12">
                        Founded by <span className="text-gold text-3xl font-bold mx-2" style={{ fontFamily: "'Great Vibes', cursive" }}>I. Venkataraju</span>, IVR Interiors has been a cornerstone of design excellence in Hyderabad for over 15 years. We merge the raw strength of industrial aesthetics with the warmth of organic luxury, curating spaces that are not just lived in, but felt.
                    </p>

                    <div className="flex flex-wrap gap-8 md:gap-12 border-t border-white/10 pt-8 items-end">
                        <div>
                            <h4 className="text-gold text-5xl font-[Oswald] font-bold italic mb-0">500+</h4>
                            <p className="text-[10px] uppercase tracking-widest text-white/40 mt-2 font-bold">Clients</p>
                        </div>
                        <div>
                            <h4 className="text-gold text-5xl font-[Oswald] font-bold italic mb-0">15+</h4>
                            <p className="text-[10px] uppercase tracking-widest text-white/40 mt-2 font-bold">Years</p>
                        </div>

                        <div className="ml-auto text-right w-full md:w-auto mt-4 md:mt-0">
                            <div className="flex items-center justify-end gap-4 md:block">
                                <div className="text-right md:mb-2">
                                    <span
                                        className="text-gold text-xl block"
                                        style={{ fontFamily: "'Great Vibes', cursive" }}
                                    >
                                        I. Venkataraju
                                    </span>
                                    <p className="text-white/40 text-[9px] uppercase tracking-[0.2em] font-bold">
                                        Founder
                                    </p>
                                </div>
                                <div className="w-16 h-20 md:w-24 md:h-32 overflow-hidden border border-white/10 flex-shrink-0">
                                    <img
                                        src="/assets/ceo_latest.jpg"
                                        alt="Founder"
                                        loading="lazy"
                                        className={`w-full h-full object-cover transition-all duration-700 ${isInView ? 'grayscale-0' : 'grayscale'} md:grayscale md:hover:grayscale-0`}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, margin: "-50px" }}
                    onViewportEnter={() => setIsInView(true)}
                    transition={{ duration: 0.8 }}
                    className="relative lg:col-span-5"
                >
                    <div className="aspect-[3/4] overflow-hidden">
                        <img
                            src="/assets/IMG-20251203-WA0011.jpg"
                            alt="Philosophy"
                            loading="lazy"
                            className={`w-full h-full object-cover transition-all duration-700 ${isInView ? 'grayscale-0' : 'grayscale'} md:grayscale md:hover:grayscale-0`}
                        />
                    </div>
                    {/* Accent Box - Integrated */}
                    <div className="absolute top-3 left-3 w-full h-full border border-gold/30 pointer-events-none -z-10" />
                </motion.div>
            </div>
        </section>
    )
}

export default About
