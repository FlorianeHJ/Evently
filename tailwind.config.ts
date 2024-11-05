import type { Config } from 'tailwindcss'

const config: Config = {
    content: ['./src/**/*.{js,jsx,ts,tsx}'],
    theme: {
        colors: {
            // Couleurs personnalisées
            background: '#e0f7ef',
            primary: '#36c2ad',
            button: '#171717',
            buttonText: '#f3f3e1',
        },
        fontFamily: {
            primary: 'Brittany Signature',
        },
        screens: {
            sm: '640px',
            md: '768px',
            lg: '1024px',
            xl: '1280px',
            '2xl': '1536px',
        },
    },
    plugins: [],
}

export default config
