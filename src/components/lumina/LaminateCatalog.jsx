import React, { useMemo, useState } from 'react'
import { categories, laminates } from '../../data/laminates'
import LaminateCard from './LaminateCard'

const LaminateCatalog = () => {
    const [searchTerm, setSearchTerm] = useState('')
    const [selectedCategory, setSelectedCategory] = useState('All')
    const [selectedLaminate, setSelectedLaminate] = useState(null)

    const filteredLaminates = useMemo(() => {
        return laminates.filter((item) => {
            const matchesSearch =
                item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.texture.toLowerCase().includes(searchTerm.toLowerCase())
            const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory
            return matchesSearch && matchesCategory
        })
    }, [searchTerm, selectedCategory])

    return (
        <section id="catalog" className="shell section-padding pt-8">
            <div className="mb-10 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
                <div>
                    <span className="section-rule">The collection</span>
                    <h2 className="text-headline text-ink">Find a laminate that suits your home.</h2>
                    <p className="mt-4 max-w-2xl text-base leading-7 text-ink-soft">
                        These laminate options can be used for kitchens, wardrobes, wall panels, and custom units.
                        Use the search and filters to make a shortlist.
                    </p>
                </div>

                <div className="panel flex min-w-[17rem] items-center justify-between px-5 py-4 text-sm text-ink-soft">
                    <span>Results</span>
                    <span className="font-display text-3xl leading-none text-ink">{filteredLaminates.length}</span>
                </div>
            </div>

            <div className="grid gap-4 lg:grid-cols-[0.72fr_1.28fr] lg:items-start">
                <div className="panel-strong px-5 py-5 md:px-6 md:py-6 lg:sticky lg:top-28">
                    <label className="text-caption text-accent">Search surfaces</label>
                    <input
                        type="text"
                        placeholder="Search by name or texture..."
                        value={searchTerm}
                        onChange={(event) => setSearchTerm(event.target.value)}
                        className="mt-3 w-full rounded-full border border-ink/10 bg-paper px-4 py-3 text-sm text-ink outline-none"
                    />

                    <div className="mt-6 flex flex-wrap gap-2">
                        {categories.map((category) => (
                            <button
                                key={category}
                                onClick={() => setSelectedCategory(category)}
                                className={`rounded-full px-4 py-2 text-sm transition-all duration-300 ${
                                    selectedCategory === category ? 'bg-ink text-paper' : 'bg-paper text-ink-soft'
                                }`}
                            >
                                {category}
                            </button>
                        ))}
                    </div>

                    <div className="mt-6 rounded-[24px] bg-forest px-5 py-5 text-paper">
                        <p className="text-caption text-paper/70">How to use this</p>
                        <p className="mt-3 font-display text-[2rem] leading-none">Pick what you like, then discuss it with us.</p>
                        <p className="mt-3 text-sm leading-6 text-paper/80">
                            We can help you match these finishes with your kitchen, wardrobes, TV unit, and the rest of the home.
                        </p>
                    </div>
                </div>

                <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                    {filteredLaminates.map((item) => (
                        <LaminateCard key={item.id} data={item} onSelect={setSelectedLaminate} />
                    ))}
                </div>
            </div>

            {selectedLaminate && (
                <div
                    className="fixed inset-0 z-[130] flex items-center justify-center bg-ink/55 px-4 py-6 backdrop-blur-lg"
                    onClick={() => setSelectedLaminate(null)}
                >
                    <div
                        onClick={(event) => event.stopPropagation()}
                        className="panel-strong grid max-h-[92vh] w-full max-w-4xl overflow-hidden lg:grid-cols-[0.95fr_1.05fr]"
                    >
                        <div
                            className="min-h-[18rem]"
                            style={{
                                background: `linear-gradient(160deg, rgba(255,255,255,0.34), rgba(255,255,255,0.05)), ${selectedLaminate.color}`,
                            }}
                        >
                            <div className="h-full bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.3),transparent_34%),linear-gradient(180deg,transparent_20%,rgba(23,20,17,0.08)_100%)]" />
                        </div>

                        <div className="overflow-y-auto px-6 py-7 md:px-8 md:py-9">
                            <div className="flex items-start justify-between gap-4">
                                <div>
                                    <p className="text-caption text-accent">{selectedLaminate.category}</p>
                                    <h3 className="mt-3 font-display text-[3rem] leading-none text-ink">{selectedLaminate.name}</h3>
                                </div>
                                <button
                                    onClick={() => setSelectedLaminate(null)}
                                    className="flex h-10 w-10 items-center justify-center rounded-full border border-ink/10 bg-paper text-ink"
                                >
                                    x
                                </button>
                            </div>

                            <p className="mt-4 text-base text-ink-soft">
                                {selectedLaminate.texture} finish in the {selectedLaminate.category.toLowerCase()} family.
                            </p>

                            <div className="mt-8 space-y-3">
                                <div className="rounded-full border border-ink/10 bg-paper px-4 py-3 text-sm text-ink-soft">
                                    Good for wardrobes, kitchens, wall panels, and custom furniture.
                                </div>
                                <div className="rounded-full border border-ink/10 bg-paper px-4 py-3 text-sm text-ink-soft">
                                    Ask our team to help match this with colours, handles, and nearby finishes.
                                </div>
                            </div>

                            <div className="mt-8 flex flex-wrap gap-3">
                                <a href="/#contact" className="btn-primary">
                                    Ask About This Finish
                                </a>
                                <button onClick={() => setSelectedLaminate(null)} className="btn-secondary">
                                    Continue Browsing
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </section>
    )
}

export default LaminateCatalog
