import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Calendar, CheckCircle } from 'lucide-react'

const ConsultationModal = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [hasSubmitted, setHasSubmitted] = useState(false)

    useEffect(() => {
        const lastClosed = localStorage.getItem('consultationModalClosed')
        const now = new Date().getTime()
        const oneDay = 24 * 60 * 60 * 1000

        if (!lastClosed || (now - parseInt(lastClosed) > oneDay)) {
            const timer = setTimeout(() => {
                setIsOpen(true)
            }, 8000)

            return () => clearTimeout(timer)
        }
    }, [])

    const handleClose = () => {
        setIsOpen(false)
        localStorage.setItem('consultationModalClosed', new Date().getTime().toString())
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        setHasSubmitted(true)
        setTimeout(() => {
            handleClose()
        }, 3000)
    }

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={handleClose}
                        className="absolute inset-0 bg-charcoal/60 backdrop-blur-sm"
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, y: 50, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        transition={{ type: "spring", duration: 0.6 }}
                        className="relative bg-ivory w-full max-w-4xl overflow-hidden flex flex-col md:flex-row shadow-2xl"
                    >
                        {/* Close Button */}
                        <button
                            onClick={handleClose}
                            className="absolute top-4 right-4 z-20 w-10 h-10 flex items-center justify-center text-ivory hover:text-accent transition-colors"
                        >
                            <X size={24} strokeWidth={1} />
                        </button>

                        {/* Left - Image */}
                        <div className="w-full md:w-5/12 relative h-48 md:h-auto">
                            <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 to-transparent z-10" />
                            <img
                                src="/assets/IMG-20251203-WA0011.jpg"
                                alt="Luxury Interior"
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute bottom-6 left-6 z-20 text-ivory">
                                <p className="font-serif text-2xl">Expert Consultation</p>
                                <p className="text-xs uppercase tracking-wider opacity-80 mt-1">At Your Doorstep</p>
                            </div>
                        </div>

                        {/* Right - Content */}
                        <div className="flex-1 p-8 md:p-12 flex flex-col justify-center">
                            {!hasSubmitted ? (
                                <>
                                    <h3 className="text-3xl font-serif text-charcoal mb-4">
                                        Unlock Your <span className="italic text-accent">Dream Space</span>
                                    </h3>
                                    <p className="text-warm-gray mb-8 leading-relaxed">
                                        Schedule a complimentary site visit with one of our design experts
                                        to discuss your vision. No commitment required.
                                    </p>

                                    <form onSubmit={handleSubmit} className="space-y-4">
                                        <input
                                            type="text"
                                            placeholder="Your Name"
                                            required
                                            className="w-full px-4 py-4 bg-warm-white border-b border-stone-light focus:border-accent outline-none transition-colors text-charcoal placeholder:text-warm-gray"
                                        />
                                        <input
                                            type="tel"
                                            placeholder="Phone Number"
                                            required
                                            className="w-full px-4 py-4 bg-warm-white border-b border-stone-light focus:border-accent outline-none transition-colors text-charcoal placeholder:text-warm-gray"
                                        />
                                        <button
                                            type="submit"
                                            className="w-full btn-luxury mt-4"
                                        >
                                            <Calendar size={18} className="mr-2" />
                                            Book Free Visit
                                        </button>
                                    </form>

                                    <p className="text-[10px] text-center text-warm-gray mt-6 uppercase tracking-widest">
                                        Limited slots available this week
                                    </p>
                                </>
                            ) : (
                                <div className="text-center py-10">
                                    <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-6">
                                        <CheckCircle className="w-8 h-8 text-accent" />
                                    </div>
                                    <h3 className="text-2xl font-serif text-charcoal mb-2">Thank You!</h3>
                                    <p className="text-warm-gray">
                                        We've received your request. Our team will be in touch shortly.
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
