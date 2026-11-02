import Script from 'next/script'
import { Analytics } from '@vercel/analytics/react'
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
  title: 'SHOPPS — Trading Cards for Ecommerce',
  description: 'Physical trading cards of 100 ecommerce leaders, with rare editions and $50K in prizes. Only 1,000 packs, never for sale. See how to win one.',
  openGraph: {
    title: 'SHOPPS — Trading Cards for Ecommerce',
    description: 'Physical trading cards of 100 ecommerce leaders, with rare editions and $50K in prizes. Only 1,000 packs, never for sale. See how to win one.',
    url: 'https://www.shoppscards.com',
    siteName: 'SHOPPS',
    images: [
      {
        url: 'https://www.shoppscards.com/shopps-packs-fan.png',
        width: 1200,
        height: 630,
        alt: 'SHOPPS Trading Cards',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SHOPPS — Trading Cards for Ecommerce',
    description: 'Physical trading cards of 100 ecommerce leaders, with rare editions and $50K in prizes. Only 1,000 packs, never for sale. See how to win one.',
    images: ['https://www.shoppscards.com/shopps-packs-fan.png'],
  },
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
      <Script id="reb2b" strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: '!function () {var reb2b = window.reb2b = window.reb2b || [];if (reb2b.invoked) return;reb2b.invoked = true;reb2b.methods = ["identify", "collect"];reb2b.factory = function (method) {return function () {var args = Array.prototype.slice.call(arguments);args.unshift(method);reb2b.push(args);return reb2b;};};for (var i = 0; i < reb2b.methods.length; i++) {var key = reb2b.methods[i];reb2b[key] = reb2b.factory(key);}reb2b.load = function (key) {var script = document.createElement("script");script.type = "text/javascript";script.async = true;script.src = "https://s3-us-west-2.amazonaws.com/b2bjsstore/b/" + key + "/reb2b.js.gz";var first = document.getElementsByTagName("script")[0];first.parentNode.insertBefore(script, first);};reb2b.SNIPPET_VERSION = "1.0.1";reb2b.load("4N210HQL746Z");}();' }} />
        <Analytics />
    </body>
    </html>
  )
}
