import { ArrowRight, CheckCircle, XCircle, Loader2, Phone, Mail, MapPin } from 'lucide-react'
import { useState, useEffect, type FormEvent } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { triggerHaptic } from '../utils/haptics'

// Web3Forms access key
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
        const colors = ['#D97757', '#C1B6A6', '#1A1A1A'] // Accent, Secondary, Text
        const newParticles = Array.from({ length: 50 }).map((_, i) => ({
            id: i,
            x: Math.random() * 100 - 50,
            y: Math.random() * 50 - 25,
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
        <section id="contact" className="bg-anthropic-beige border-t border-anthropic-stone overflow-hidden relative py-20">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">

                    {/* Left Side: Info */}
                    <motion.div
                        className="flex flex-col justify-between"
                        initial={{ opacity: 0, x: isMobile ? 0 : -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="space-y-8">
                            <div>
                                <span className="text-anthropic-accent font-bold tracking-[0.2em] uppercase text-xs mb-4 block flex items-center gap-3">
                                    <span className="w-6 h-[1px] bg-anthropic-accent" />
                                    Contact
                                </span>
                                <h2 className="text-5xl md:text-6xl font-serif text-anthropic-text leading-tight">
                                    Let's Talk <span className="italic text-anthropic-secondary">Future.</span>
                                </h2>
                            </div>

                            <p className="text-anthropic-secondary max-w-md text-lg leading-relaxed">
                                Ready to upgrade your space? We bring 15+ years of precision and modern aesthetics to your project.
                            </p>
                        </div>

                        <div className="grid gap-8 mt-12">
                            <motion.div
                                className="group"
                                whileHover={{ x: 5 }}
                                transition={{ duration: 0.2 }}
                            >
                                <div className="flex items-center gap-5">
                                    <div className="w-10 h-10 rounded-full bg-white border border-anthropic-stone flex items-center justify-center text-anthropic-secondary group-hover:text-anthropic-accent transition-colors">
                                        <Phone size={18} />
                                    </div>
                                    <div>
                                        <h4 className="text-xs font-bold uppercase tracking-widest text-anthropic-secondary/60 mb-1">Call Us</h4>
                                        <a href="tel:+918885575733" onClick={() => triggerHaptic('medium')} className="text-xl md:text-2xl text-anthropic-text font-serif hover:text-anthropic-accent transition-colors">
                                            +91 88855 75733
                                        </a>
                                    </div>
                                </div>
                            </motion.div>

                            <motion.div
                                className="group"
                                whileHover={{ x: 5 }}
                                transition={{ duration: 0.2 }}
                            >
                                <div className="flex items-center gap-5">
                                    <div className="w-10 h-10 rounded-full bg-white border border-anthropic-stone flex items-center justify-center text-anthropic-secondary group-hover:text-anthropic-accent transition-colors">
                                        <Mail size={18} />
                                    </div>
                                    <div>
                                        <h4 className="text-xs font-bold uppercase tracking-widest text-anthropic-secondary/60 mb-1">Email Us</h4>
                                        <a href="mailto:venkatarajuandco@gmail.com" onClick={() => triggerHaptic('light')} className="text-lg md:text-xl text-anthropic-text font-serif hover:text-anthropic-accent transition-colors">
                                            venkatarajuandco@gmail.com
                                        </a>
                                    </div>
                                </div>
                            </motion.div>

                            <motion.div
                                className="group"
                                whileHover={{ x: 5 }}
                                transition={{ duration: 0.2 }}
                            >
                                <div className="flex items-center gap-5">
                                    <div className="w-10 h-10 rounded-full bg-white border border-anthropic-stone flex items-center justify-center text-anthropic-secondary group-hover:text-anthropic-accent transition-colors">
                                        <MapPin size={18} />
                                    </div>
                                    <div>
                                        <h4 className="text-xs font-bold uppercase tracking-widest text-anthropic-secondary/60 mb-1">Visit Us</h4>
                                        <p className="text-lg text-anthropic-text font-serif">Nizampet, Hyderabad.</p>
                                        <a href="https://maps.google.com/?q=IVR+Interiors" target="_blank" onClick={() => triggerHaptic('light')} className="inline-flex items-center gap-2 text-anthropic-accent mt-2 text-xs font-bold uppercase tracking-widest hover:text-anthropic-text transition-colors">
                                            View Map <ArrowRight size={12} />
                                        </a>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>

                    {/* Right Side: Clean Form */}
                    <motion.div
                        initial={{ opacity: 0, x: isMobile ? 0 : 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <div className="w-full max-w-lg mx-auto bg-white border border-anthropic-stone rounded-lg p-8 md:p-12 shadow-sm">
                            <h3 className="text-anthropic-text text-2xl font-serif mb-8 flex items-center gap-3">
                                Send A Request
                            </h3>

                            {status === 'success' ? (
                                <motion.div
                                    className="text-center py-12 space-y-6 relative overflow-hidden"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                >
                                    {/* Particle Confetti */}
                                    {particles.map((particle) => (
                                        <motion.div
                                            key={particle.id}
                                            initial={{ opacity: 1, x: 0, y: 0, scale: Math.random() * 0.5 + 0.5 }}
                                            animate={{ opacity: 0, x: particle.x * 20, y: particle.y * 20 - 100, rotate: Math.random() * 360 }}
                                            transition={{ duration: 1.5 + Math.random(), ease: "easeOut" }}
                                            style={{ backgroundColor: particle.color }}
                                            className="absolute top-1/2 left-1/2 w-2 h-2 rounded-full"
                                        />
                                    ))}

                                    <div className="flex justify-center mb-6">
                                        <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
                                            <CheckCircle className="w-8 h-8 text-green-600" />
                                        </div>
                                    </div>

                                    <div>
                                        <h4 className="text-2xl font-serif text-anthropic-text mb-2">Message Received</h4>
                                        <p className="text-anthropic-secondary text-sm">We'll be in touch shortly.</p>
                                    </div>

                                    <button
                                        onClick={() => {
                                            setStatus('idle')
                                            setTouched({ name: false, email: false, message: false })
                                            setParticles([])
                                        }}
                                        className="text-anthropic-accent hover:text-anthropic-text transition-colors text-xs font-bold uppercase tracking-widest mt-8 border-b border-transparent hover:border-anthropic-text"
                                    >
                                        Send Another Request
                                    </button>
                                </motion.div>
                            ) : (
                                <motion.form
                                    animate={shake ? { x: [-5, 5, -5, 5, 0] } : {}}
                                    transition={{ duration: 0.4 }}
                                    onSubmit={handleSubmit}
                                    className="space-y-6"
                                >
                                    <div className="space-y-5">
                                        {/* Name Input */}
                                        <div className="relative group">
                                            <label htmlFor="name" className="block text-xs font-bold uppercase tracking-widest mb-2 text-anthropic-text/60 group-focus-within:text-anthropic-accent transition-colors">Full Name</label>
                                            <input
                                                id="name"
                                                type="text"
                                                value={formData.name}
                                                onChange={(e) => {
                                                    setFormData(prev => ({ ...prev, name: e.target.value }))
                                                    if (touched.name) triggerHaptic('light')
                                                }}
                                                onBlur={() => handleBlur('name')}
                                                className={`w-full bg-anthropic-beige/30 border py-3 px-4 text-anthropic-text outline-none transition-all duration-300 rounded focus:bg-white
                                                    ${touched.name && errors.name
                                                        ? 'border-red-300 focus:border-red-500'
                                                        : 'border-anthropic-stone focus:border-anthropic-accent'}`}
                                                placeholder="Enter your name"
                                                disabled={status === 'submitting'}
                                            />
                                            <AnimatePresence>
                                                {touched.name && errors.name && (
                                                    <motion.p
                                                        initial={{ opacity: 0, height: 0 }}
                                                        animate={{ opacity: 1, height: 'auto' }}
                                                        exit={{ opacity: 0, height: 0 }}
                                                        className="text-red-500 text-[10px] uppercase font-bold mt-1 tracking-wider"
                                                    >
                                                        {errors.name}
                                                    </motion.p>
                                                )}
                                            </AnimatePresence>
                                        </div>

                                        {/* Email Input */}
                                        <div className="relative group">
                                            <label htmlFor="email" className="block text-xs font-bold uppercase tracking-widest mb-2 text-anthropic-text/60 group-focus-within:text-anthropic-accent transition-colors">Email Address</label>
                                            <input
                                                id="email"
                                                type="email"
                                                value={formData.email}
                                                onChange={(e) => {
                                                    setFormData(prev => ({ ...prev, email: e.target.value }))
                                                    if (touched.email) triggerHaptic('light')
                                                }}
                                                onBlur={() => handleBlur('email')}
                                                className={`w-full bg-anthropic-beige/30 border py-3 px-4 text-anthropic-text outline-none transition-all duration-300 rounded focus:bg-white
                                                    ${touched.email && errors.email
                                                        ? 'border-red-300 focus:border-red-500'
                                                        : 'border-anthropic-stone focus:border-anthropic-accent'}`}
                                                placeholder="name@example.com"
                                                disabled={status === 'submitting'}
                                            />
                                            <AnimatePresence>
                                                {touched.email && errors.email && (
                                                    <motion.p
                                                        initial={{ opacity: 0, height: 0 }}
                                                        animate={{ opacity: 1, height: 'auto' }}
                                                        exit={{ opacity: 0, height: 0 }}
                                                        className="text-red-500 text-[10px] uppercase font-bold mt-1 tracking-wider"
                                                    >
                                                        {errors.email}
                                                    </motion.p>
                                                )}
                                            </AnimatePresence>
                                        </div>

                                        {/* Message Input */}
                                        <div className="relative group">
                                            <label htmlFor="message" className="block text-xs font-bold uppercase tracking-widest mb-2 text-anthropic-text/60 group-focus-within:text-anthropic-accent transition-colors">Message</label>
                                            <textarea
                                                id="message"
                                                rows={4}
                                                value={formData.message}
                                                onChange={(e) => {
                                                    setFormData(prev => ({ ...prev, message: e.target.value }))
                                                    if (touched.message) triggerHaptic('light')
                                                }}
                                                onBlur={() => handleBlur('message')}
                                                className={`w-full bg-anthropic-beige/30 border py-3 px-4 text-anthropic-text outline-none transition-all duration-300 rounded resize-none focus:bg-white
                                                    ${touched.message && errors.message
                                                        ? 'border-red-300 focus:border-red-500'
                                                        : 'border-anthropic-stone focus:border-anthropic-accent'}`}
                                                placeholder="Tell us about your project"
                                                disabled={status === 'submitting'}
                                            />
                                            <AnimatePresence>
                                                {touched.message && errors.message && (
                                                    <motion.p
                                                        initial={{ opacity: 0, height: 0 }}
                                                        animate={{ opacity: 1, height: 'auto' }}
                                                        exit={{ opacity: 0, height: 0 }}
                                                        className="text-red-500 text-[10px] uppercase font-bold mt-1 tracking-wider"
                                                    >
                                                        {errors.message}
                                                    </motion.p>
                                                )}
                                            </AnimatePresence>
                                        </div>
                                    </div>

                                    {status === 'error' && (
                                        <motion.div
                                            className="flex items-center gap-3 p-3 bg-red-50 border border-red-200 rounded text-red-600"
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                        >
                                            <XCircle className="w-4 h-4 flex-shrink-0" />
                                            <p className="text-xs font-bold">{errorMessage}</p>
                                        </motion.div>
                                    )}

                                    <button
                                        type="submit"
                                        disabled={status === 'submitting'}
                                        className="w-full btn-primary h-14 rounded flex items-center justify-center gap-2 mt-4"
                                    >
                                        {status === 'submitting' ? (
                                            <>
                                                <Loader2 className="w-5 h-5 animate-spin" />
                                                Sending...
                                            </>
                                        ) : (
                                            <>
                                                Send Message
                                                <ArrowRight className="w-4 h-4" />
                                            </>
                                        )}
                                    </button>
                                </motion.form>
                            )}
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}

export default Contact
