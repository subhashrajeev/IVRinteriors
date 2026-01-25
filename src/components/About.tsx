import { motion, useScroll, useTransform } from 'framer-motion'
import { useState, useRef, useEffect } from 'react'
import CounterAnimation from './CounterAnimation'

const About = () => {
    const [isMobile, setIsMobile] = useState(false)
    const sectionRef = useRef<HTMLElement>(null)
    const imageRef = useRef<HTMLDivElement>(null)

    // Check if mobile on mount
    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768)
        checkMobile()
        window.addEventListener('resize', checkMobile)
        return () => window.removeEventListener('resize', checkMobile)
    }, [])

    // Parallax effect for the image - only on desktop
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"]
    })

    // Disable parallax on mobile for performance
    const imageY = useTransform(scrollYProgress, [0, 1], isMobile ? [0, 0] : [30, -30])

    return (
        <section ref={sectionRef} id="about" className="py-20 bg-anthropic-beige border-b border-anthropic-stone relative overflow-hidden">
            <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
                <motion.div
                    initial={{ opacity: 0, x: isMobile ? 0 : -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="lg:col-span-7"
                >
                    <span className="text-anthropic-accent font-bold tracking-[0.2em] uppercase text-xs mb-6 block flex items-center gap-3">
                        <span className="w-6 h-[1px] bg-anthropic-accent" />
                        Who We Are
                    </span>

                    {/* Heading with CEO beside it */}
                    <div className="flex flex-col md:flex-row md:items-end md:gap-8 mb-10">
                        <h2 className="text-5xl md:text-6xl font-serif text-anthropic-text leading-tight">
                            Crafting <span className="italic text-anthropic-secondary">Legacy.</span>
                        </h2>
                    </div>

                    <div className="flex flex-col-reverse md:flex-row gap-8 md:gap-12 mb-10">
                        <div className="flex-1">
                            <p className="text-anthropic-secondary text-lg leading-relaxed mb-8">
                                With over 15 years of design excellence in Hyderabad, IVR Interiors merges the raw strength of industrial aesthetics with the warmth of organic luxury, curating spaces that are not just lived in, but felt.
                            </p>

                            <div className="flex flex-wrap gap-8 md:gap-12 border-t border-anthropic-stone pt-8">
                                <div className="group">
                                    <h4 className="text-anthropic-accent text-4xl font-serif mb-0">
                                        <CounterAnimation end={500} suffix="+" duration={2500} />
                                    </h4>
                                    <p className="text-xs uppercase tracking-wider text-anthropic-text/60 mt-1">Happy Clients</p>
                                </div>
                                <div className="group">
                                    <h4 className="text-anthropic-accent text-4xl font-serif mb-0">
                                        <CounterAnimation end={15} suffix="+" duration={2000} />
                                    </h4>
                                    <p className="text-xs uppercase tracking-wider text-anthropic-text/60 mt-1">Years Excellence</p>
                                </div>
                                <div className="group">
                                    <h4 className="text-anthropic-accent text-4xl font-serif mb-0">
                                        <CounterAnimation end={1000} suffix="+" duration={3000} />
                                    </h4>
                                    <p className="text-xs uppercase tracking-wider text-anthropic-text/60 mt-1">Projects Done</p>
                                </div>
                            </div>
                        </div>

                        {/* Team Grid - Clean & Minimal */}
                        <div className="flex-shrink-0 flex gap-6 overflow-x-auto pb-4 md:pb-0 scrollbar-hide snap-x">
                            {[
                                {
                                    name: "I. Venkataraju",
                                    role: "Founder",
                                    image: "/assets/ceo_latest.jpg"
                                },
                                {
                                    name: "Haneesha",
                                    role: "Digital Strategy",
                                    image: "/assets/social_media_manager.jpg"
                                },
                                {
                                    name: "Rajeev",
                                    role: "Creative Copy",
                                    image: "/assets/content_writer.jpg"
                                }
                            ].map((member, index) => (
                                <div key={index} className="relative group snap-center">
                                    <div className="w-32 h-40 md:w-40 md:h-48 bg-white border border-anthropic-stone p-2 shadow-sm transform transition-transform duration-500 group-hover:-translate-y-1">
                                        <div className="w-full h-full overflow-hidden bg-anthropic-stone/10 relative">
                                            <div className="absolute inset-0 bg-anthropic-stone/20 z-10 group-hover:bg-transparent transition-colors duration-500" />
                                            <img
                                                src={member.image}
                                                alt={member.name}
                                                loading="lazy"
                                                className={`w-full h-full object-cover transition-all duration-700 grayscale group-hover:grayscale-0 scale-100 group-hover:scale-110`}
                                            />
                                        </div>
                                    </div>

                                    <div className="mt-3 text-center md:text-left">
                                        <span
                                            className="text-anthropic-text text-lg md:text-xl font-serif block leading-tight mb-1"
                                        >
                                            {member.name}
                                        </span>
                                        <p className="text-anthropic-secondary text-[10px] uppercase tracking-widest font-bold">
                                            {member.role}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </motion.div>

                <motion.div
                    ref={imageRef}
                    initial={{ opacity: 0, scale: isMobile ? 1 : 0.98 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.6 }}
                    className="relative lg:col-span-5"
                >
                    <div className="aspect-[3/4] overflow-hidden rounded-lg shadow-xl">
                        {isMobile ? (
                            <img
                                src="/assets/IMG-20251203-WA0011.jpg"
                                alt="Philosophy"
                                loading="lazy"
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <motion.img
                                src="/assets/IMG-20251203-WA0011.jpg"
                                alt="Philosophy"
                                loading="lazy"
                                style={{ y: imageY }}
                                className={`w-full h-[115%] object-cover transition-all duration-700 grayscale hover:grayscale-0 parallax-image`}
                                aria-label="Our philosophy illustration"
                            />
                        )}
                    </div>
                    {/* Accent Box - Integrated */}
                    <div className="absolute top-4 -right-4 w-full h-full border border-anthropic-stone/50 rounded-lg pointer-events-none -z-10" />
                </motion.div>
            </div>
        </section>
    )
}

export default About

