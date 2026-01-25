import React from 'react';

const Hero = () => {
    const scrollToCatalog = () => {
        document.getElementById('catalog').scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <section style={{
            minHeight: '80vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            overflow: 'hidden',
            padding: '2rem'
        }}>
            <div className="container" style={{
                display: 'grid',
                gridTemplateColumns: '1.2fr 1fr',
                gap: '5rem',
                alignItems: 'center',
                width: '100%'
            }}>

                {/* Text Content */}
                <div style={{ maxWidth: '650px' }}>
                    <h1 style={{
                        marginBottom: '1.5rem',
                        fontSize: 'clamp(3rem, 5vw, 4.5rem)',
                        fontWeight: 400,
                        letterSpacing: '-0.03em',
                        color: 'var(--text-main)',
                        lineHeight: 1.1
                    }}>
                        Surfaces for the <br />
                        <span style={{
                            fontFamily: 'Source Serif 4',
                            fontStyle: 'italic',
                            color: 'var(--accent-primary)'
                        }}>tactile world</span>.
                    </h1>
                    <p style={{
                        fontSize: '1.2rem',
                        color: 'var(--text-muted)',
                        marginBottom: '2.5rem',
                        lineHeight: '1.6',
                        maxWidth: '90%'
                    }}>
                        Curated architectural laminates that define space through texture.
                        A collection designed for the modern interior.
                    </p>
                    <div style={{ display: 'flex', gap: '1rem' }}>
                        <button
                            onClick={scrollToCatalog}
                            className="btn-primary"
                            style={{
                                padding: '1rem 2.5rem',
                                fontSize: '1rem'
                            }}
                        >
                            View Collection
                        </button>
                    </div>
                </div>

                {/* Hero Image - Refined Integration */}
                <div style={{ position: 'relative', display: 'flex', justifyContent: 'center' }}>
                    {/* Subtle background shape behind image */}
                    <div style={{
                        position: 'absolute',
                        top: '5%',
                        right: '5%',
                        width: '90%',
                        height: '95%',
                        background: '#EAE8E2',
                        borderRadius: '24px',
                        transform: 'rotate(2deg)',
                        zIndex: -1
                    }}></div>

                    <img
                        src="/lumina/Designer_hand_pointing_2k_202601251623.jpeg"
                        alt="Designer Hand Pointing"
                        style={{
                            maxWidth: '100%',
                            height: 'auto',
                            borderRadius: '20px',
                            boxShadow: 'var(--shadow-md)',
                            transform: 'rotate(-1deg)',
                            border: '1px solid rgba(0,0,0,0.04)'
                        }}
                    />
                </div>

            </div>

        </section>
    );
};

export default Hero;
