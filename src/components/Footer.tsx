import { ArrowUp, Instagram, Youtube } from 'lucide-react'

const Footer = () => {
    const isCollectionsPage = window.location.pathname.startsWith('/surfaces')
    const homeAnchor = (id: string) => (isCollectionsPage ? `/#${id}` : `#${id}`)

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    return (
        <footer className="mt-6 border-t border-white/8 bg-void pb-8 pt-16 text-paper">
            <div className="shell">
                <div className="vi-panel px-6 py-8 md:px-8 md:py-10">
                    <div className="grid gap-10 lg:grid-cols-[1fr_0.9fr] lg:items-end">
                        <div>
                            <p className="text-caption text-neon">IVR Interiors</p>
                            <h2 className="mt-4 font-display text-[3.2rem] uppercase leading-none md:text-[4.5rem]">
                                Interiors built for real life.
                            </h2>
                            <p className="mt-5 max-w-2xl text-sm leading-7 text-ink-soft md:text-base">
                                We design and complete home interiors in Hyderabad with clear planning, practical ideas, and quality finishing.
                            </p>
                        </div>

                        <div className="flex flex-col gap-4 sm:flex-row lg:justify-end">
                            <a href={homeAnchor('contact')} className="btn-primary">
                                Contact us
                            </a>
                            <a href="/surfaces" className="btn-secondary">
                                View materials
                            </a>
                        </div>
                    </div>

                    <div className="mt-10 grid gap-8 border-t border-white/10 pt-8 md:grid-cols-3">
                        <div>
                            <p className="text-caption text-neon">Navigate</p>
                            <div className="mt-4 space-y-3 text-sm text-ink-soft">
                                <a href={homeAnchor('projects')} className="block transition-colors hover:text-paper">
                                    Portfolio
                                </a>
                                <a href={homeAnchor('services')} className="block transition-colors hover:text-paper">
                                    Services
                                </a>
                                <a href={homeAnchor('about')} className="block transition-colors hover:text-paper">
                                    About
                                </a>
                                <a href={homeAnchor('contact')} className="block transition-colors hover:text-paper">
                                    Contact
                                </a>
                            </div>
                        </div>

                        <div>
                            <p className="text-caption text-neon">Connect</p>
                            <div className="mt-4 space-y-3 text-sm text-ink-soft">
                                <a href="tel:+918885575733" className="block transition-colors hover:text-paper">
                                    +91 88855 75733
                                </a>
                                <a href="mailto:venkatarajuandco@gmail.com" className="block transition-colors hover:text-paper">
                                    venkatarajuandco@gmail.com
                                </a>
                                <p>Nizampet, Hyderabad</p>
                            </div>
                        </div>

                        <div>
                            <p className="text-caption text-neon">Follow</p>
                            <div className="mt-4 flex items-center gap-3">
                                <a
                                    href="https://www.instagram.com/ivr_interiors/?hl=en"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex h-11 w-11 items-center justify-center rounded-full border border-white/12 bg-white/[0.06] transition-colors hover:bg-white/[0.12]"
                                >
                                    <Instagram className="h-5 w-5" />
                                </a>
                                <a
                                    href="https://www.youtube.com/channel/UCX8qLuZl06_D15-ntVFfhBA"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex h-11 w-11 items-center justify-center rounded-full border border-white/12 bg-white/[0.06] transition-colors hover:bg-white/[0.12]"
                                >
                                    <Youtube className="h-5 w-5" />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-6 flex flex-col items-start justify-between gap-4 text-sm text-ink-soft md:flex-row md:items-center">
                    <p>Copyright {new Date().getFullYear()} IVR Interiors. All rights reserved.</p>
                    <button onClick={scrollToTop} className="inline-flex items-center gap-2 transition-colors hover:text-paper">
                        Back to top
                        <ArrowUp className="h-4 w-4" />
                    </button>
                </div>
            </div>
        </footer>
    )
}

export default Footer