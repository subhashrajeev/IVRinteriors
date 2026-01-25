import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ChevronDown } from 'lucide-react'
import { motion, useSpring, useTransform, useMotionValue } from 'framer-motion'
import { triggerHaptic } from '../utils/haptics'

// Hanging Image Component with Physics
const HangingImage = ({ src, alt, className, delay = 0, angle = 5 }: { src: string, alt: string, className?: string, delay?: number, angle?: number }) => {
    const x = useMotionValue(0)
    const y = useMotionValue(0)
    const rotateX = useTransform(y, [-100, 100], [30, -30])
    const rotateY = useTransform(x, [-100, 100], [-30, 30])

    // Physics-based spring for natural Sway
    const springConfig = { damping: 15, stiffness: 150, mass: 1 }
    const rotationSpring = useSpring(useMotionValue(angle), springConfig)

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect()
        const width = rect.width
        const height = rect.height
        const mouseX = e.clientX - rect.left
        const mouseY = e.clientY - rect.top

        const xPct = mouseX / width - 0.5
        const yPct = mouseY / height - 0.5

        x.set(xPct * 100)
        y.set(yPct * 100)
    }

    const handleMouseLeave = () => {
        x.set(0)
        y.set(0)
        rotationSpring.set(angle) // Return to resting angle
    }

    const handleMouseEnter = () => {
        triggerHaptic('light')
        rotationSpring.set(0) // Swing to center on hover
    }

    return (
        <motion.div
            className={`absolute z-20 hidden lg:block ${className}`}
            initial={{ opacity: 0, y: -100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, delay: delay, type: "spring", bounce: 0.4 }}
            style={{
                perspective: 1000,
                transformOrigin: "top center"
            }}
        >
            {/* The String/Wire */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-full w-[1px] h-32 bg-anthropic-stone/50" />

            {/* The Hanging Container */}
            <motion.div
                style={{
                    rotate: rotationSpring,
                    transformOrigin: "top center",
                }}
                onMouseMove={handleMouseMove}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                className="relative group cursor-pointer"
                animate={{
                    rotate: [angle, -angle, angle],
                }}
                transition={{
                    rotate: {
                        duration: 6 + Math.random() * 2,
                        repeat: Infinity,
                        repeatType: "reverse",
                        ease: "easeInOut"
                    }
                }}
            >
                {/* Clipboard Clip */}
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-12 h-4 bg-gradient-to-b from-anthropic-stone to-white rounded-sm shadow-sm z-30" />
                <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-4 h-6 border-2 border-anthropic-stone rounded-t-full z-20" />

                {/* Photo Frame (Clipboard Style) */}
                <motion.div
                    className="relative bg-white p-3 pb-8 shadow-xl shadow-black/5 w-64 h-80 rotate-1 border border-anthropic-stone/20"
                    style={{
                        rotateX: rotateX,
                        rotateY: rotateY,
                    }}
                    whileHover={{ scale: 1.05 }}
                >
                    <div className="w-full h-full overflow-hidden bg-anthropic-beige relative">
                        <img
                            src={src}
                            alt={alt}
                            className="w-full h-full object-cover filter sepia-[0.1] contrast-[0.95] group-hover:sepia-0 group-hover:contrast-100 transition-all duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                </motion.div>
            </motion.div>
        </motion.div>
    )
}

const Hero = () => {
    const heroRef = useRef<HTMLDivElement>(null)
    const contentRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({ defaults: { ease: "power3.out" } })

            gsap.set('.hero-logo', { opacity: 0, y: 20 })
            gsap.set('.hero-line', { y: 30, opacity: 0 })
            gsap.set('.hero-subtitle', { opacity: 0, y: 10 })
            gsap.set('.hero-cta', { opacity: 0, y: 10 })

            tl.to('.hero-logo', {
                opacity: 1,
                y: 0,
                duration: 1,
            })
                .to('.hero-line', {
                    y: 0,
                    opacity: 1,
                    duration: 1.2,
                    stagger: 0.15,
                }, "-=0.5")
                .to('.hero-subtitle', {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                }, "-=0.8")
                .to('.hero-cta', {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                }, "-=0.6")

        }, heroRef)

        return () => ctx.revert()
    }, [])

    const scrollToSection = (id: string) => {
        triggerHaptic('medium');
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    }

    return (
        <section ref={heroRef} className="relative min-h-screen w-full overflow-hidden bg-anthropic-beige flex items-center justify-center pt-20">
            {/* Subtle Background Grain/Texture is handled by global noise-bg if applied, or we can add a specific one here */}

            {/* Soft Ambient Gradients */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-[-20%] right-[-10%] w-[800px] h-[800px] rounded-full bg-gradient-to-br from-anthropic-accent/5 to-transparent blur-3xl opacity-60" />
                <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] rounded-full bg-gradient-to-tr from-anthropic-secondary/5 to-transparent blur-3xl opacity-40" />
            </div>

            {/* Hanging Images */}
            <HangingImage
                src="/assets/IMG-20251203-WA0020.jpg"
                alt="Signature Console"
                className="left-[5%] top-[15%]"
                delay={0.5}
                angle={2}
            />
            <HangingImage
                src="/assets/IMG-20251203-WA0012.jpg"
                alt="Botanical Arches"
                className="right-[5%] top-[20%]"
                delay={0.8}
                angle={-3}
            />

            <div ref={contentRef} className="container mx-auto px-6 relative z-10 text-center flex flex-col items-center">

                <img
                    src="/ivr-logo.png"
                    alt="IVR Interiors Logo"
                    className="hero-logo w-48 md:w-64 mb-10 opacity-0"
                />

                <h1 className="text-5xl md:text-7xl lg:text-8xl leading-[1.1] font-serif font-medium text-anthropic-text mb-8 tracking-tight">
                    <span className="hero-line block">Transform your space</span>
                    <span className="hero-line block italic text-anthropic-accent">into a work of art.</span>
                </h1>

                <div className="hero-subtitle max-w-2xl mx-auto mb-12">
                    <p className="text-lg md:text-xl text-anthropic-secondary font-sans leading-relaxed text-balance">
                        Premium modular kitchens, wardrobes & complete interior solutions.
                        Bringing 15+ years of precision craftsmanship to your home.
                    </p>
                </div>

                <div className="hero-cta flex flex-col md:flex-row gap-5 items-center justify-center">
                    <button
                        onClick={() => scrollToSection('projects')}
                        className="btn-primary rounded-full px-8 py-4 text-sm tracking-wide"
                        aria-label="View our portfolio"
                    >
                        View Portfolio
                    </button>
                    <button
                        onClick={() => scrollToSection('contact')}
                        className="btn-outline rounded-full px-8 py-4 text-sm tracking-wide border-anthropic-stone"
                        aria-label="Get in touch with us"
                    >
                        Get In Touch
                    </button>
                </div>
            </div>

            {/* Scroll Indicator */}
            <button
                onClick={() => scrollToSection('projects')}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 text-anthropic-secondary/70 hover:text-anthropic-accent transition-all duration-300 flex flex-col items-center gap-2 group cursor-pointer"
                aria-label="Scroll down"
            >
                <span className="text-[10px] uppercase tracking-[0.4em] font-bold opacity-40 group-hover:opacity-100 transition-opacity">Scroll</span>
                <ChevronDown size={40} className="animate-pulse-glow group-hover:translate-y-2 transition-transform opacity-60 group-hover:opacity-100" />
            </button>
        </section>
    )
}

export default Hero

