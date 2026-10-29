import Script from 'next/script'
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
      <Script
        id="reb2b"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: '!function(key){if(window.reb2b)return;window.reb2b={loaded:true};var s=document.createElement(\\x27script\\x27);s.async=true;s.src=\\x27https://ddwl4m2hdecbv.cloudfront.net/b/\\x27+key+\\x27/\\x27+key+\\x27.js.gz\\x27;document.getElementsByTagName(\\x27script\\x27)[0].parentNode.insertBefore(s,document.getElementsByTagName(\\x27script\\x27)[0]);}(\\x274N210HQL746Z\\x27)' }}
      />
      </body>
    </html>
  )
}
