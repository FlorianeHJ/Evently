import localFont from "next/font/local";
import "./globals.css";

const brittanySignature = localFont({
  src: "./fonts/BrittanySignature.ttf",
  variable: "--font-brittany-signature",
});

export const metadata = {
  title: "Evently",
  description: "Simplifiez l'organisation de vos événements",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${brittanySignature.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}