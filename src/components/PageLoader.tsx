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

        // Elegant fade in
        tl.fromTo('.loader-content',
            { opacity: 0, y: 10 },
            { opacity: 1, y: 0, duration: 1, ease: "power2.out" }
        )
            .to({}, { duration: 1.5 }) // Hold
            .to('.loader-content', {
                opacity: 0,
                y: -10,
                duration: 0.5,
                ease: "power2.in"
            })
            // Simple fade out of background
            .to('.loader-bg', {
                opacity: 0,
                duration: 0.8,
                ease: "power2.inOut"
            })

        return () => clearInterval(progressInterval)
    }, [onComplete])

    return (
        <AnimatePresence>
            {!isFinished && (
                <motion.div
                    className="fixed inset-0 z-[10000] flex items-center justify-center pointer-events-none"
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    {/* Background */}
                    <div className="loader-bg absolute inset-0 bg-anthropic-beige" />

                    {/* Content */}
                    <div className="loader-content relative z-10 flex flex-col items-center">
                        <div className="flex flex-col items-center mb-8">
                            <h1 className="text-4xl md:text-5xl font-serif text-anthropic-text font-bold tracking-tight mb-2">
                                IVR
                            </h1>
                            <p className="text-anthropic-secondary text-[10px] uppercase tracking-[0.3em] font-bold">
                                Interiors
                            </p>
                        </div>

                        {/* Minimal Progress Bar */}
                        <div className="w-32 h-[1px] bg-anthropic-stone overflow-hidden relative">
                            <motion.div
                                className="absolute top-0 left-0 h-full bg-anthropic-accent"
                                style={{ width: `${progress}%` }}
                                transition={{ duration: 0.1 }}
                            />
                        </div>

                        <div className="mt-2 text-anthropic-secondary text-[10px] font-mono tracking-widest opacity-60">
                            {Math.round(progress)}%
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}

export default PageLoader

