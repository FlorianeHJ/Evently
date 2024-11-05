import type { Config } from 'tailwindcss'

const config: Config = {
    content: ['./src/**/*.{js,jsx,ts,tsx}'],
    theme: {
        colors: {
            // Couleurs personnalisées
            background: '#e0f7ef', // couleur crème/vert eau clair
            primary: '#36c2ad', // couleur turquoise/vert clair plus foncé
            button: '#171717', // couleur des boutons (noir)
            buttonText: '#f3f3e1', // couleur de texte pour les boutons (blanc/crème)
        },
        fontFamily: {
            // Ajouter Brittany Signature
            sans: ['Brittany Signature', 'Arial', 'sans-serif'],
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
