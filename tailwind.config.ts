import type { Config } from 'tailwindcss'

const config: Config = {
    content: ['./src/**/*.{js,jsx,ts,tsx}'],
    theme: {
        colors: {
            background: '#FFF9F3',
            background2: '#D7BA88',
            primary: '#ADBF9F',
            button: '#6B7F55',
            btnHover: '#7A8D64',
            btnSelected: '#24372A',
            text: '#FFF9E8',
        },
        fontFamily: {
            primary: 'montserrat',
            secondary: 'shadowsIntoLight',
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
