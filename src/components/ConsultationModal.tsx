import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Calendar } from 'lucide-react'

const ConsultationModal = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [hasSubmitted, setHasSubmitted] = useState(false)

    useEffect(() => {
        // Check if modal was closed recently (within last 24 hours)
        const lastClosed = localStorage.getItem('consultationModalClosed')
        const now = new Date().getTime()
        const oneDay = 24 * 60 * 60 * 1000

        if (!lastClosed || (now - parseInt(lastClosed) > oneDay)) {
            const timer = setTimeout(() => {
                setIsOpen(true)
            }, 8000) // 8 seconds delay

            return () => clearTimeout(timer)
        }
    }, [])

    const handleClose = () => {
        setIsOpen(false)
        localStorage.setItem('consultationModalClosed', new Date().getTime().toString())
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        // Here you would typically send data to your backend
        setHasSubmitted(true)
        setTimeout(() => {
            handleClose()
        }, 3000)
    }

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={handleClose}
                        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
                    />

                    {/* Modal Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 50, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        transition={{ type: "spring", duration: 0.6 }}
                        className="relative bg-anthropic-beige w-full max-w-4xl h-auto md:h-[500px] rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row border border-anthropic-stone/20"
                    >
                        {/* Close Button */}
                        <button
                            onClick={handleClose}
                            className="absolute top-4 right-4 z-20 p-2 bg-white/80 backdrop-blur rounded-full hover:bg-white transition-colors text-anthropic-text"
                        >
                            <X size={20} />
                        </button>

                        {/* Left Side - Image */}
                        <div className="w-full md:w-5/12 relative h-48 md:h-full flex-shrink-0">
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
                            <img
                                src="/assets/IMG-20251203-WA0011.jpg"
                                alt="Luxury Interior"
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute bottom-4 left-4 z-20 text-white">
                                <p className="font-serif text-xl">Expert Consultation</p>
                                <p className="text-xs uppercase tracking-wider opacity-90">At Your Doorstep</p>
                            </div>
                        </div>

                        {/* Right Side - Content */}
                        <div className="flex-1 p-8 md:p-10 flex flex-col justify-center bg-white/50 backdrop-blur-xl">
                            {!hasSubmitted ? (
                                <>
                                    <h3 className="text-3xl font-serif text-anthropic-text mb-3">
                                        Unlock Your <span className="text-anthropic-accent italic">Dream Space</span>.
                                    </h3>
                                    <p className="text-anthropic-secondary mb-8 leading-relaxed">
                                        Schedule a complimentary site visit with one of our design experts to discuss your vision. No commitment required—just pure design inspiration.
                                    </p>

                                    <form onSubmit={handleSubmit} className="space-y-4">
                                        <div>
                                            <input
                                                type="text"
                                                placeholder="Your Name"
                                                required
                                                className="w-full px-4 py-3 bg-white border border-anthropic-stone/30 rounded-lg focus:outline-none focus:border-anthropic-accent text-anthropic-text placeholder:text-anthropic-secondary/50 transition-colors"
                                            />
                                        </div>
                                        <div>
                                            <input
                                                type="tel"
                                                placeholder="Phone Number"
                                                required
                                                className="w-full px-4 py-3 bg-white border border-anthropic-stone/30 rounded-lg focus:outline-none focus:border-anthropic-accent text-anthropic-text placeholder:text-anthropic-secondary/50 transition-colors"
                                            />
                                        </div>
                                        <button
                                            type="submit"
                                            className="w-full bg-anthropic-text text-white py-4 rounded-lg font-medium hover:bg-anthropic-accent transition-colors duration-300 flex items-center justify-center gap-2 mt-2"
                                        >
                                            <Calendar size={18} />
                                            Book Free Visit
                                        </button>
                                    </form>
                                    <p className="text-[10px] text-center text-anthropic-secondary mt-4 uppercase tracking-widest">
                                        Limited slots available this week
                                    </p>
                                </>
                            ) : (
                                <div className="text-center py-10">
                                    <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                    <h3 className="text-2xl font-serif text-anthropic-text mb-2">Thank You!</h3>
                                    <p className="text-anthropic-secondary">
                                        We've received your request. Our team will be in touch shortly to confirm your visit.
                                    </p>
                                </div>
                            )}
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    )
}

export default ConsultationModal
