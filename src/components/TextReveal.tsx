import { useEffect, useRef, type ReactNode } from 'react'
import { motion, useInView, useAnimation } from 'framer-motion'

interface TextRevealProps {
    children: ReactNode
    className?: string
    delay?: number
    staggerDelay?: number
    once?: boolean
}

const TextReveal = ({
    children,
    className = '',
    delay = 0,
    staggerDelay = 0.05,
    once = true
}: TextRevealProps) => {
    const ref = useRef<HTMLDivElement>(null)
    const isInView = useInView(ref, { once, amount: 0.5 })
    const controls = useAnimation()

    useEffect(() => {
        if (isInView) {
            controls.start('visible')
        }
    }, [isInView, controls])

    // Split children into words if it's a string
    const text = typeof children === 'string' ? children : ''
    const words = text.split(' ')

    if (typeof children !== 'string') {
        return (
            <motion.div
                ref={ref}
                className={className}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay, ease: [0.33, 1, 0.68, 1] }}
            >
                {children}
            </motion.div>
        )
    }

    return (
        <motion.div
            ref={ref}
            className={`${className} overflow-hidden`}
            initial="hidden"
            animate={controls}
        >
            {words.map((word, wordIndex) => (
                <span key={wordIndex} className="inline-block overflow-hidden mr-[0.25em]">
                    <motion.span
                        className="inline-block"
                        variants={{
                            hidden: { y: '100%', opacity: 0 },
                            visible: {
                                y: 0,
                                opacity: 1,
                                transition: {
                                    duration: 0.6,
                                    delay: delay + wordIndex * staggerDelay,
                                    ease: [0.33, 1, 0.68, 1]
                                }
                            }
                        }}
                    >
                        {word}
                    </motion.span>
                </span>
            ))}
        </motion.div>
    )
}

export default TextReveal
