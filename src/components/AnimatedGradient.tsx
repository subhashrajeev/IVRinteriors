import { motion } from 'framer-motion'

interface AnimatedGradientProps {
    className?: string
    colors?: ('green' | 'gold' | 'blue')[]
}

const AnimatedGradient = ({
    className = '',
    colors = ['green', 'gold']
}: AnimatedGradientProps) => {
    const orbConfigs = [
        { top: '10%', left: '10%', size: 300, delay: 0, duration: 20 },
        { top: '60%', right: '5%', size: 400, delay: 2, duration: 25 },
        { bottom: '20%', left: '30%', size: 250, delay: 4, duration: 18 },
    ]

    const colorMap = {
        green: 'gradient-orb-green',
        gold: 'gradient-orb-gold',
        blue: 'gradient-orb-blue'
    }

    return (
        <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
            {orbConfigs.map((config, index) => {
                const colorClass = colorMap[colors[index % colors.length]]
                return (
                    <motion.div
                        key={index}
                        className={`gradient-orb ${colorClass}`}
                        style={{
                            width: config.size,
                            height: config.size,
                            top: config.top,
                            left: config.left,
                            right: config.right,
                            bottom: config.bottom,
                        }}
                        animate={{
                            x: [0, 30, -20, 10, 0],
                            y: [0, -25, 15, -10, 0],
                            scale: [1, 1.1, 0.95, 1.05, 1],
                        }}
                        transition={{
                            duration: config.duration,
                            repeat: Infinity,
                            delay: config.delay,
                            ease: "easeInOut",
                        }}
                    />
                )
            })}
        </div>
    )
}

export default AnimatedGradient
