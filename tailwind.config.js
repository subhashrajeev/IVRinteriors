/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                // Anthropic / Claude Palette
                'anthropic-beige': '#FAF8F5', // Warm paper background
                'anthropic-stone': '#E6E1DC', // Borders, subtle separators
                'anthropic-text': '#191919',  // Near-black ink
                'anthropic-secondary': '#6B6966', // Secondary text
                'anthropic-accent': '#D97757', // Warm Termacotta/Clay
                'anthropic-green': '#5F8C6D', // Muted forest green (optional accent)
            },
            fontFamily: {
                sans: ['Inter', 'system-ui', 'sans-serif'],
                serif: ['Playfair Display', 'Merriweather', 'serif'], // Elegant serif for headings
                mono: ['JetBrains Mono', 'monospace'], // For code/technical touches
            },
            borderRadius: {
                'none': '0',
                'sm': '0.125rem',
                DEFAULT: '0.5rem', // 8px default
                'md': '0.75rem',   // 12px
                'lg': '1rem',
                'xl': '1.5rem',
                '2xl': '2rem',
                'pill': '9999px',
            },
            keyframes: {
                'fade-in': {
                    '0%': { opacity: '0', transform: 'translateY(10px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' }
                },
                'soft-scale': {
                    '0%': { transform: 'scale(1)' },
                    '100%': { transform: 'scale(1.02)' }
                }
            },
            animation: {
                'fade-in': 'fade-in 0.6s cubic-bezier(0.22, 1, 0.36, 1)',
                'soft-scale': 'soft-scale 0.3s ease-out forwards'
            }
        },
    },
    plugins: [],
}
