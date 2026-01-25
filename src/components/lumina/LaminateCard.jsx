import React, { useState } from 'react';

const LaminateCard = ({ data, onSelect }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div
            onClick={() => onSelect(data)}
            style={{
                background: 'var(--bg-card)',
                border: isHovered ? '1px solid var(--border-focus)' : '1px solid var(--border-subtle)',
                borderRadius: '12px',
                overflow: 'hidden',
                boxShadow: isHovered ? 'var(--shadow-hover)' : 'var(--shadow-sm)',
                transition: 'all 0.2s var(--ease-out)',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
                position: 'relative'
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Image / Color Block */}
            <div style={{ height: '200px', background: data.color, position: 'relative' }}>
                <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'linear-gradient(180deg, rgba(255,255,255,0.1) 0%, rgba(0,0,0,0.02) 100%)'
                }}></div>
            </div>

            {/* Info Block */}
            <div style={{ padding: '1.25rem' }}>
                <h3 style={{
                    fontSize: '1.1rem',
                    fontFamily: 'Inter, sans-serif',
                    fontWeight: 600,
                    marginBottom: '0.25rem',
                    color: 'var(--text-main)',
                    letterSpacing: '-0.01em'
                }}>
                    {data.name}
                </h3>
                <p style={{
                    fontSize: '0.85rem',
                    color: 'var(--text-muted)',
                    fontFamily: 'Inter, sans-serif'
                }}>
                    {data.category} · {data.texture}
                </p>
            </div>

            {/* Action Icon (Visible on Hover) */}
            <div style={{
                position: 'absolute',
                bottom: '1.25rem',
                right: '1.25rem',
                opacity: isHovered ? 1 : 0,
                transform: isHovered ? 'translateX(0)' : 'translateX(-5px)',
                transition: 'all 0.2s ease',
                color: 'var(--accent-primary)'
            }}>
                →
            </div>
        </div>
    );
};

export default LaminateCard;
