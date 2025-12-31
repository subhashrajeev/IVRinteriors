import { useEffect } from 'react'
import Lenis from 'lenis'

const SmoothScroll = () => {
    useEffect(() => {
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            orientation: 'vertical',
            gestureOrientation: 'vertical',
            smoothWheel: true,
            wheelMultiplier: 1,
            touchMultiplier: 2,
            infinite: false,
        })

        function raf(time: number) {
            lenis.raf(time)
            requestAnimationFrame(raf)
        }

        requestAnimationFrame(raf)

        const handleStop = () => lenis.stop()
        const handleStart = () => lenis.start()

        window.addEventListener('lenis-stop', handleStop)
        window.addEventListener('lenis-start', handleStart)

        return () => {
            window.removeEventListener('lenis-stop', handleStop)
            window.removeEventListener('lenis-start', handleStart)
            lenis.destroy()
        }
    }, [])

    return null
}

export default SmoothScroll
