import { Instagram, ArrowUp, Youtube } from 'lucide-react'
import { triggerHaptic } from '../utils/haptics'

const Footer = () => {
    const scrollToTop = () => {
        triggerHaptic('medium');
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    return (
        <footer className="bg-charcoal pt-24 pb-12 border-t border-white/10">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-24">

                    {/* Brand Column - Massive */}
                    <div className="col-span-1 md:col-span-2">
                        <h2 className="text-8xl md:text-[10rem] font-[Oswald] font-bold uppercase italic text-white/5 leading-[0.8] select-none">
                            IVR
                        </h2>
                    </div>

                    {/* Navigation - Industrial List */}
                    <div>
                        <h4 className="text-brand-green font-bold tracking-[0.2em] uppercase text-xs mb-8">Sitemap</h4>
                        <ul className="space-y-4">
                            {['Projects', 'About', 'Contact', 'Services'].map((item) => (
                                <li key={item}>
                                    <a href={`#${item.toLowerCase()}`} onClick={() => triggerHaptic('light')} className="text-white text-lg font-[Oswald] uppercase hover:text-brand-green transition-colors block w-fit hover:translate-x-2 transition-transform duration-300">
                                        {item}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Socials - Sharp Buttons */}
                    <div>
                        <h4 className="text-brand-green font-bold tracking-[0.2em] uppercase text-xs mb-8">Connect</h4>
                        <div className="flex gap-4">
                            <a href="https://www.instagram.com/ivr_interiors/?hl=en" target="_blank" rel="noopener noreferrer" onClick={() => triggerHaptic('light')} className="w-12 h-12 bg-white/5 flex items-center justify-center text-white hover:bg-brand-green hover:text-charcoal transition-colors duration-300">
                                <Instagram size={20} />
                            </a>
                            <a href="https://www.youtube.com/channel/UCX8qLuZl06_D15-ntVFfhBA" target="_blank" rel="noopener noreferrer" onClick={() => triggerHaptic('light')} className="w-12 h-12 bg-white/5 flex items-center justify-center text-white hover:bg-brand-green hover:text-charcoal transition-colors duration-300">
                                <Youtube size={20} />
                            </a>
                            <a href="https://wa.me/918885575733" target="_blank" rel="noopener noreferrer" onClick={() => triggerHaptic('light')} className="w-12 h-12 bg-white/5 flex items-center justify-center text-white hover:bg-brand-green hover:text-charcoal transition-colors duration-300">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="20"
                                    height="20"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                    className="lucide lucide-whatsapp"
                                >
                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar - Technical */}
                <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/10">
                    <p className="text-white/30 text-[10px] uppercase tracking-[0.2em] font-mono">
                        © 2025 IVR Interiors. All Rights Reserved.
                    </p>
                    <button onClick={scrollToTop} className="group flex items-center gap-2 text-white/50 hover:text-brand-green transition-colors uppercase tracking-widest text-xs font-bold mt-4 md:mt-0">
                        Back to Top
                        <ArrowUp size={14} className="group-hover:-translate-y-1 transition-transform duration-300" />
                    </button>
                </div>
            </div>
        </footer>
    )
}

export default Footer
