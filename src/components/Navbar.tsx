import { useState, useEffect } from 'react'
import { Menu, X, Instagram, Youtube } from 'lucide-react'
import { triggerHaptic } from '../utils/haptics'

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false)
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    // Prevent scrolling when mobile menu is open
    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = 'hidden'
            window.dispatchEvent(new CustomEvent('lenis-stop'))
        } else {
            document.body.style.overflow = ''
            window.dispatchEvent(new CustomEvent('lenis-start'))
        }
        return () => {
            document.body.style.overflow = ''
            window.dispatchEvent(new CustomEvent('lenis-start'))
        }
    }, [isMobileMenuOpen])

    return (
        <>
            <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-charcoal/90 backdrop-blur-md py-4 border-b border-white/10' : 'bg-transparent py-8'}`}>
                <div className="container mx-auto px-6 flex justify-between items-center">

                    {/* Logo - Text Only, Bold, Sharp - Static */}
                    <a href="/" className="font-bold font-[Oswald] tracking-tighter italic text-white flex gap-2 items-center">
                        <div className="relative flex text-4xl md:text-5xl">
                            {['I', 'V', 'R'].map((char, index) => (
                                <span key={index} className="text-brand-green pr-2">
                                    {char}
                                </span>
                            ))}
                        </div>
                        <span className="text-xl md:text-2xl text-brand-green">INTERIORS</span>
                    </a>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex items-center gap-12">
                        {['Projects', 'Services', 'About', 'Contact'].map((item) => (
                            <a
                                key={item}
                                href={`#${item.toLowerCase()}`}
                                className="text-sm uppercase tracking-[0.2em] font-medium text-white/70 hover:text-brand-green transition-colors duration-200"
                            >
                                {item}
                            </a>
                        ))}

                        {/* CTA Button - Sharp, Solid */}
                        <button
                            onClick={() => {
                                triggerHaptic('medium');
                                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                            }}
                            className="btn-primary text-xs py-3 px-6"
                        >
                            Book a Call
                        </button>
                    </div>

                    {/* Mobile Menu Toggle */}
                    <button className="md:hidden text-white" onClick={() => {
                        triggerHaptic('medium');
                        setIsMobileMenuOpen(!isMobileMenuOpen);
                    }}>
                        {isMobileMenuOpen ? <X size={32} /> : <Menu size={32} />}
                    </button>
                </div>
            </nav>

            {/* Mobile Menu Overlay - Outside nav to ensure full viewport coverage */}
            <div className={`fixed inset-0 w-screen h-[100dvh] bg-[#050505] z-[60] flex flex-col items-center justify-center gap-10 transition-transform duration-500 md:hidden ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                {/* Back Arrow - Top Left */}
                <button
                    className="absolute top-8 left-6 text-white hover:text-brand-green transition-colors p-2"
                    onClick={() => {
                        triggerHaptic('light');
                        setIsMobileMenuOpen(false);
                    }}
                    aria-label="Close menu"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M19 12H5" />
                        <path d="m12 19-7-7 7-7" />
                    </svg>
                </button>

                {['Projects', 'Services', 'About', 'Contact'].map((item) => (
                    <a
                        key={item}
                        href={`#${item.toLowerCase()}`}
                        className="text-4xl font-[Oswald] font-bold uppercase italic text-white hover:text-brand-green transition-colors"
                        onClick={() => {
                            triggerHaptic('light');
                            setIsMobileMenuOpen(false);
                        }}
                    >
                        {item}
                    </a>
                ))}
            </div>

            {/* Social Sidebar */}
            <div className="hidden md:flex fixed right-8 top-1/2 -translate-y-1/2 z-50 flex-col gap-6 items-center">
                <div className="w-[1px] h-24 bg-white/20"></div>

                <a href="https://www.instagram.com/ivr_interiors/?hl=en" target="_blank" rel="noopener noreferrer" className="text-white hover:text-brand-green transition-colors duration-200" aria-label="Instagram">
                    <Instagram size={20} strokeWidth={1.5} />
                </a>
                <a href="https://www.youtube.com/channel/UCX8qLuZl06_D15-ntVFfhBA" target="_blank" rel="noopener noreferrer" className="text-white hover:text-brand-green transition-colors duration-200" aria-label="YouTube">
                    <Youtube size={20} strokeWidth={1.5} />
                </a>
                <a href="https://wa.me/918885575733" target="_blank" rel="noopener noreferrer" className="text-white hover:text-brand-green transition-colors duration-200" aria-label="WhatsApp">
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

                <div className="w-[1px] h-24 bg-white/20"></div>
            </div>
        </>
    )
}

export default Navbar
