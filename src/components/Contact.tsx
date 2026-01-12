import { ArrowRight, CheckCircle, XCircle, Loader2, Phone, Mail, MapPin } from 'lucide-react'
import { useState, useEffect, type FormEvent } from 'react'
import { motion } from 'framer-motion'
import { triggerHaptic } from '../utils/haptics'
import AnimatedGradient from './AnimatedGradient'

// Web3Forms access key - this is safe to expose in frontend
const WEB3FORMS_ACCESS_KEY = '92a287e4-5cef-4a4d-9ea4-96d2091c9dbc'

interface FormData {
    name: string
    email: string
    message: string
}

type FormStatus = 'idle' | 'submitting' | 'success' | 'error'

const Contact = () => {
    const [formData, setFormData] = useState<FormData>({
        name: '',
        email: '',
        message: ''
    })
    const [status, setStatus] = useState<FormStatus>('idle')
    const [errorMessage, setErrorMessage] = useState('')
    const [isMobile, setIsMobile] = useState(false)

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768)
        checkMobile()
        window.addEventListener('resize', checkMobile)
        return () => window.removeEventListener('resize', checkMobile)
    }, [])

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()
        triggerHaptic('heavy')

        // Basic validation
        if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
            setStatus('error')
            setErrorMessage('Please fill in all fields')
            triggerHaptic('heavy')
            return
        }

        setStatus('submitting')

        try {
            const response = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    access_key: WEB3FORMS_ACCESS_KEY,
                    name: formData.name,
                    email: formData.email,
                    message: formData.message,
                    subject: `New Contact Request from ${formData.name} - IVR Interiors`,
                    from_name: 'IVR Interiors Website'
                })
            })

            const result = await response.json()

            if (result.success) {
                setStatus('success')
                triggerHaptic('medium')
                setFormData({ name: '', email: '', message: '' })
                // Reset to idle after 5 seconds
                setTimeout(() => setStatus('idle'), 5000)
            } else {
                throw new Error(result.message || 'Something went wrong')
            }
        } catch (error) {
            setStatus('error')
            setErrorMessage(error instanceof Error ? error.message : 'Failed to send message. Please try again.')
            triggerHaptic('heavy')
        }
    }

    return (
        <section id="contact" className={`bg-charcoal border-t border-white/5 overflow-hidden relative ${!isMobile ? 'noise-bg' : ''}`}>
            {/* Animated Gradient Background - Reduced opacity on mobile */}
            <AnimatedGradient colors={['green', 'gold']} className={isMobile ? 'opacity-20' : 'opacity-40'} />

            <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen relative z-10">

                {/* Left Side: Info */}
                <motion.div
                    className="p-8 md:p-16 flex flex-col justify-between relative"
                    initial={{ opacity: 0, x: isMobile ? 0 : -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: isMobile ? '0px' : '-100px' }}
                    transition={{ duration: isMobile ? 0.3 : 0.8 }}
                >
                    <div className="space-y-8">
                        <div>
                            <span className="text-brand-green font-bold tracking-[0.3em] uppercase text-xs mb-4 block flex items-center gap-3 font-playfair">
                                <span className="w-8 h-[2px] bg-brand-green" />
                                Contact
                            </span>
                            <h2 className="text-6xl md:text-7xl font-oswald font-bold italic uppercase text-white leading-[0.9]">
                                Let's Talk <br /> <span className="text-white/30 font-playfair lowercase italic font-normal tracking-tight">Future.</span>
                            </h2>
                        </div>

                        <p className="text-white/60 max-w-md font-light text-lg leading-relaxed">
                            Ready to upgrade your space? We bring 15+ years of precision and modern aesthetics to your project.
                        </p>
                    </div>

                    <div className="grid gap-8 mt-10">
                        <motion.div
                            className="group"
                            initial={{ opacity: 0, y: isMobile ? 10 : 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: isMobile ? 0.1 : 0.2, duration: isMobile ? 0.3 : 0.5 }}
                        >
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 glass flex items-center justify-center group-hover:bg-brand-green/20 transition-colors">
                                    <Phone size={20} className="text-brand-green" />
                                </div>
                                <div>
                                    <h4 className="text-sm font-bold uppercase tracking-widest text-white/40 mb-1 group-hover:text-brand-green transition-colors">Call Us</h4>
                                    <a href="tel:+918885575733" onClick={() => triggerHaptic('medium')} className="text-2xl md:text-3xl text-white font-[Oswald] font-bold hover:text-brand-green transition-colors">
                                        +91 88855 75733
                                    </a>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div
                            className="group"
                            initial={{ opacity: 0, y: isMobile ? 10 : 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: isMobile ? 0.15 : 0.3, duration: isMobile ? 0.3 : 0.5 }}
                        >
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 glass flex items-center justify-center group-hover:bg-brand-green/20 transition-colors">
                                    <Mail size={20} className="text-brand-green" />
                                </div>
                                <div>
                                    <h4 className="text-sm font-bold uppercase tracking-widest text-white/40 mb-1 group-hover:text-brand-green transition-colors">Email Us</h4>
                                    <a href="mailto:venkatarajuandco@gmail.com" onClick={() => triggerHaptic('light')} className="text-lg md:text-xl text-white font-[Oswald] font-bold hover:text-brand-green transition-colors">
                                        venkatarajuandco@gmail.com
                                    </a>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div
                            className="group"
                            initial={{ opacity: 0, y: isMobile ? 10 : 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: isMobile ? 0.2 : 0.4, duration: isMobile ? 0.3 : 0.5 }}
                        >
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 glass flex items-center justify-center group-hover:bg-brand-green/20 transition-colors">
                                    <MapPin size={20} className="text-brand-green" />
                                </div>
                                <div>
                                    <h4 className="text-sm font-bold uppercase tracking-widest text-white/40 mb-1">Visit Us</h4>
                                    <p className="text-lg text-white/80">Nizampet, Hyderabad.</p>
                                    <a href="https://maps.google.com/?q=IVR+Interiors" target="_blank" onClick={() => triggerHaptic('light')} className="inline-flex items-center gap-2 text-brand-green mt-2 text-sm font-bold uppercase tracking-widest hover:text-white transition-colors">
                                        View Map <ArrowRight size={14} />
                                    </a>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </motion.div>

                {/* Right Side: Glassmorphism Form */}
                <motion.div
                    className="p-8 md:p-16 flex items-center relative"
                    initial={{ opacity: 0, x: isMobile ? 0 : 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: isMobile ? '0px' : '-100px' }}
                    transition={{ duration: isMobile ? 0.3 : 0.8, delay: isMobile ? 0.1 : 0.2 }}
                >
                    {/* Background gradient for this side */}
                    <div className="absolute inset-0 bg-gradient-to-br from-brand-green/5 via-transparent to-transparent pointer-events-none" />

                    <div className={`w-full max-w-lg mx-auto p-8 md:p-12 relative ${isMobile ? 'bg-grey-surface/90 border border-white/10' : 'glass'}`}>
                        <h3 className="text-white text-3xl font-[Oswald] font-bold uppercase italic mb-6 flex items-center gap-3">
                            <span className="w-3 h-3 bg-brand-green" />
                            Send A Request
                        </h3>

                        {status === 'success' ? (
                            <motion.div
                                className="text-center py-12 space-y-4"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.5 }}
                                role="status"
                                aria-live="polite"
                            >
                                <CheckCircle className="w-16 h-16 text-brand-green mx-auto" />
                                <h4 className="text-2xl font-[Oswald] font-bold text-white uppercase">Message Sent!</h4>
                                <p className="text-white/60">We'll get back to you within 24 hours.</p>
                            </motion.div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-8">
                                <div className="group">
                                    <label className="block text-xs font-bold uppercase tracking-widest text-white/50 mb-2 group-focus-within:text-brand-green transition-colors">Full Name</label>
                                    <input
                                        type="text"
                                        value={formData.name}
                                        onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                                        className="w-full bg-transparent border-b-2 border-white/20 py-4 text-xl font-bold text-white outline-none focus:border-brand-green transition-colors rounded-none placeholder:text-white/20"
                                        placeholder="Enter your name"
                                        disabled={status === 'submitting'}
                                    />
                                </div>

                                <div className="group">
                                    <label className="block text-xs font-bold uppercase tracking-widest text-white/50 mb-2 group-focus-within:text-brand-green transition-colors">Email Address</label>
                                    <input
                                        type="email"
                                        value={formData.email}
                                        onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                                        className="w-full bg-transparent border-b-2 border-white/20 py-4 text-xl font-bold text-white outline-none focus:border-brand-green transition-colors rounded-none placeholder:text-white/20"
                                        placeholder="name@example.com"
                                        disabled={status === 'submitting'}
                                    />
                                </div>

                                <div className="group">
                                    <label className="block text-xs font-bold uppercase tracking-widest text-white/50 mb-2 group-focus-within:text-brand-green transition-colors">Message</label>
                                    <textarea
                                        rows={3}
                                        value={formData.message}
                                        onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                                        className="w-full bg-transparent border-b-2 border-white/20 py-4 text-xl font-bold text-white outline-none focus:border-brand-green transition-colors rounded-none resize-none placeholder:text-white/20"
                                        placeholder="Tell us about your project"
                                        disabled={status === 'submitting'}
                                    />
                                </div>

                                {status === 'error' && (
                                    <motion.div
                                        className="flex items-center gap-3 p-4 glass border-red-500/30 border"
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        role="alert"
                                    >
                                        <XCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
                                        <p className="text-red-400 text-sm font-medium">{errorMessage}</p>
                                    </motion.div>
                                )}

                                <button
                                    type="submit"
                                    disabled={status === 'submitting'}
                                    className="w-full bg-brand-green text-charcoal font-bold h-16 uppercase tracking-[0.2em] hover:bg-white transition-colors duration-300 mt-8 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 group"
                                >
                                    {status === 'submitting' ? (
                                        <>
                                            <Loader2 className="w-5 h-5 animate-spin" />
                                            Sending...
                                        </>
                                    ) : (
                                        <>
                                            Send Message
                                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                        </>
                                    )}
                                </button>
                            </form>
                        )}
                    </div>
                </motion.div>
            </div>
        </section>
    )
}

export default Contact

