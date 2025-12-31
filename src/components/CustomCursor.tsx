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
            {/* Main Follower Circle */}
            <motion.div
                className="absolute rounded-full border border-white bg-white"
                style={{
                    x: cursorX,
                    y: cursorY,
                    translateX: '-50%',
                    translateY: '-50%',
                }}
                animate={{
                    width: isHovered ? 60 : 20,
                    height: isHovered ? 60 : 20,
                    opacity: isHovered ? 1 : 0.5, // Solid white on hover (inverts to black), semi-transparent otherwise
                    scale: isClicked ? 0.8 : 1,
                }}
                transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 20
                }}
            />

            {/* Center Dot (Always Visible) */}
            <motion.div
                className="absolute rounded-full bg-white"
                style={{
                    x: mouseX, // Follows mouse exactly without lag
                    y: mouseY,
                    translateX: '-50%',
                    translateY: '-50%',
                    width: 4,
                    height: 4,
                }}
            />
        </div>
    )
}

export default CustomCursor
