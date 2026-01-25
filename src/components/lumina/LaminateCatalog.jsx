import React, { useState, useMemo } from 'react';
import { laminates, categories } from '../../data/laminates';
import LaminateCard from './LaminateCard';

const LaminateCatalog = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [selectedLaminate, setSelectedLaminate] = useState(null);

    const filteredLaminates = useMemo(() => {
        return laminates.filter(item => {
            const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.texture.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
            return matchesSearch && matchesCategory;
        });
    }, [searchTerm, selectedCategory]);

    return (
        <section id="catalog" className="container" style={{ padding: '4rem 2rem', minHeight: '80vh' }}>

            <div style={{ marginBottom: '4rem', textAlign: 'center' }}>
                <h2 style={{ fontSize: '2rem', marginBottom: '1rem', fontWeight: 500 }}>The Collection</h2>
                <div style={{ width: '40px', height: '3px', background: 'var(--accent-secondary)', margin: '0 auto 2rem' }}></div>

                {/* Search */}
                <input
                    type="text"
                    placeholder="Search by name or texture..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{
                        padding: '0.8rem 1.5rem',
                        width: '100%',
                        maxWidth: '480px',
                        borderRadius: '8px',
                        border: '1px solid var(--border-focus)',
                        background: 'var(--bg-card)',
                        fontSize: '0.95rem',
                        fontFamily: 'Inter, sans-serif',
                        boxShadow: 'var(--shadow-sm)',
                        outline: 'none',
                        color: 'var(--text-main)'
                    }}
                />

                {/* Categories */}
                <div style={{ marginTop: '2rem', display: 'flex', flexWrap: 'wrap', gap: '0.6rem', justifyContent: 'center' }}>
                    {categories.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setSelectedCategory(cat)}
                            style={{
                                padding: '0.5rem 1.25rem',
                                borderRadius: '6px',
                                border: selectedCategory === cat ? '1px solid var(--text-main)' : '1px solid var(--border-subtle)',
                                background: selectedCategory === cat ? 'var(--text-main)' : 'transparent',
                                color: selectedCategory === cat ? '#fff' : 'var(--text-muted)',
                                fontFamily: 'Inter, sans-serif',
                                fontSize: '0.9rem',
                                fontWeight: 500,
                                cursor: 'pointer',
                                transition: 'all 0.2s ease'
                            }}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>

            <div className="grid-auto">
                {filteredLaminates.map(item => (
                    <LaminateCard
                        key={item.id}
                        data={item}
                        onSelect={(data) => setSelectedLaminate(data)}
                    />
                ))}
            </div>

            {/* Detail Modal - Clean Paper Style */}
            {selectedLaminate && (
                <div style={{
                    position: 'fixed',
                    top: 0, left: 0, right: 0, bottom: 0,
                    background: 'rgba(255,255,255,0.6)',
                    backdropFilter: 'blur(8px)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 1000,
                    padding: '2rem'
                }} onClick={() => setSelectedLaminate(null)}>
                    <div
                        onClick={e => e.stopPropagation()}
                        style={{
                            background: 'var(--bg-card)',
                            width: '100%',
                            maxWidth: '900px',
                            borderRadius: '16px',
                            overflow: 'hidden',
                            display: 'flex',
                            boxShadow: 'var(--shadow-md)',
                            flexDirection: 'row',
                            maxHeight: '80vh',
                            border: '1px solid var(--border-subtle)'
                        }}
                    >
                        {/* Image Side */}
                        <div style={{ flex: '1 1 50%', background: selectedLaminate.color, position: 'relative' }}>
                            {/* Texture overlay simulation */}
                            <div style={{
                                position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
                                background: 'linear-gradient(45deg, rgba(255,255,255,0.1), transparent)'
                            }}></div>
                        </div>

                        {/* Content Side */}
                        <div style={{ flex: '1 1 50%', padding: '3rem', overflowY: 'auto' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                                <h2 style={{ fontSize: '2rem', marginBottom: '0.25rem' }}>{selectedLaminate.name}</h2>
                                <button
                                    onClick={() => setSelectedLaminate(null)}
                                    style={{ background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer', color: 'var(--text-muted)' }}
                                >
                                    ×
                                </button>
                            </div>

                            <p style={{ fontFamily: 'Source Serif 4', fontStyle: 'italic', fontSize: '1.1rem', color: 'var(--text-muted)', marginBottom: '2rem' }}>
                                {selectedLaminate.category} Collection — {selectedLaminate.texture}
                            </p>

                            <div style={{ marginBottom: '2.5rem' }}>
                                <h4 style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.75rem', color: 'var(--text-muted)' }}>Description</h4>
                                <p style={{ fontSize: '1rem', lineHeight: '1.6', color: 'var(--text-main)' }}>
                                    Experience the tactile depth of {selectedLaminate.name}. Designed for resilience and aesthetic versatility,
                                    this finish brings a touch of {selectedLaminate.category.toLowerCase()} elegance to any interior surface.
                                </p>
                            </div>

                            <button className="btn-primary" onClick={() => alert('Sample requested.')}>
                                Request Sample
                            </button>
                        </div>
                    </div>
                </div>
            )}

        </section>
    );
};

export default LaminateCatalog;
