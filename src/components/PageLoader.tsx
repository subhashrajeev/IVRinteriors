import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { gsap } from 'gsap'

const PageLoader = ({ onComplete }: { onComplete: () => void }) => {
    const [isFinished, setIsFinished] = useState(false)
    const [progress, setProgress] = useState(0)

    useEffect(() => {
        // Progress counter animation
        const progressInterval = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) {
                    clearInterval(progressInterval)
                    return 100
                }
                // Non-linear progress for more realistic feel
                const increment = prev < 30 ? 3 : prev < 70 ? 2 : prev < 90 ? 1 : 0.5
                return Math.min(prev + increment, 100)
            })
        }, 30)

        const tl = gsap.timeline({
            onComplete: () => {
                setProgress(100)
                setTimeout(() => {
                    setIsFinished(true)
                    onComplete()
                }, 300)
            }
        })

        // Logo entrance animation
        tl.fromTo('.loader-char',
            { y: 100, opacity: 0, rotateX: -90 },
            { y: 0, opacity: 1, rotateX: 0, duration: 0.8, stagger: 0.1, ease: "power4.out" }
        )
            // Tagline reveal
            .fromTo('.loader-tagline',
                { width: 0, opacity: 0 },
                { width: 'auto', opacity: 1, duration: 0.6, ease: "power2.out" },
                "-=0.3"
            )
            // Hold for a moment
            .to({}, { duration: 0.8 })
            // Exit animation
            .to('.loader-char', {
                y: -100,
                opacity: 0,
                duration: 0.6,
                stagger: 0.05,
                ease: "power4.in"
            })
            .to('.loader-tagline', {
                opacity: 0,
                y: -20,
                duration: 0.3
            }, "-=0.5")
            // Curtain reveal (split from center)
            .to('.loader-curtain-top', {
                yPercent: -100,
                duration: 1,
                ease: "expo.inOut"
            })
            .to('.loader-curtain-bottom', {
                yPercent: 100,
                duration: 1,
                ease: "expo.inOut"
            }, "<")

        return () => clearInterval(progressInterval)
    }, [onComplete])

    return (
        <AnimatePresence>
            {!isFinished && (
                <motion.div
                    className="fixed inset-0 z-[10000] overflow-hidden"
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                >
                    {/* Top Curtain */}
                    <div className="loader-curtain-top absolute top-0 left-0 right-0 h-1/2 bg-charcoal z-10" />

                    {/* Bottom Curtain */}
                    <div className="loader-curtain-bottom absolute bottom-0 left-0 right-0 h-1/2 bg-charcoal z-10" />

                    {/* Content Layer */}
                    <div className="absolute inset-0 bg-charcoal flex flex-col items-center justify-center z-20">
                        {/* Animated Background Glow */}
                        <div className="absolute inset-0 overflow-hidden">
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-brand-green/10 rounded-full blur-[150px] animate-pulse-glow" />
                        </div>

                        {/* Logo */}
                        <div className="relative z-10">
                            <div className="flex gap-2 md:gap-4">
                                {['I', 'V', 'R'].map((char, index) => (
                                    <span
                                        key={index}
                                        className="loader-char text-6xl md:text-[10rem] font-bold font-[Oswald] italic text-brand-green inline-block"
                                        style={{ perspective: '1000px' }}
                                    >
                                        {char}
                                    </span>
                                ))}
                            </div>

                            {/* Tagline */}
                            <div className="loader-tagline overflow-hidden mt-4 text-center">
                                <p className="text-white/50 text-sm md:text-base uppercase tracking-[0.4em] font-bold">
                                    Interiors
                                </p>
                            </div>
                        </div>

                        {/* Progress Bar & Counter */}
                        <div className="absolute bottom-20 left-1/2 -translate-x-1/2 w-48 md:w-64">
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-white/30 text-[10px] uppercase tracking-widest font-bold">Loading</span>
                                <span className="text-brand-green text-sm font-bold font-[Oswald]">{Math.round(progress)}%</span>
                            </div>
                            <div className="h-[2px] bg-white/10 overflow-hidden">
                                <motion.div
                                    className="h-full bg-brand-green"
                                    style={{ width: `${progress}%` }}
                                    transition={{ duration: 0.1 }}
                                />
                            </div>
                        </div>

                        {/* Corner Accents */}
                        <div className="absolute top-8 left-8 w-16 h-16 border-l-2 border-t-2 border-white/10" />
                        <div className="absolute top-8 right-8 w-16 h-16 border-r-2 border-t-2 border-white/10" />
                        <div className="absolute bottom-8 left-8 w-16 h-16 border-l-2 border-b-2 border-white/10" />
                        <div className="absolute bottom-8 right-8 w-16 h-16 border-r-2 border-b-2 border-white/10" />
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}

export default PageLoader

