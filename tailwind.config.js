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
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
                oswald: ['Oswald', 'sans-serif'],
            },
        },
    },
    plugins: [],
}
