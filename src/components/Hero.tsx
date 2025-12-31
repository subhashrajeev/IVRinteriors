import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ChevronDown } from 'lucide-react'
import { triggerHaptic } from '../utils/haptics'

const Hero = () => {
    const heroRef = useRef<HTMLDivElement>(null)
    const contentRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline()

            gsap.set('.hero-word', { y: 100, opacity: 0 })
            gsap.set('.hero-subtitle', { opacity: 0, x: -20 })

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

        }, heroRef)

        return () => ctx.revert()
    }, [])

    const scrollToSection = (id: string) => {
        triggerHaptic('medium');
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    }

    return (
        <section ref={heroRef} className="relative h-screen w-full overflow-hidden bg-charcoal flex items-center">
            {/* Background Video - Darkened for Text Pop */}
            <div className="absolute inset-0 z-0">
                <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="w-full h-full object-cover opacity-40"
                    style={{ filter: 'grayscale(100%) contrast(1.2)' }}
                >
                    <source src="/assets/WhatsApp Video 2025-12-02 at 10.28.21 PM.mp4" type="video/mp4" />
                </video>
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/50 to-transparent" />
            </div>

            {/* Content - Left Aligned, Massive */}
            <div ref={contentRef} className="container mx-auto px-6 relative z-10 pt-20">
                <div className="max-w-5xl">
                    <p className="hero-subtitle text-brand-green font-bold tracking-[0.3em] uppercase mb-4 text-sm md:text-base">
                        Hyderabad
                    </p>
                    <h1 className="text-4xl md:text-7xl lg:text-[8.5rem] leading-[0.9] font-[Oswald] font-bold italic uppercase text-white mb-8">
                        <span className="hero-word block">Transform</span>
                        <span className="hero-word block text-transparent stroke-text" style={{ WebkitTextStroke: '2px white' }}>Your Space</span>
                        <span className="hero-word block">Into Art.</span>
                    </h1>

                    <div className="hero-subtitle pl-2 border-l-4 border-brand-green max-w-xl">
                        <p className="text-white/80 text-lg md:text-xl font-light leading-relaxed">
                            Premium modular kitchens, wardrobes & complete interior solutions. 15+ years of precision craftsmanship.
                        </p>
                    </div>

                    <div className="mt-12 flex flex-col md:flex-row gap-6">
                        <button onClick={() => scrollToSection('projects')} className="btn-primary">
                            View Portfolio
                        </button>
                    </div>
                </div>
            </div>

            {/* Scroll Indicator */}
            <button
                onClick={() => scrollToSection('about')}
                className="absolute bottom-12 right-12 z-20 text-white animate-bounce hidden md:block"
            >
                <ChevronDown size={32} />
            </button>
        </section>
    )
}

export default Hero
