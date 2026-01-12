import { ArrowRight, CheckCircle, XCircle, Loader2, Phone, Mail, MapPin } from 'lucide-react'
import { useState, useEffect, type FormEvent } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
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
    const [touched, setTouched] = useState<Record<keyof FormData, boolean>>({
        name: false,
        email: false,
        message: false
    })
    const [status, setStatus] = useState<FormStatus>('idle')
    const [errorMessage, setErrorMessage] = useState('')
    const [isMobile, setIsMobile] = useState(false)
    const [shake, setShake] = useState(false)

    // Particle/Confetti effect state
    const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; color: string }>>([])

    const validateEmail = (email: string) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };

    const errors = {
        name: !formData.name.trim() ? 'Name is required' : '',
        email: !formData.email.trim() ? 'Email is required' : !validateEmail(formData.email) ? 'Invalid email format' : '',
        message: !formData.message.trim() ? 'Message is required' : ''
    }

    const handleBlur = (field: keyof FormData) => {
        setTouched(prev => ({ ...prev, [field]: true }))
    }

    const triggerConfetti = () => {
        const colors = ['#D4AF37', '#ffffff', '#22C55E'] // Gold, White, Brand Green
        const newParticles = Array.from({ length: 50 }).map((_, i) => ({
            id: i,
            x: Math.random() * 100 - 50, // -50% to 50%
            y: Math.random() * 50 - 25, // -25% to 25%
            color: colors[Math.floor(Math.random() * colors.length)]
        }))
        setParticles(newParticles)
    }

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768)
        checkMobile()
        window.addEventListener('resize', checkMobile)
        return () => window.removeEventListener('resize', checkMobile)
    }, [])

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()
        triggerHaptic('heavy')

        // Mark all fields as touched on submit
        setTouched({ name: true, email: true, message: true })

        const hasErrors = Object.values(errors).some(err => err !== '')
        if (hasErrors) {
            setStatus('error')
            setErrorMessage('Please fix the errors in the form')
            setShake(true)
            setTimeout(() => setShake(false), 500)
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
                triggerConfetti()
                triggerHaptic('medium')
                setFormData({ name: '', email: '', message: '' })
                // Reset to idle after 8 seconds (gave more time to enjoy animation)
                setTimeout(() => setStatus('idle'), 8000)
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
                        {/* Contact Info Items - Same as before but cleaner code if needed, keeping them as is for now */}
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
                                className="text-center py-12 space-y-6 relative overflow-hidden"
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{
                                    type: "spring",
                                    damping: 20,
                                    stiffness: 100,
                                    duration: 0.8
                                }}
                                role="status"
                                aria-live="polite"
                            >
                                {/* Particle Confetti */}
                                {particles.map((particle) => (
                                    <motion.div
                                        key={particle.id}
                                        initial={{
                                            opacity: 1,
                                            x: 0,
                                            y: 0,
                                            scale: Math.random() * 0.5 + 0.5
                                        }}
                                        animate={{
                                            opacity: 0,
                                            x: particle.x * 20, // Spread out widely
                                            y: particle.y * 20 - 100, // Move up and spread
                                            rotate: Math.random() * 360
                                        }}
                                        transition={{
                                            duration: 1.5 + Math.random(),
                                            ease: "easeOut"
                                        }}
                                        style={{
                                            backgroundColor: particle.color
                                        }}
                                        className="absolute top-1/2 left-1/2 w-2 h-2 rounded-full"
                                    />
                                ))}

                                <div className="relative inline-block">
                                    {/* Success Ring Animation */}
                                    <svg className="w-32 h-32 absolute -inset-4 -rotate-90 pointer-events-none" viewBox="0 0 100 100">
                                        <motion.circle
                                            cx="50"
                                            cy="50"
                                            r="48"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            fill="transparent"
                                            className="text-brand-green/20"
                                        />
                                        <motion.circle
                                            cx="50"
                                            cy="50"
                                            r="48"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            fill="transparent"
                                            className="text-brand-green"
                                            initial={{ pathLength: 0 }}
                                            animate={{ pathLength: 1 }}
                                            transition={{ duration: 1.5, ease: "easeInOut", delay: 0.2 }}
                                        />
                                    </svg>

                                    <div className="relative">
                                        <motion.div
                                            initial={{ scale: 0, opacity: 0 }}
                                            animate={{ scale: [1, 1.5], opacity: [0.5, 0] }}
                                            transition={{ duration: 1.5, repeat: Infinity }}
                                            className="absolute inset-0 bg-brand-green/30 rounded-full"
                                        />
                                        <motion.div
                                            initial={{ scale: 0, rotate: -45 }}
                                            animate={{ scale: 1, rotate: 0 }}
                                            transition={{
                                                type: "spring",
                                                damping: 12,
                                                stiffness: 200,
                                                delay: 0.2
                                            }}
                                        >
                                            <CheckCircle className="w-24 h-24 text-brand-green relative z-10" />
                                        </motion.div>
                                    </div>
                                </div>

                                <motion.div
                                    className="space-y-4"
                                    initial="hidden"
                                    animate="visible"
                                    variants={{
                                        visible: {
                                            transition: {
                                                staggerChildren: 0.15,
                                                delayChildren: 0.4
                                            }
                                        }
                                    }}
                                >
                                    <motion.h4
                                        variants={{
                                            hidden: { opacity: 0, y: 20 },
                                            visible: { opacity: 1, y: 0 }
                                        }}
                                        className="text-4xl md:text-5xl font-oswald font-bold text-white uppercase tracking-tight"
                                    >
                                        Message <span className="text-brand-green italic">Received</span>
                                    </motion.h4>
                                    <motion.p
                                        variants={{
                                            hidden: { opacity: 0, y: 10 },
                                            visible: { opacity: 1, y: 0 }
                                        }}
                                        className="text-white font-bold text-sm uppercase tracking-[0.3em]"
                                    >
                                        We'll be in touch with you shortly.
                                    </motion.p>
                                    <motion.div
                                        variants={{
                                            hidden: { opacity: 0, scale: 0.9 },
                                            visible: { opacity: 1, scale: 1 }
                                        }}
                                        className="inline-block px-6 py-2 border border-white/10 glass rounded-full"
                                    >
                                        <p className="text-white/40 text-[10px] font-bold uppercase tracking-widest">
                                            Thank you for choosing IVR Interiors
                                        </p>
                                    </motion.div>
                                </motion.div>

                                <motion.button
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 2 }}
                                    onClick={() => {
                                        setStatus('idle')
                                        setTouched({ name: false, email: false, message: false })
                                        setParticles([])
                                    }}
                                    className="text-white/40 hover:text-white transition-colors text-[10px] font-bold uppercase tracking-[0.3em] mt-12 group flex items-center gap-2 mx-auto"
                                >
                                    <span className="w-4 h-[1px] bg-white/20 group-hover:w-8 transition-all" />
                                    Send Another Request?
                                </motion.button>
                            </motion.div>
                        ) : (
                            <motion.form
                                animate={shake ? { x: [-10, 10, -10, 10, 0] } : {}}
                                transition={{ duration: 0.4 }}
                                onSubmit={handleSubmit}
                                className="space-y-8"
                            >
                                <div className="space-y-6">
                                    {/* Name Input */}
                                    <div className="group relative">
                                        <label htmlFor="name" className={`block text-xs font-bold uppercase tracking-widest mb-2 transition-colors duration-300 ${touched.name && errors.name ? 'text-red-500' : 'text-white/50 group-focus-within:text-brand-green group-focus-within:text-shadow-glow'}`}>Full Name</label>
                                        <div className="relative">
                                            <input
                                                id="name"
                                                type="text"
                                                value={formData.name}
                                                onChange={(e) => {
                                                    setFormData(prev => ({ ...prev, name: e.target.value }))
                                                    if (touched.name) triggerHaptic('light')
                                                }}
                                                onBlur={() => handleBlur('name')}
                                                aria-invalid={touched.name && !!errors.name}
                                                aria-describedby={touched.name && errors.name ? "name-error" : undefined}
                                                className={`w-full bg-transparent border-b-2 py-4 text-xl font-bold text-white outline-none transition-all duration-300 rounded-none placeholder:text-white/10 
                                                    ${touched.name && errors.name
                                                        ? 'border-red-500/50'
                                                        : 'border-white/20 focus:border-brand-green focus:shadow-glow'}`}
                                                placeholder="Enter your name"
                                                disabled={status === 'submitting'}
                                            />
                                            <AnimatePresence>
                                                {touched.name && (
                                                    <motion.div
                                                        initial={{ opacity: 0, scale: 0.5 }}
                                                        animate={{ opacity: 1, scale: 1 }}
                                                        exit={{ opacity: 0, scale: 0.5 }}
                                                        className="absolute right-0 top-1/2 -translate-y-1/2"
                                                    >
                                                        {errors.name ? <XCircle size={18} className="text-red-500" /> : <CheckCircle size={18} className="text-brand-green" />}
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </div>
                                        <AnimatePresence mode="wait">
                                            {touched.name && errors.name && (
                                                <motion.p
                                                    key="name-error"
                                                    id="name-error"
                                                    initial={{ opacity: 0, height: 0 }}
                                                    animate={{ opacity: 1, height: 'auto' }}
                                                    exit={{ opacity: 0, height: 0 }}
                                                    className="text-red-500 text-[10px] uppercase font-bold mt-1 tracking-wider overflow-hidden"
                                                    role="alert"
                                                >
                                                    {errors.name}
                                                </motion.p>
                                            )}
                                        </AnimatePresence>
                                    </div>

                                    {/* Email Input */}
                                    <div className="group relative">
                                        <label htmlFor="email" className={`block text-xs font-bold uppercase tracking-widest mb-2 transition-colors duration-300 ${touched.email && errors.email ? 'text-red-500' : 'text-white/50 group-focus-within:text-brand-green group-focus-within:text-shadow-glow'}`}>Email Address</label>
                                        <div className="relative">
                                            <input
                                                id="email"
                                                type="email"
                                                value={formData.email}
                                                onChange={(e) => {
                                                    setFormData(prev => ({ ...prev, email: e.target.value }))
                                                    if (touched.email) triggerHaptic('light')
                                                }}
                                                onBlur={() => handleBlur('email')}
                                                aria-invalid={touched.email && !!errors.email}
                                                aria-describedby={touched.email && errors.email ? "email-error" : undefined}
                                                className={`w-full bg-transparent border-b-2 py-4 text-xl font-bold text-white outline-none transition-all duration-300 rounded-none placeholder:text-white/10 
                                                    ${touched.email && errors.email
                                                        ? 'border-red-500/50'
                                                        : 'border-white/20 focus:border-brand-green focus:shadow-glow'}`}
                                                placeholder="name@example.com"
                                                disabled={status === 'submitting'}
                                            />
                                            <AnimatePresence>
                                                {touched.email && (
                                                    <motion.div
                                                        initial={{ opacity: 0, scale: 0.5 }}
                                                        animate={{ opacity: 1, scale: 1 }}
                                                        exit={{ opacity: 0, scale: 0.5 }}
                                                        className="absolute right-0 top-1/2 -translate-y-1/2"
                                                    >
                                                        {errors.email ? <XCircle size={18} className="text-red-500" /> : <CheckCircle size={18} className="text-brand-green" />}
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </div>
                                        <AnimatePresence mode="wait">
                                            {touched.email && errors.email && (
                                                <motion.p
                                                    key="email-error"
                                                    id="email-error"
                                                    initial={{ opacity: 0, height: 0 }}
                                                    animate={{ opacity: 1, height: 'auto' }}
                                                    exit={{ opacity: 0, height: 0 }}
                                                    className="text-red-500 text-[10px] uppercase font-bold mt-1 tracking-wider overflow-hidden"
                                                    role="alert"
                                                >
                                                    {errors.email}
                                                </motion.p>
                                            )}
                                        </AnimatePresence>
                                    </div>

                                    {/* Message Input */}
                                    <div className="group relative">
                                        <label htmlFor="message" className={`block text-xs font-bold uppercase tracking-widest mb-2 transition-colors duration-300 ${touched.message && errors.message ? 'text-red-500' : 'text-white/50 group-focus-within:text-brand-green group-focus-within:text-shadow-glow'}`}>Message</label>
                                        <div className="relative">
                                            <textarea
                                                id="message"
                                                rows={3}
                                                value={formData.message}
                                                onChange={(e) => {
                                                    setFormData(prev => ({ ...prev, message: e.target.value }))
                                                    if (touched.message) triggerHaptic('light')
                                                }}
                                                onBlur={() => handleBlur('message')}
                                                aria-invalid={touched.message && !!errors.message}
                                                aria-describedby={touched.message && errors.message ? "message-error" : undefined}
                                                className={`w-full bg-transparent border-b-2 py-4 text-xl font-bold text-white outline-none transition-all duration-300 rounded-none resize-none placeholder:text-white/10 
                                                    ${touched.message && errors.message
                                                        ? 'border-red-500/50'
                                                        : 'border-white/20 focus:border-brand-green focus:shadow-glow'}`}
                                                placeholder="Tell us about your project"
                                                disabled={status === 'submitting'}
                                            />
                                            <AnimatePresence>
                                                {touched.message && (
                                                    <motion.div
                                                        initial={{ opacity: 0, scale: 0.5 }}
                                                        animate={{ opacity: 1, scale: 1 }}
                                                        exit={{ opacity: 0, scale: 0.5 }}
                                                        className="absolute right-0 top-4"
                                                    >
                                                        {errors.message ? <XCircle size={18} className="text-red-500" /> : <CheckCircle size={18} className="text-brand-green" />}
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </div>
                                        <AnimatePresence mode="wait">
                                            {touched.message && errors.message && (
                                                <motion.p
                                                    key="message-error"
                                                    id="message-error"
                                                    initial={{ opacity: 0, height: 0 }}
                                                    animate={{ opacity: 1, height: 'auto' }}
                                                    exit={{ opacity: 0, height: 0 }}
                                                    className="text-red-500 text-[10px] uppercase font-bold mt-1 tracking-wider overflow-hidden"
                                                    role="alert"
                                                >
                                                    {errors.message}
                                                </motion.p>
                                            )}
                                        </AnimatePresence>
                                    </div>
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
                            </motion.form>
                        )}
                    </div>
                </motion.div>
            </div>
        </section>
    )
}

export default Contact


