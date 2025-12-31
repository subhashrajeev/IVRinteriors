import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Calculator, ChevronRight, Info } from 'lucide-react'
import { triggerHaptic } from '../utils/haptics'

const CostCalculator = () => {
    const [area, setArea] = useState(1000)
    const [quality, setQuality] = useState('Premium')
    const [rooms, setRooms] = useState({
        kitchen: true,
        wardrobes: true,
        living: true,
        bathrooms: 2
    })
    const [estimate, setEstimate] = useState({ min: 0, max: 0 })

    const rates = {
        Standard: { base: 1200, kitchen: 150000, wardrobe: 60000 },
        Premium: { base: 1800, kitchen: 250000, wardrobe: 90000 },
        Luxury: { base: 2800, kitchen: 450000, wardrobe: 150000 }
    }

    useEffect(() => {
        const calculate = () => {
            const currentRate = rates[quality as keyof typeof rates]
            let baseCost = area * currentRate.base

            if (rooms.kitchen) baseCost += currentRate.kitchen
            baseCost += (rooms.wardrobes ? 2 : 0) * currentRate.wardrobe // Assuming 2 wardrobes standard

            const min = baseCost * 0.9
            const max = baseCost * 1.1

            setEstimate({ min, max })
        }
        calculate()
    }, [area, quality, rooms])

    const formatCurrency = (val: number) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 0
        }).format(val)
    }

    return (
        <section id="calculator" className="py-32 bg-charcoal relative overflow-hidden">
            <div className="container mx-auto px-6">
                <div className="flex flex-col lg:flex-row gap-20 items-center">
                    {/* Left: Info */}
                    <div className="lg:w-1/2">
                        <span className="text-brand-green font-bold tracking-[0.3em] uppercase text-xs mb-8 block">Interactive Tool</span>
                        <h2 className="text-5xl md:text-7xl font-[Oswald] font-bold uppercase italic text-white mb-10 leading-[0.9]">
                            Estimate Your <br /> <span className="text-brand-green">Dream Space.</span>
                        </h2>
                        <p className="text-white/60 text-lg font-light leading-relaxed mb-12">
                            Get a preliminary estimate for your project in seconds. Our calculator uses current Hyderabad market rates for high-precision modular solutions.
                        </p>

                        <div className="bg-white/5 border border-white/10 p-6 rounded-sm flex items-start gap-4">
                            <Info className="text-brand-green shrink-0 mt-1" size={20} />
                            <p className="text-sm text-white/40 italic">
                                Note: These are approximate estimates based on industrial-luxury standards. Final quotes may vary based on exact site conditions and material selections.
                            </p>
                        </div>
                    </div>

                    {/* Right: Calculator Card */}
                    <div className="lg:w-1/2 w-full">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="bg-black/40 backdrop-blur-xl border border-white/10 p-8 md:p-12 relative"
                        >
                            <div className="absolute -top-6 -left-6 w-12 h-12 bg-brand-green flex items-center justify-center">
                                <Calculator className="text-charcoal" size={24} />
                            </div>

                            {/* Inputs */}
                            <div className="space-y-8">
                                <div>
                                    <div className="flex justify-between mb-4">
                                        <label className="text-xs uppercase tracking-widest text-white/60 font-bold">Total Area (sq. ft)</label>
                                        <span className="text-brand-green font-mono">{area} sqft</span>
                                    </div>
                                    <input
                                        type="range"
                                        min="500"
                                        max="5000"
                                        step="50"
                                        value={area}
                                        onChange={(e) => {
                                            setArea(parseInt(e.target.value))
                                            triggerHaptic('light')
                                        }}
                                        className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-brand-green"
                                    />
                                </div>

                                <div>
                                    <label className="text-xs uppercase tracking-widest text-white/60 font-bold block mb-4">Include Rooms</label>
                                    <div className="flex flex-wrap gap-4">
                                        {[
                                            { id: 'kitchen', label: 'Modular Kitchen' },
                                            { id: 'wardrobes', label: 'Wardrobes' },
                                            { id: 'living', label: 'Living Room' }
                                        ].map((room) => (
                                            <button
                                                key={room.id}
                                                onClick={() => {
                                                    setRooms(prev => ({ ...prev, [room.id]: !prev[room.id as keyof typeof prev] }))
                                                    triggerHaptic('light')
                                                }}
                                                className={`px-4 py-2 text-[10px] uppercase tracking-tighter transition-all rounded-full border ${rooms[room.id as keyof typeof rooms]
                                                        ? 'bg-brand-green/20 text-brand-green border-brand-green'
                                                        : 'bg-white/5 text-white/40 border-white/10 hover:border-white/30'
                                                    }`}
                                            >
                                                {room.label}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <label className="text-xs uppercase tracking-widest text-white/60 font-bold block mb-4">Material Grade</label>
                                    <div className="grid grid-cols-3 gap-4">
                                        {['Standard', 'Premium', 'Luxury'].map((q) => (
                                            <button
                                                key={q}
                                                onClick={() => {
                                                    setQuality(q)
                                                    triggerHaptic('medium')
                                                }}
                                                className={`py-3 text-[10px] uppercase tracking-tighter transition-all ${quality === q
                                                    ? 'bg-brand-green text-charcoal font-bold border-brand-green'
                                                    : 'bg-white/5 text-white/60 border border-white/10 hover:border-white/30'
                                                    }`}
                                            >
                                                {q}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Estimate Display */}
                                <div className="pt-8 border-t border-white/10">
                                    <p className="text-xs uppercase tracking-[0.3em] text-white/40 mb-6 text-center">Estimated Investment Range</p>
                                    <div className="flex flex-col items-center gap-2">
                                        <motion.h3
                                            key={estimate.min}
                                            initial={{ opacity: 0, scale: 0.95 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            className="text-4xl md:text-5xl font-[Oswald] font-bold text-white italic"
                                        >
                                            {formatCurrency(estimate.min)} - {formatCurrency(estimate.max)}
                                        </motion.h3>
                                        <p className="text-[10px] text-brand-green font-bold tracking-[0.4em] uppercase mt-2">All Inclusive Estimate*</p>
                                    </div>
                                </div>

                                <button
                                    onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                                    className="w-full btn-primary mt-8 flex items-center justify-center gap-2 group"
                                >
                                    Get Detailed Quote
                                    <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                                </button>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default CostCalculator
