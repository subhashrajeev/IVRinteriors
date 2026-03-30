const LaminateCard = ({ data, onSelect }) => {
    return (
        <button
            type="button"
            onClick={() => onSelect(data)}
            className="story-card group overflow-hidden text-left"
        >
            <div
                className="tactile-swatch relative h-52"
                style={{
                    background: `linear-gradient(160deg, rgba(255,255,255,0.42), rgba(255,255,255,0.08)), ${data.color}`,
                }}
            >
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.3),transparent_35%),linear-gradient(180deg,transparent_20%,rgba(23,20,17,0.08)_100%)]" />
                <div className="absolute left-4 top-4 soft-chip border-white/20 bg-white/15 text-white">
                    {data.category}
                </div>
            </div>

            <div className="px-5 py-5">
                <div className="flex items-start justify-between gap-3">
                    <div>
                        <h3 className="font-display text-[2rem] leading-none text-ink">{data.name}</h3>
                        <p className="mt-2 text-sm text-ink-soft">{data.texture} finish</p>
                    </div>
                    <span className="text-lg text-accent transition-transform duration-300 group-hover:translate-x-1">→</span>
                </div>
            </div>
        </button>
    )
}

export default LaminateCard
