import { useEffect, useRef, useState } from 'react'

type LazyInViewVideoProps = {
    src: string
    className?: string
}

/** Loads and plays video only when near the viewport — saves ~10MB+ on initial load. */
export const LazyInViewVideo = ({ src, className }: LazyInViewVideoProps) => {
    const ref = useRef<HTMLVideoElement>(null)
    const [shouldLoad, setShouldLoad] = useState(false)

    useEffect(() => {
        const el = ref.current
        if (!el) return

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry?.isIntersecting) {
                    setShouldLoad(true)
                } else {
                    el.pause()
                }
            },
            { rootMargin: '120px', threshold: 0.15 }
        )

        observer.observe(el)
        return () => observer.disconnect()
    }, [])

    useEffect(() => {
        const el = ref.current
        if (!el || !shouldLoad) return

        el.src = src
        el.load()
        void el.play().catch(() => {})
    }, [shouldLoad, src])

    return (
        <video
            ref={ref}
            muted
            loop
            playsInline
            preload="none"
            className={className}
        />
    )
}