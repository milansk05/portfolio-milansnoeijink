import type { Metadata } from "next"
import { Bricolage_Grotesque } from 'next/font/google'
import "./globals.css"
import { DarkModeProvider } from '../src/components/DarkModeContext'
import { SpeedInsights } from "@vercel/speed-insights/next"
import EasterEgg from "@/components/EasterEgg"
import AnimatedBackground from "@/components/AnimatedBackground"

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  display: 'swap',
  variable: '--font-bricolage',
})

export const metadata: Metadata = {
  title: "Milan Snoeijink - Portfolio",
  description: "Portfolio website van Milan Snoeijink, Software Developer bij Bit Academy Noorderpoort",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="nl">
      <body className={`${bricolage.className} antialiased relative`}>
        <SpeedInsights />
        <DarkModeProvider>
          <AnimatedBackground />
          {children}
          <EasterEgg />
        </DarkModeProvider>
      </body>
    </html>
  )
}