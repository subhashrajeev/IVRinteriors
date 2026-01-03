import { useEffect, useRef, useState } from 'react'

interface CounterAnimationProps {
    end: number
    suffix?: string
    prefix?: string
    duration?: number
    className?: string
}

const CounterAnimation = ({
    end,
    suffix = '',
    prefix = '',
    duration = 2000,
    className = ''
}: CounterAnimationProps) => {
    const [count, setCount] = useState(0)
    const [isVisible, setIsVisible] = useState(false)
    const ref = useRef<HTMLSpanElement>(null)

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !isVisible) {
                    setIsVisible(true)
                }
            },
            { threshold: 0.5 }
        )

        if (ref.current) {
            observer.observe(ref.current)
        }

        return () => observer.disconnect()
    }, [isVisible])

    useEffect(() => {
        if (!isVisible) return

        let startTime: number
        let animationFrame: number

        const animate = (currentTime: number) => {
            if (!startTime) startTime = currentTime
            const progress = Math.min((currentTime - startTime) / duration, 1)

            // Easing function (ease-out)
            const easeOut = 1 - Math.pow(1 - progress, 3)
            setCount(Math.floor(easeOut * end))

            if (progress < 1) {
                animationFrame = requestAnimationFrame(animate)
            }
        }

        animationFrame = requestAnimationFrame(animate)

        return () => cancelAnimationFrame(animationFrame)
    }, [isVisible, end, duration])

    return (
        <span ref={ref} className={className}>
            {prefix}{count}{suffix}
        </span>
    )
}

export default CounterAnimation
