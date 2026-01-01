import { useEffect, useState } from 'react'
import { motion, useSpring, useMotionValue } from 'framer-motion'

const CustomCursor = () => {
    const [isHovered, setIsHovered] = useState(false)
    const [isClicked, setIsClicked] = useState(false)

    // Mouse position
    const mouseX = useMotionValue(0)
    const mouseY = useMotionValue(0)

    // Snappier physics for "tech" feel
    const springConfig = { damping: 25, stiffness: 400, mass: 0.5 }
    const cursorX = useSpring(mouseX, springConfig)
    const cursorY = useSpring(mouseY, springConfig)

    useEffect(() => {
        // Hide default cursor
        document.body.style.cursor = 'none'

        const moveCursor = (e: MouseEvent) => {
            mouseX.set(e.clientX)
            mouseY.set(e.clientY)
        }

        const handleHover = (e: MouseEvent) => {
            const target = e.target as HTMLElement
            // Expanded list of clickable elements
            const isClickable = target.closest('button, a, input, textarea, [role="button"], .clickable, .project-card, label, select')
            setIsHovered(!!isClickable)
        }

        const handleMouseDown = () => setIsClicked(true)
        const handleMouseUp = () => setIsClicked(false)

        window.addEventListener('mousemove', moveCursor)
        window.addEventListener('mouseover', handleHover)
        window.addEventListener('mousedown', handleMouseDown)
        window.addEventListener('mouseup', handleMouseUp)

        return () => {
            document.body.style.cursor = 'auto' // Restore cursor on cleanup
            window.removeEventListener('mousemove', moveCursor)
            window.removeEventListener('mouseover', handleHover)
            window.removeEventListener('mousedown', handleMouseDown)
            window.removeEventListener('mouseup', handleMouseUp)
        }
    }, [mouseX, mouseY])

    return (
        <div className="fixed inset-0 pointer-events-none z-[99999] hidden md:block mix-blend-difference">
            <motion.div
                className="absolute rounded-full bg-white"
                style={{
                    x: cursorX,
                    y: cursorY,
                    translateX: '-50%',
                    translateY: '-50%',
                }}
                animate={{
                    width: isHovered ? 80 : 20,
                    height: isHovered ? 80 : 20,
                    opacity: 1, // Always fully visible for the inverted effect
                    scale: isClicked ? 0.8 : 1,
                }}
                transition={{
                    type: "spring",
                    stiffness: 150, // Slightly looser for a "floaty" feel
                    damping: 15,
                    mass: 0.1
                }}
            />
        </div>
    )
}

export default CustomCursor
