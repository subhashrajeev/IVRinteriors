import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { gsap } from 'gsap'

const PageLoader = ({ onComplete }: { onComplete: () => void }) => {
    const [isFinished, setIsFinished] = useState(false)

    useEffect(() => {
        const tl = gsap.timeline({
            onComplete: () => {
                setTimeout(() => {
                    setIsFinished(true)
                    onComplete()
                }, 500)
            }
        })

        tl.fromTo('.loader-char',
            { y: 100, opacity: 0, rotateX: -90 },
            { y: 0, opacity: 1, rotateX: 0, duration: 0.8, stagger: 0.1, ease: "power4.out" }
        )
            .to('.loader-char', {
                y: -100,
                opacity: 0,
                duration: 0.8,
                stagger: 0.05,
                ease: "power4.in",
                delay: 1
            })
            .to('.loader-bg', {
                height: 0,
                duration: 1,
                ease: "expo.inOut"
            })
    }, [onComplete])

    return (
        <AnimatePresence>
            {!isFinished && (
                <motion.div
                    className="loader-bg fixed inset-0 z-[10000] bg-charcoal flex items-center justify-center overflow-hidden"
                    exit={{ opacity: 0 }}
                >
                    <div className="flex gap-2">
                        {['I', 'V', 'R'].map((char, index) => (
                            <span
                                key={index}
                                className="loader-char text-6xl md:text-9xl font-bold font-[Oswald] italic text-brand-green inline-block"
                                style={{ perspective: '1000px' }}
                            >
                                {char}
                            </span>
                        ))}
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}

export default PageLoader
