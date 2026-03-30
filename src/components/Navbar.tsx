import { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false)
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const isCollectionsPage = window.location.pathname.startsWith('/surfaces')
    const homeAnchor = (id: string) => (isCollectionsPage ? `/#${id}` : `#${id}`)

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 24)
        }

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
            if (event.key === 'Escape') {
                setIsMobileMenuOpen(false)
            }
        }

        window.addEventListener('keydown', onKeyDown)
        return () => window.removeEventListener('keydown', onKeyDown)
    }, [])

    const navLinks = [
        { name: 'Portfolio', href: homeAnchor('projects') },
        { name: 'Services', href: homeAnchor('services') },
        { name: 'About', href: homeAnchor('about') },
        { name: 'Contact', href: homeAnchor('contact') },
    ]

    return (
        <>
            <nav
                className={`fixed left-0 right-0 top-0 z-50 transition-all duration-500 ${isScrolled ? 'border-b py-3' : 'py-5'}`}
                style={{
                    borderColor: isScrolled ? 'rgba(23, 20, 17, 0.08)' : 'transparent',
                    background: isScrolled ? 'rgba(244, 237, 228, 0.72)' : 'transparent',
                    backdropFilter: isScrolled ? 'blur(18px)' : 'none',
                }}
            >
                <div className="shell">
                    <div className="flex items-center justify-between gap-4">
                        <a href="/" className="flex items-center gap-3">
                            <div className="flex h-11 w-11 items-center justify-center rounded-full border border-ink/10 bg-paper/80 shadow-[0_10px_20px_rgba(23,20,17,0.06)]">
                                <span className="font-mono text-xs tracking-[0.28em] text-accent">IVR</span>
                            </div>
                            <div>
                                <p className="font-display text-[1.75rem] leading-none text-ink">IVR Interiors</p>
                                <p className="text-[0.68rem] uppercase tracking-[0.34em] text-ink-soft">Hyderabad Homes</p>
                            </div>
                        </a>

                        <div className="panel hidden items-center gap-1 px-2 py-2 md:flex">
                            {navLinks.map((link) => (
                                <a key={link.name} href={link.href} className="nav-link">
                                    {link.name}
                                </a>
                            ))}
                            <a href="/surfaces" className={`nav-link ${isCollectionsPage ? 'text-ink' : ''}`}>
                                Collections
                            </a>
                        </div>

                        <div className="hidden items-center gap-3 md:flex">
                            <a href="tel:+918885575733" className="soft-chip">
                                +91 88855 75733
                            </a>
                            <a href={homeAnchor('contact')} className="btn-primary">
                                Book Free Site Visit
                            </a>
                        </div>

                        <button
                            className="flex h-11 w-11 items-center justify-center rounded-full border border-ink/10 bg-paper/80 text-ink transition-colors hover:bg-paper md:hidden"
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
                className={`fixed inset-0 z-40 transition-all duration-500 md:hidden ${
                    isMobileMenuOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
                }`}
            >
                <div
                    className="absolute inset-0 bg-ink/35 backdrop-blur-sm"
                    onClick={() => setIsMobileMenuOpen(false)}
                />

                <div
                    className={`absolute bottom-0 left-0 right-0 rounded-t-[34px] border-x border-t border-ink/10 bg-paper/95 px-5 pb-8 pt-4 shadow-[0_-20px_60px_rgba(23,20,17,0.12)] transition-transform duration-500 ${
                        isMobileMenuOpen ? 'translate-y-0' : 'translate-y-full'
                    }`}
                >
                    <div className="mx-auto max-w-sm">
                        <div className="mx-auto mb-8 h-1.5 w-12 rounded-full bg-ink/10" />
                        <div className="mb-6">
                            <p className="text-caption text-accent">Menu</p>
                            <p className="mt-3 font-display text-4xl leading-none text-ink">See our work.</p>
                        </div>

                        <div className="space-y-2.5">
                            {navLinks.map((link, index) => (
                                <a
                                    key={link.name}
                                    href={link.href}
                                    className="panel flex items-center justify-between px-5 py-4"
                                    style={{
                                        opacity: isMobileMenuOpen ? 1 : 0,
                                        transform: isMobileMenuOpen ? 'translateY(0)' : 'translateY(20px)',
                                        transition: `all 0.3s ease ${index * 0.05}s`,
                                    }}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    <span className="font-display text-[1.9rem] leading-none text-ink">{link.name}</span>
                                    <div className="flex h-10 w-10 items-center justify-center rounded-full border border-ink/10 bg-paper">
                                        <svg className="h-4 w-4 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </div>
                                </a>
                            ))}

                            <a
                                href="/surfaces"
                                className="panel flex items-center justify-between px-5 py-4"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                <span className="font-display text-[1.9rem] leading-none text-ink">Collections</span>
                                <div className="flex h-10 w-10 items-center justify-center rounded-full border border-ink/10 bg-paper">
                                    <svg className="h-4 w-4 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </div>
                            </a>
                        </div>

                        <div className="mt-6 space-y-3 border-t border-ink/8 pt-6">
                            <a href="tel:+918885575733" className="soft-chip">
                                Call us
                            </a>
                            <a
                                href={homeAnchor('contact')}
                                className="btn-primary flex w-full justify-center"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                Contact Us
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Navbar
