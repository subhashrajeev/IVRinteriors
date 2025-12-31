import { ArrowRight, CheckCircle, XCircle, Loader2 } from 'lucide-react'
import { useState, type FormEvent } from 'react'
import { triggerHaptic } from '../utils/haptics'

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
        <section id="contact" className="bg-charcoal border-t border-white/5 overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen">

                {/* Left Side: The "Black" Box - Info */}
                <div className="p-12 md:p-24 flex flex-col justify-between relative">
                    <div className="space-y-8">
                        <div>
                            <span className="text-brand-green font-bold tracking-[0.3em] uppercase text-xs mb-4 block">Contact</span>
                            <h2 className="text-6xl md:text-7xl font-[Oswald] font-bold italic uppercase text-white leading-[0.9]">
                                Let's Talk <br /> <span className="text-white/30">Future.</span>
                            </h2>
                        </div>

                        <p className="text-white/60 max-w-md font-light text-lg leading-relaxed">
                            Ready to upgrade your space? We bring 15+ years of precision and modern aesthetics to your project.
                        </p>
                    </div>

                    <div className="grid gap-12 mt-20">
                        <div className="group">
                            <h4 className="text-sm font-bold uppercase tracking-widest text-white/40 mb-2 group-hover:text-brand-green transition-colors">Call Us</h4>
                            <a href="tel:+918885575733" onClick={() => triggerHaptic('medium')} className="text-2xl md:text-3xl text-white font-[Oswald] font-bold hover:text-brand-green transition-colors block">
                                +91 88855 75733
                            </a>
                        </div>
                        <div className="group">
                            <h4 className="text-sm font-bold uppercase tracking-widest text-white/40 mb-2 group-hover:text-brand-green transition-colors">Email Us</h4>
                            <a href="mailto:venkatarajuandco@gmail.com" onClick={() => triggerHaptic('light')} className="text-xl md:text-2xl text-white font-[Oswald] font-bold hover:text-brand-green transition-colors block">
                                venkatarajuandco@gmail.com
                            </a>
                        </div>
                        <div>
                            <h4 className="text-sm font-bold uppercase tracking-widest text-white/40 mb-2">Visit Us</h4>
                            <p className="text-lg text-white/80">Nizampet, Hyderabad.</p>
                            <a href="https://maps.google.com/?q=IVR+Interiors" target="_blank" onClick={() => triggerHaptic('light')} className="inline-flex items-center gap-2 text-brand-green mt-2 text-sm font-bold uppercase tracking-widest hover:text-white transition-colors">
                                View Map <ArrowRight size={14} />
                            </a>
                        </div>
                    </div>
                </div>

                {/* Right Side: The "White" Box (or lighter grey) - Form */}
                <div className="bg-white p-12 md:p-24 flex items-center">
                    <div className="w-full max-w-lg mx-auto">
                        <h3 className="text-charcoal text-4xl font-[Oswald] font-bold uppercase italic mb-10">Send A Request</h3>

                        {status === 'success' ? (
                            <div className="text-center py-12 space-y-4 animate-fade-in">
                                <CheckCircle className="w-16 h-16 text-brand-green mx-auto" />
                                <h4 className="text-2xl font-[Oswald] font-bold text-charcoal uppercase">Message Sent!</h4>
                                <p className="text-charcoal/60">We'll get back to you within 24 hours.</p>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-8">
                                <div className="group">
                                    <label className="block text-xs font-bold uppercase tracking-widest text-charcoal/50 mb-2 group-focus-within:text-brand-green transition-colors">Full Name</label>
                                    <input
                                        type="text"
                                        value={formData.name}
                                        onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                                        className="w-full bg-transparent border-b-2 border-charcoal/20 py-4 text-xl font-bold text-charcoal outline-none focus:border-brand-green transition-colors rounded-none placeholder:text-charcoal/20"
                                        placeholder="Enter your name"
                                        disabled={status === 'submitting'}
                                    />
                                </div>

                                <div className="group">
                                    <label className="block text-xs font-bold uppercase tracking-widest text-charcoal/50 mb-2 group-focus-within:text-brand-green transition-colors">Email Address</label>
                                    <input
                                        type="email"
                                        value={formData.email}
                                        onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                                        className="w-full bg-transparent border-b-2 border-charcoal/20 py-4 text-xl font-bold text-charcoal outline-none focus:border-brand-green transition-colors rounded-none placeholder:text-charcoal/20"
                                        placeholder="name@example.com"
                                        disabled={status === 'submitting'}
                                    />
                                </div>

                                <div className="group">
                                    <label className="block text-xs font-bold uppercase tracking-widest text-charcoal/50 mb-2 group-focus-within:text-brand-green transition-colors">Message</label>
                                    <textarea
                                        rows={3}
                                        value={formData.message}
                                        onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                                        className="w-full bg-transparent border-b-2 border-charcoal/20 py-4 text-xl font-bold text-charcoal outline-none focus:border-brand-green transition-colors rounded-none resize-none placeholder:text-charcoal/20"
                                        placeholder="Tell us about your project"
                                        disabled={status === 'submitting'}
                                    />
                                </div>

                                {status === 'error' && (
                                    <div className="flex items-center gap-3 p-4 bg-red-50 border border-red-200 rounded-lg animate-shake">
                                        <XCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
                                        <p className="text-red-600 text-sm font-medium">{errorMessage}</p>
                                    </div>
                                )}

                                <button
                                    type="submit"
                                    disabled={status === 'submitting'}
                                    className="w-full bg-charcoal text-white font-bold h-16 uppercase tracking-[0.2em] hover:bg-brand-green transition-colors duration-300 mt-8 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                                >
                                    {status === 'submitting' ? (
                                        <>
                                            <Loader2 className="w-5 h-5 animate-spin" />
                                            Sending...
                                        </>
                                    ) : (
                                        'Send Message'
                                    )}
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Contact
