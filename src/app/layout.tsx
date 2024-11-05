import localFont from 'next/font/local'
import './globals.css'

const brittanySignature = localFont({
    src: '../app/fonts/BrittanySignature.ttf',
    variable: '--font-brittany-signature',
})

export const metadata = {
    title: 'Evently',
    description: "Simplifiez l'organisation de vos événements",
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="fr">
            <body className={`${brittanySignature.variable} antialiased`}>
                {children}
            </body>
        </html>
    )
}
