import { ArrowRight } from 'lucide-react'
import { triggerHaptic } from '../utils/haptics'

const Contact = () => {
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

                        <form className="space-y-8">
                            <div className="group">
                                <label className="block text-xs font-bold uppercase tracking-widest text-charcoal/50 mb-2 group-focus-within:text-brand-green transition-colors">Full Name</label>
                                <input
                                    type="text"
                                    className="w-full bg-transparent border-b-2 border-charcoal/20 py-4 text-xl font-bold text-charcoal outline-none focus:border-brand-green transition-colors rounded-none placeholder:text-charcoal/20"
                                    placeholder="Enter your name"
                                />
                            </div>

                            <div className="group">
                                <label className="block text-xs font-bold uppercase tracking-widest text-charcoal/50 mb-2 group-focus-within:text-brand-green transition-colors">Email Address</label>
                                <input
                                    type="email"
                                    className="w-full bg-transparent border-b-2 border-charcoal/20 py-4 text-xl font-bold text-charcoal outline-none focus:border-brand-green transition-colors rounded-none placeholder:text-charcoal/20"
                                    placeholder="name@example.com"
                                />
                            </div>

                            <div className="group">
                                <label className="block text-xs font-bold uppercase tracking-widest text-charcoal/50 mb-2 group-focus-within:text-brand-green transition-colors">Message</label>
                                <textarea
                                    rows={3}
                                    className="w-full bg-transparent border-b-2 border-charcoal/20 py-4 text-xl font-bold text-charcoal outline-none focus:border-brand-green transition-colors rounded-none resize-none placeholder:text-charcoal/20"
                                    placeholder="Tell us about your project"
                                />
                            </div>

                            <button type="submit" onClick={() => triggerHaptic('heavy')} className="w-full bg-charcoal text-white font-bold h-16 uppercase tracking-[0.2em] hover:bg-brand-green transition-colors duration-300 mt-8">
                                Send Message
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Contact
