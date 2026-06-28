import { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false)
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const isCollectionsPage = window.location.pathname.startsWith('/surfaces')
    const homeAnchor = (id: string) => (isCollectionsPage ? `/#${id}` : `#${id}`)

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 20)
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    useEffect(() => {
        document.body.style.overflow = isMobileMenuOpen ? 'hidden' : ''
        return () => {
            document.body.style.overflow = ''
        }
    }, [isMobileMenuOpen])

    useEffect(() => {
        const onKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') setIsMobileMenuOpen(false)
        }
        window.addEventListener('keydown', onKeyDown)
        return () => window.removeEventListener('keydown', onKeyDown)
    }, [])

    const navLinks = [
        { name: 'Portfolio', href: homeAnchor('projects') },
        { name: 'Services', href: homeAnchor('services') },
        { name: 'About', href: homeAnchor('about') },
        { name: 'Contact', href: homeAnchor('contact') },
        { name: 'Materials', href: '/surfaces' },
    ]

    return (
        <>
            <nav
                className={`fixed left-0 right-0 top-0 z-50 transition-all duration-500 ${isScrolled ? 'vi-nav-scrolled py-3' : 'py-5 md:py-6'}`}
            >
                <div className="shell">
                    <div className="flex items-center justify-between gap-4">
                        <a href="/" className="group flex items-center gap-3">
                            <span className="font-display text-2xl uppercase tracking-[0.12em] text-paper md:text-3xl">
                                IVR
                            </span>
                            <span className="hidden text-[0.65rem] font-medium uppercase tracking-[0.28em] text-ink-soft sm:inline">
                                Interiors
                            </span>
                        </a>

                        <div className="hidden items-center gap-2 lg:flex">
                            {navLinks.slice(0, 4).map((link) => (
                                <a key={link.name} href={link.href} className="nav-link">
                                    {link.name}
                                </a>
                            ))}
                            <a href="/surfaces" className={`nav-link ${isCollectionsPage ? 'text-paper' : ''}`}>
                                Materials
                            </a>
                        </div>

                        <div className="hidden items-center gap-3 md:flex">
                            <a href={homeAnchor('contact')} className="btn-primary px-5 py-2.5 text-xs uppercase tracking-[0.14em]">
                                Book visit
                            </a>
                        </div>

                        <button
                            className="flex h-11 w-11 items-center justify-center rounded-full border border-white/12 bg-white/5 text-paper backdrop-blur-md transition hover:bg-white/10 lg:hidden"
                            onClick={() => setIsMobileMenuOpen((current) => !current)}
                            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
                            aria-expanded={isMobileMenuOpen}
                        >
                            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                        </button>
                    </div>
                </div>
            </nav>

            <div
                className={`fixed inset-0 z-[60] bg-void/90 backdrop-blur-xl transition-all duration-500 lg:hidden ${
                    isMobileMenuOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
                }`}
            >
                <div className="flex h-full flex-col px-6 pb-10 pt-24">
                    <p className="text-caption text-neon">Menu</p>
                    <div className="mt-8 flex flex-1 flex-col gap-2">
                        {navLinks.map((link, index) => (
                            <a
                                key={link.name}
                                href={link.href}
                                className="vi-panel px-5 py-5 font-display text-3xl uppercase tracking-tight text-paper"
                                style={{
                                    opacity: isMobileMenuOpen ? 1 : 0,
                                    transform: isMobileMenuOpen ? 'translateY(0)' : 'translateY(16px)',
                                    transition: `all 0.35s ease ${index * 0.05}s`,
                                }}
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                {link.name}
                            </a>
                        ))}
                    </div>
                    <a
                        href={homeAnchor('contact')}
                        className="btn-primary w-full justify-center"
                        onClick={() => setIsMobileMenuOpen(false)}
                    >
                        Book free site visit
                    </a>
                </div>
            </div>
        </>
    )
}

export default Navbar