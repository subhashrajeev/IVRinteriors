import { useEffect, useState } from 'react'

interface AnimatedGradientProps {
    className?: string
    colors?: ('green' | 'gold' | 'blue')[]
}

const AnimatedGradient = ({
    className = '',
    colors = ['green', 'gold']
}: AnimatedGradientProps) => {
    const [isMobile, setIsMobile] = useState(false)

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768)
        checkMobile()
        window.addEventListener('resize', checkMobile)
        return () => window.removeEventListener('resize', checkMobile)
    }, [])

    const orbConfigs = [
        { top: '10%', left: '10%', size: isMobile ? 200 : 300, delay: 0 },
        { top: '60%', right: '5%', size: isMobile ? 250 : 400, delay: 2 },
        { bottom: '20%', left: '30%', size: isMobile ? 150 : 250, delay: 4 },
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
                    <div
                        key={index}
                        className={`gradient-orb ${colorClass} ${!isMobile ? 'md:animate-float' : ''}`}
                        style={{
                            width: config.size,
                            height: config.size,
                            top: config.top,
                            left: config.left,
                            right: config.right,
                            bottom: config.bottom,
                            animationDelay: `${config.delay}s`,
                        }}
                    />
                )
            })}
        </div>
    )
}

export default AnimatedGradient
