import type { Metadata } from 'next'
import { Antonio, IBM_Plex_Sans } from 'next/font/google'
import './globals.css'

const antonio = Antonio({
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-antonio',
  display: 'swap',
})

const ibmPlexSans = IBM_Plex_Sans({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'SHOPPS — The Top 100 In Ecommerce',
  description: 'The Top 100 operators, founders, and legends of the industry — immortalized in a collector card series.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${antonio.variable} ${ibmPlexSans.variable}`}>
        {children}
      </body>
    </html>
  )
}
