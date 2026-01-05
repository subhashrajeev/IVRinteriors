import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ChevronDown } from 'lucide-react'
import { triggerHaptic } from '../utils/haptics'

// Text scramble characters
const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*'

// Geometric Triangle Pattern Component for Mobile
const GeometricBackground = () => (
    <div className="absolute inset-0 z-0 overflow-hidden">
        {/* Base gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-charcoal via-grey-surface to-charcoal" />

        {/* Triangular geometric shapes */}
        <svg className="absolute inset-0 w-full h-full opacity-20" preserveAspectRatio="xMidYMid slice">
            <defs>
                <linearGradient id="greenGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#8CBF3F" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#8CBF3F" stopOpacity="0" />
                </linearGradient>
                <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#D4AF37" stopOpacity="0.2" />
                    <stop offset="100%" stopColor="#D4AF37" stopOpacity="0" />
                </linearGradient>
            </defs>

            {/* Large triangles */}
            <polygon points="0,0 400,0 0,600" fill="url(#greenGrad)" />
            <polygon points="100%,100% 60%,100% 100%,40%" fill="url(#goldGrad)" />
            <polygon points="50%,0 80%,50% 20%,50%" fill="url(#greenGrad)" opacity="0.5" />

            {/* Medium triangles */}
            <polygon points="0,70% 30%,100% 0,100%" fill="url(#goldGrad)" opacity="0.6" />
            <polygon points="100%,0 100%,30% 70%,0" fill="url(#greenGrad)" opacity="0.4" />

            {/* Accent lines */}
            <line x1="0" y1="40%" x2="60%" y2="100%" stroke="#8CBF3F" strokeWidth="1" opacity="0.15" />
            <line x1="40%" y1="0" x2="100%" y2="60%" stroke="#D4AF37" strokeWidth="1" opacity="0.1" />
            <line x1="20%" y1="0" x2="80%" y2="100%" stroke="#8CBF3F" strokeWidth="0.5" opacity="0.2" />
        </svg>

        {/* Floating geometric accents */}
        <div className="absolute top-[15%] right-[10%] w-32 h-32 border border-brand-green/20 rotate-45" />
        <div className="absolute bottom-[25%] left-[5%] w-24 h-24 border border-gold/15 rotate-12" />
        <div className="absolute top-[60%] right-[20%] w-16 h-16 bg-brand-green/5 rotate-45" />

        {/* Gradient overlays for depth */}
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/60 to-charcoal/30" />
        <div className="absolute inset-0 bg-gradient-to-r from-charcoal/70 via-transparent to-transparent" />
    </div>
)

