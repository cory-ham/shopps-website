import type { Metadata } from 'next'
import { Anton, Inter } from 'next/font/google'
import './globals.css'

const anton = Anton({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-anton',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
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
      <body className={`${anton.variable} ${inter.variable} font-inter`}>
        {children}
      </body>
    </html>
  )
}
