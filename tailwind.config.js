/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                'brand-green': '#8CBF3F', // Card Green
                'brand-red': '#C1272D',   // Card Red
                charcoal: '#050505',
                'grey-surface': '#121212',
                'gold': '#D4AF37',
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
                oswald: ['Oswald', 'sans-serif'],
            },
            keyframes: {
                'fade-in': {
                    '0%': { opacity: '0', transform: 'translateY(10px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' }
                },
                'shake': {
                    '0%, 100%': { transform: 'translateX(0)' },
                    '10%, 30%, 50%, 70%, 90%': { transform: 'translateX(-4px)' },
                    '20%, 40%, 60%, 80%': { transform: 'translateX(4px)' }
                }
            },
            animation: {
                'fade-in': 'fade-in 0.5s ease-out',
                'shake': 'shake 0.5s ease-in-out'
            }
        },
    },
    plugins: [],
}