const Hero = () => {
    const heroRef = useRef<HTMLDivElement>(null)
    const contentRef = useRef<HTMLDivElement>(null)
    const [scrambledText, setScrambledText] = useState(['Transform', 'Your Space', 'Into Art.'])
    const [isMobile, setIsMobile] = useState(false)
    const originalText = ['Transform', 'Your Space', 'Into Art.']

    // Check if mobile on mount
    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768)
        checkMobile()
        window.addEventListener('resize', checkMobile)
        return () => window.removeEventListener('resize', checkMobile)
    }, [])

    // Text scramble effect
    useEffect(() => {
        const scrambleWord = (wordIndex: number, targetWord: string) => {
            let iteration = 0
            const interval = setInterval(() => {
                setScrambledText(prev => {
                    const newText = [...prev]
                    newText[wordIndex] = targetWord
                        .split('')
                        .map((_, index) => {
                            if (index < iteration) {
                                return targetWord[index]
                            }
                            return chars[Math.floor(Math.random() * chars.length)]
                        })
                        .join('')
                    return newText
                })

                if (iteration >= targetWord.length) {
                    clearInterval(interval)
                }
                iteration += 1 / 2
            }, 30)
        }

        // Stagger the scramble effect for each word
        setTimeout(() => scrambleWord(0, originalText[0]), 500)
        setTimeout(() => scrambleWord(1, originalText[1]), 800)
        setTimeout(() => scrambleWord(2, originalText[2]), 1100)
    }, [])

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline()

            gsap.set('.hero-word', { y: 100, opacity: 0 })
            gsap.set('.hero-subtitle', { opacity: 0, x: -20 })
            gsap.set('.hero-cta', { opacity: 0, y: 20 })

            tl.to('.hero-word', {
                y: 0,
                opacity: 1,
                duration: 1,
                stagger: 0.1,
                ease: "power4.out"
            })
                .to('.hero-subtitle', {
                    opacity: 1,
                    x: 0,
                    duration: 0.8,
                    ease: "power2.out"
                }, "-=0.5")
                .to('.hero-cta', {
                    opacity: 1,
                    y: 0,
                    duration: 0.6,
                    ease: "power2.out"
                }, "-=0.3")

        }, heroRef)

        return () => ctx.revert()
    }, [])

    const scrollToSection = (id: string) => {
        triggerHaptic('medium');
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    }

    return (
        <section ref={heroRef} className="relative h-screen w-full overflow-hidden bg-charcoal flex items-center noise-bg">
            {/* Light Rays Effect - Only on Desktop */}
            {!isMobile && (
                <div className="absolute inset-0 z-[2] pointer-events-none overflow-hidden">
                    <div
                        className="absolute top-0 left-1/4 w-[2px] h-[150%] bg-gradient-to-b from-brand-green/20 via-transparent to-transparent rotate-[15deg] origin-top animate-pulse-glow"
                        style={{ animationDelay: '0s' }}
                    />
                    <div
                        className="absolute top-0 left-1/2 w-[1px] h-[120%] bg-gradient-to-b from-white/10 via-transparent to-transparent rotate-[-10deg] origin-top animate-pulse-glow"
                        style={{ animationDelay: '1s' }}
                    />
                    <div
                        className="absolute top-0 right-1/4 w-[2px] h-[140%] bg-gradient-to-b from-brand-green/15 via-transparent to-transparent rotate-[8deg] origin-top animate-pulse-glow"
                        style={{ animationDelay: '2s' }}
                    />
                </div>
            )}

            {/* Background: Video for Desktop, Geometric Pattern for Mobile */}
            {isMobile ? (
                <GeometricBackground />
            ) : (
                <div className="absolute inset-0 z-0 overflow-hidden">
                    <video
                        autoPlay
                        muted
                        loop
                        playsInline
                        poster="/assets/IMG-20251203-WA0011.jpg"
                        preload="metadata"
                        className="w-full h-full object-cover opacity-40 scale-110 animate-ken-burns"
                        style={{ filter: 'grayscale(100%) contrast(1.2)' }}
                    >
                        <source src="/assets/WhatsApp Video 2025-12-02 at 10.28.21 PM.mp4" type="video/mp4" />
                    </video>
                    <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/60 to-charcoal/30" />
                    <div className="absolute inset-0 bg-gradient-to-r from-charcoal/50 via-transparent to-transparent" />
                </div>
            )}

            {/* Content - Left Aligned, Massive */}
            <div ref={contentRef} className="container mx-auto px-6 relative z-10 pt-20">
                <div className="max-w-5xl">
                    <p className="hero-subtitle text-brand-green font-bold tracking-[0.3em] uppercase mb-4 text-sm md:text-base flex items-center gap-3">
                        <span className="w-8 h-[2px] bg-brand-green" />
                        Hyderabad
                    </p>
                    <h1 className="text-4xl md:text-7xl lg:text-[8.5rem] leading-none font-[Oswald] font-bold italic uppercase text-white mb-4 md:mb-6 flex flex-col">
                        <span className="hero-word text-scramble mb-2 md:mb-3">{scrambledText[0]}</span>
                        <span className="hero-word text-transparent stroke-text text-scramble mb-2 md:mb-3" style={{ WebkitTextStroke: '2px white' }}>{scrambledText[1]}</span>
                        <span className="hero-word text-scramble">{scrambledText[2]}</span>
                    </h1>

                    <div className="hero-subtitle pl-4 border-l-4 border-brand-green max-w-2xl">
                        <p
                            className="text-xl md:text-2xl lg:text-3xl leading-relaxed tracking-wide"
                            style={{
                                fontFamily: "'Cormorant Garamond', serif",
                                fontWeight: 500,
                                fontStyle: 'italic',
                                background: 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.75) 50%, rgba(140,191,63,0.9) 100%)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                backgroundClip: 'text',
                                letterSpacing: '0.03em',
                                lineHeight: 1.6,
                            }}
                        >
                            Premium Modular Kitchens, Wardrobes & Complete Interior Solutions. 15+ Years of Precision Craftsmanship.
                        </p>
                    </div>

                    <div className="hero-cta mt-6 md:mt-8 flex flex-col md:flex-row gap-4">
                        <button onClick={() => scrollToSection('projects')} className="btn-primary magnetic-btn group">
                            <span className="relative z-10 flex items-center gap-2">
                                View Portfolio
                                <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </span>
                        </button>
                        <button onClick={() => scrollToSection('contact')} className="btn-outline magnetic-btn">
                            <span className="relative z-10">Get In Touch</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Scroll Indicator */}
            <button
                onClick={() => scrollToSection('projects')}
                className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 text-white/50 hover:text-brand-green transition-colors hidden md:flex flex-col items-center gap-2 group"
            >
                <span className="text-[10px] uppercase tracking-[0.3em] font-bold">Scroll</span>
                <ChevronDown size={24} className="animate-bounce group-hover:text-brand-green" />
            </button>

            {/* Bottom Gradient Fade */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-charcoal to-transparent z-[5] pointer-events-none" />
        </section>
    )
}

export default Hero

