import Footer from '@/components/Footer'
import Headers from '@/components/Headers'
import localFont from 'next/font/local'
import './globals.css'

const shadowsIntoLight = localFont({
    src: './fonts/ShadowsIntoLight.ttf',
    variable: '--font-shadows-into-light',
    weight: '100 900',
})
const montserrat = localFont({
    src: './fonts/Montserrat-Regular.ttf',
    variable: '--font-montserrat-regular',
    weight: '100 900',
})

export const metadata = {
    title: 'Evently',
    description: "Simplifiez l'organisation de vos événements",
    icons: {
        icon: '/logo.png',
    },
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="fr">
            <body
                className={`${shadowsIntoLight.variable} ${montserrat.variable} antialiased`}
            >
                <Headers />
                {children}
                <Footer />
            </body>
        </html>
    )
}
