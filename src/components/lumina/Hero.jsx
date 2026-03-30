const categoryHighlights = [
    { label: 'Wood', value: '10+ grains' },
    { label: 'Stone', value: '10 neutral shades' },
    { label: 'Metallic', value: 'Accent finishes' },
]

const Hero = () => {
    const scrollToCatalog = () => {
        document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth' })
    }

    return (
        <section className="shell section-padding pt-28">
            <div className="grid items-center gap-12 xl:grid-cols-[0.95fr_1.05fr]">
                <div>
                    <span className="section-rule">Material collection</span>
                    <h1 className="section-heading text-balance text-ink">
                        Laminates for
                        <span className="block italic text-accent">kitchens, wardrobes, and more.</span>
                    </h1>
                    <p className="mt-6 max-w-xl text-base leading-7 text-ink-soft md:text-lg">
                        Browse laminate options for kitchens, wardrobes, wall panels, and other interior work.
                        This page helps you shortlist finishes before talking to our team.
                    </p>

                    <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                        <button onClick={scrollToCatalog} className="btn-primary">
                            View Options
                        </button>
                        <a href="/#contact" className="btn-secondary">
                            Talk to Our Team
                        </a>
                    </div>

                    <div className="mt-10 grid gap-4 sm:grid-cols-3">
                        {categoryHighlights.map((item) => (
                            <div key={item.label} className="metric-card">
                                <p className="text-caption text-accent">{item.label}</p>
                                <p className="mt-3 font-display text-[2rem] leading-none text-ink">{item.value}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="relative">
                    <div className="media-frame aspect-[1.18/1] overflow-hidden bg-[#ddd2c7]">
                        <img
                            src="/lumina/Designer_hand_pointing_2k_202601251623.jpeg"
                            alt="Designer reviewing laminate swatches on a design board"
                            className="h-full w-full object-cover"
                        />
                    </div>

                    <div className="panel absolute -bottom-5 left-6 max-w-sm px-5 py-5">
                        <p className="text-caption text-accent">Why this page helps</p>
                        <p className="mt-3 font-display text-[2rem] leading-none text-ink">
                            Compare finishes before your first meeting.
                        </p>
                        <p className="mt-3 text-sm leading-6 text-ink-soft">
                            Pick the colours and textures you like, then we can help you use them in your home.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Hero
