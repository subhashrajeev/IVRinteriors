import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ChevronDown } from 'lucide-react'
import { triggerHaptic } from '../utils/haptics'
import AnimatedGradient from './AnimatedGradient'

// Text scramble characters
const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*'

const Hero = () => {
    const heroRef = useRef<HTMLDivElement>(null)
    const contentRef = useRef<HTMLDivElement>(null)
    const [scrambledText, setScrambledText] = useState(['Transform', 'Your Space', 'Into Art.'])
    const originalText = ['Transform', 'Your Space', 'Into Art.']

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
            {/* Animated Gradient Orbs */}
            <AnimatedGradient colors={['green', 'gold']} className="z-[1]" />

            {/* Light Rays Effect */}
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

            {/* Background Video - Ken Burns Effect */}
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

            {/* Content - Left Aligned, Massive */}
            <div ref={contentRef} className="container mx-auto px-6 relative z-10 pt-20">
                <div className="max-w-5xl">
                    <p className="hero-subtitle text-brand-green font-bold tracking-[0.3em] uppercase mb-4 text-sm md:text-base flex items-center gap-3">
                        <span className="w-8 h-[2px] bg-brand-green" />
                        Hyderabad
                    </p>
                    <h1 className="text-4xl md:text-7xl lg:text-[8.5rem] leading-[0.9] font-[Oswald] font-bold italic uppercase text-white mb-8">
                        <span className="hero-word block text-scramble">{scrambledText[0]}</span>
                        <span className="hero-word block text-transparent stroke-text text-scramble" style={{ WebkitTextStroke: '2px white' }}>{scrambledText[1]}</span>
                        <span className="hero-word block text-scramble">{scrambledText[2]}</span>
                    </h1>

                    <div className="hero-subtitle pl-2 border-l-4 border-brand-green max-w-xl">
                        <p className="font-['Tenor_Sans'] text-xl md:text-2xl text-white/80 leading-relaxed tracking-[0.15em] uppercase">
                            Premium modular kitchens, wardrobes & complete interior solutions. 15+ years of precision craftsmanship.
                        </p>
                    </div>

                    <div className="hero-cta mt-12 flex flex-col md:flex-row gap-6">
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

