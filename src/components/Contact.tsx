import { ArrowRight, CheckCircle, Clock3, Loader2, Mail, MapPin, Phone, XCircle } from 'lucide-react'
import { useState, type FormEvent } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

const WEB3FORMS_ACCESS_KEY = '92a287e4-5cef-4a4d-9ea4-96d2091c9dbc'
const projectTypes = ['2BHK', '3BHK / 4BHK', 'Villa', 'Kitchen / Wardrobe', 'Renovation']

interface FormData {
    name: string
    email: string
    phone: string
    projectType: string
    message: string
}

type FormStatus = 'idle' | 'submitting' | 'success' | 'error'

const Contact = () => {
    const [formData, setFormData] = useState<FormData>({
        name: '',
        email: '',
        phone: '',
        projectType: '',
        message: '',
    })
    const [touched, setTouched] = useState<Record<keyof FormData, boolean>>({
        name: false,
        email: false,
        phone: false,
        projectType: false,
        message: false,
    })
    const [status, setStatus] = useState<FormStatus>('idle')
    const [errorMessage, setErrorMessage] = useState('')

    const validateEmail = (email: string) =>
        String(email)
            .toLowerCase()
            .match(
                /^(([^\u003c\u003e()[\]\\.,;:\s@"]+(\.[^\u003c\u003e()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            )

    const validatePhone = (phone: string) => phone.replace(/\D/g, '').length >= 10

    const errors = {
        name: !formData.name.trim() ? 'Name is required' : '',
        email: !formData.email.trim() ? 'Email is required' : !validateEmail(formData.email) ? 'Enter a valid email address' : '',
        phone: !formData.phone.trim() ? 'Phone number is required' : !validatePhone(formData.phone) ? 'Enter a valid phone number' : '',
        projectType: !formData.projectType ? 'Select a project type' : '',
        message: !formData.message.trim() ? 'Tell us a bit about the project' : '',
    }

    const handleBlur = (field: keyof FormData) => {
        setTouched((previous) => ({ ...previous, [field]: true }))
    }

    const updateField = (field: keyof FormData, value: string) => {
        setFormData((previous) => ({ ...previous, [field]: value }))
    }

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault()
        setTouched({ name: true, email: true, phone: true, projectType: true, message: true })

        const hasErrors = Object.values(errors).some(Boolean)
        if (hasErrors) {
            setStatus('error')
            setErrorMessage('Please fix the highlighted fields and try again.')
            return
        }

        setStatus('submitting')

        try {
            const response = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                },
                body: JSON.stringify({
                    access_key: WEB3FORMS_ACCESS_KEY,
                    name: formData.name,
                    email: formData.email,
                    phone: formData.phone,
                    project_type: formData.projectType,
                    message: formData.message,
                    subject: `New Consultation Request from ${formData.name} - IVR Interiors`,
                    from_name: 'IVR Interiors Website',
                }),
            })

            const result = await response.json()

            if (!result.success) {
                throw new Error(result.message || 'Something went wrong')
            }

            setStatus('success')
            setFormData({ name: '', email: '', phone: '', projectType: '', message: '' })
            setTouched({ name: false, email: false, phone: false, projectType: false, message: false })
            setTimeout(() => setStatus('idle'), 5000)
        } catch (error) {
            setStatus('error')
            setErrorMessage(error instanceof Error ? error.message : 'Failed to submit. Please try again.')
        }
    }

    return (
        <section id="contact" className="section-padding">
            <div className="shell">
                <div className="grid gap-8 xl:grid-cols-[0.82fr_1.18fr]">
                    <div className="panel-strong flex flex-col gap-6 px-6 py-7 md:px-8 md:py-9">
                        <div>
                            <span className="section-rule">Start your project</span>
                            <h2 className="section-heading text-balance text-ink">Tell us what work you need.</h2>
                            <p className="mt-6 text-base leading-7 text-ink-soft md:text-lg">
                                Whether you need full home interiors, a kitchen, wardrobes, or renovation work, we will understand your requirement and guide you on the next step.
                            </p>
                        </div>

                        <div className="grid gap-4">
                            <div className="panel flex items-start gap-4 px-5 py-5">
                                <Phone className="mt-1 h-5 w-5 text-accent" />
                                <div>
                                    <p className="text-caption text-accent">Call us</p>
                                    <a href="tel:+918885575733" className="mt-2 block font-display text-[2rem] leading-none text-ink">
                                        +91 88855 75733
                                    </a>
                                </div>
                            </div>

                            <div className="panel flex items-start gap-4 px-5 py-5">
                                <Mail className="mt-1 h-5 w-5 text-accent" />
                                <div>
                                    <p className="text-caption text-accent">Email</p>
                                    <a href="mailto:venkatarajuandco@gmail.com" className="mt-2 block text-sm text-ink-soft md:text-base">
                                        venkatarajuandco@gmail.com
                                    </a>
                                </div>
                            </div>

                            <div className="panel flex items-start gap-4 px-5 py-5">
                                <MapPin className="mt-1 h-5 w-5 text-accent" />
                                <div>
                                    <p className="text-caption text-accent">Location</p>
                                    <p className="mt-2 text-sm text-ink-soft md:text-base">Nizampet, Hyderabad</p>
                                </div>
                            </div>

                            <div className="panel flex items-start gap-4 px-5 py-5">
                                <Clock3 className="mt-1 h-5 w-5 text-accent" />
                                <div>
                                    <p className="text-caption text-accent">Reply time</p>
                                    <p className="mt-2 text-sm text-ink-soft md:text-base">Usually within a few working hours.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, y: 26 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-80px' }}
                        transition={{ duration: 0.6 }}
                        className="panel-strong px-6 py-7 md:px-8 md:py-9"
                    >
                        {status === 'success' ? (
                            <div className="flex min-h-[28rem] flex-col items-center justify-center text-center">
                                <div className="flex h-18 w-18 items-center justify-center rounded-full bg-green-500/12 text-green-600">
                                    <CheckCircle className="h-9 w-9" />
                                </div>
                                <h3 className="mt-6 font-display text-[3rem] leading-none text-ink">We got your request.</h3>
                                <p className="mt-4 max-w-xl text-base leading-7 text-ink-soft md:text-lg">
                                    Our team will contact you shortly to understand the space, budget, and next steps.
                                </p>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-5">
                                <div className="grid gap-5 md:grid-cols-2">
                                    <div className="field-shell">
                                        <label className="text-caption text-accent">Name</label>
                                        <input
                                            type="text"
                                            value={formData.name}
                                            onChange={(event) => updateField('name', event.target.value)}
                                            onBlur={() => handleBlur('name')}
                                            className="mt-3 w-full bg-transparent text-base text-ink outline-none"
                                            placeholder="Your full name"
                                        />
                                        <AnimatePresence>
                                            {touched.name && errors.name && (
                                                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="mt-3 text-sm text-red-500">
                                                    {errors.name}
                                                </motion.p>
                                            )}
                                        </AnimatePresence>
                                    </div>

                                    <div className="field-shell">
                                        <label className="text-caption text-accent">Email</label>
                                        <input
                                            type="email"
                                            value={formData.email}
                                            onChange={(event) => updateField('email', event.target.value)}
                                            onBlur={() => handleBlur('email')}
                                            className="mt-3 w-full bg-transparent text-base text-ink outline-none"
                                            placeholder="name@example.com"
                                        />
                                        <AnimatePresence>
                                            {touched.email && errors.email && (
                                                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="mt-3 text-sm text-red-500">
                                                    {errors.email}
                                                </motion.p>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                </div>

                                <div className="grid gap-5 md:grid-cols-[0.9fr_1.1fr]">
                                    <div className="field-shell">
                                        <label className="text-caption text-accent">Phone</label>
                                        <input
                                            type="tel"
                                            value={formData.phone}
                                            onChange={(event) => updateField('phone', event.target.value)}
                                            onBlur={() => handleBlur('phone')}
                                            className="mt-3 w-full bg-transparent text-base text-ink outline-none"
                                            placeholder="+91"
                                        />
                                        <AnimatePresence>
                                            {touched.phone && errors.phone && (
                                                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="mt-3 text-sm text-red-500">
                                                    {errors.phone}
                                                </motion.p>
                                            )}
                                        </AnimatePresence>
                                    </div>

                                    <div className="field-shell">
                                        <label className="text-caption text-accent">Project type</label>
                                        <select
                                            value={formData.projectType}
                                            onChange={(event) => updateField('projectType', event.target.value)}
                                            onBlur={() => handleBlur('projectType')}
                                            className="mt-3 w-full bg-transparent text-base text-ink outline-none"
                                        >
                                            <option value="">Select one</option>
                                            {projectTypes.map((type) => (
                                                <option key={type} value={type}>
                                                    {type}
                                                </option>
                                            ))}
                                        </select>
                                        <AnimatePresence>
                                            {touched.projectType && errors.projectType && (
                                                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="mt-3 text-sm text-red-500">
                                                    {errors.projectType}
                                                </motion.p>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                </div>

                                <div className="field-shell">
                                    <label className="text-caption text-accent">Project notes</label>
                                    <textarea
                                        rows={6}
                                        value={formData.message}
                                        onChange={(event) => updateField('message', event.target.value)}
                                        onBlur={() => handleBlur('message')}
                                        className="mt-3 w-full resize-none bg-transparent text-base leading-7 text-ink outline-none"
                                        placeholder="Tell us what you need, which area of the home it is, and when you want to start."
                                    />
                                    <AnimatePresence>
                                        {touched.message && errors.message && (
                                            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="mt-3 text-sm text-red-500">
                                                {errors.message}
                                            </motion.p>
                                        )}
                                    </AnimatePresence>
                                </div>

                                {status === 'error' && (
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className="flex items-center gap-2 rounded-full border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300"
                                        aria-live="polite"
                                    >
                                        <XCircle className="h-4 w-4" />
                                        {errorMessage}
                                    </motion.div>
                                )}

                                <button type="submit" disabled={status === 'submitting'} className="btn-primary w-full justify-center">
                                    {status === 'submitting' ? (
                                        <>
                                            <Loader2 className="h-4 w-4 animate-spin" />
                                            Sending your request...
                                        </>
                                    ) : (
                                        <>
                                            Send Request
                                            <ArrowRight className="h-4 w-4" />
                                        </>
                                    )}
                                </button>
                            </form>
                        )}
                    </motion.div>
                </div>
            </div>
        </section>
    )
}

export default Contact
