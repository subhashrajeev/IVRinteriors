import { ArrowUp, Instagram, Youtube } from 'lucide-react'

const Footer = () => {
    const isCollectionsPage = window.location.pathname.startsWith('/surfaces')
    const homeAnchor = (id: string) => (isCollectionsPage ? `/#${id}` : `#${id}`)

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    return (
        <footer className="mt-10 bg-[#171411] pb-8 pt-16 text-[#f9f0e6]">
            <div className="shell">
                <div className="rounded-[34px] border border-white/10 bg-white/[0.03] px-6 py-8 md:px-8 md:py-10">
                    <div className="grid gap-10 lg:grid-cols-[1fr_0.9fr] lg:items-end">
                        <div>
                            <p className="text-caption text-[#d59474]">IVR Interiors</p>
                            <h2 className="mt-4 font-display text-[3.2rem] leading-none md:text-[4.5rem]">
                                Simple, stylish interiors for everyday living.
                            </h2>
                            <p className="mt-5 max-w-2xl text-sm leading-7 text-[#d8cdc1] md:text-base">
                                We design and complete home interiors in Hyderabad with clear planning, practical ideas, and quality finishing.
                            </p>
                        </div>

                        <div className="flex flex-col gap-4 sm:flex-row lg:justify-end">
                            <a href={homeAnchor('contact')} className="btn-primary">
                                Contact Us
                            </a>
                            <a href="/surfaces" className="btn-secondary border-white/15 bg-white/[0.04] text-paper">
                                View Materials
                            </a>
                        </div>
                    </div>

                    <div className="mt-10 grid gap-8 border-t border-white/10 pt-8 md:grid-cols-3">
                        <div>
                            <p className="text-caption text-[#d59474]">Navigate</p>
                            <div className="mt-4 space-y-3 text-sm text-[#d8cdc1]">
                                <a href={homeAnchor('projects')} className="block transition-colors hover:text-white">Portfolio</a>
                                <a href={homeAnchor('services')} className="block transition-colors hover:text-white">Services</a>
                                <a href={homeAnchor('about')} className="block transition-colors hover:text-white">About</a>
                                <a href={homeAnchor('contact')} className="block transition-colors hover:text-white">Contact</a>
                            </div>
                        </div>

                        <div>
                            <p className="text-caption text-[#d59474]">Connect</p>
                            <div className="mt-4 space-y-3 text-sm text-[#d8cdc1]">
                                <a href="tel:+918885575733" className="block transition-colors hover:text-white">+91 88855 75733</a>
                                <a href="mailto:venkatarajuandco@gmail.com" className="block transition-colors hover:text-white">
                                    venkatarajuandco@gmail.com
                                </a>
                                <p>Nizampet, Hyderabad</p>
                            </div>
                        </div>

                        <div>
                            <p className="text-caption text-[#d59474]">Follow</p>
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

                <div className="mt-6 flex flex-col items-start justify-between gap-4 text-sm text-[#a79a8d] md:flex-row md:items-center">
                    <p>Copyright {new Date().getFullYear()} IVR Interiors. All rights reserved.</p>
                    <button onClick={scrollToTop} className="inline-flex items-center gap-2 transition-colors hover:text-white">
                        Back to top
                        <ArrowUp className="h-4 w-4" />
                    </button>
                </div>
            </div>
        </footer>
    )
}

export default Footer
