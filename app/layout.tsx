import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Suspense } from 'react'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import ScrollToTop from '@/components/ScrollToTop'
import { Analytics } from '@vercel/analytics/react'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: {
    default: 'McPhee Big Band | Los Angeles Jazz Orchestra',
    template: '%s | McPhee Big Band',
  },
  description:
    'The McPhee Big Band is a professional jazz big band based in Los Angeles and Long Beach, California. Live performances, private events, and original arrangements from Southern California\'s finest young musicians.',
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://www.mcpheebigband.com'),
  openGraph: {
    title: 'McPhee Big Band | Los Angeles Jazz Orchestra',
    description:
      'The McPhee Big Band is a professional jazz big band based in Los Angeles and Long Beach, California. Live performances, private events, and original arrangements from Southern California\'s finest young musicians.',
    locale: 'en_US',
    type: 'website',
    images: [{ url: '/images/venue-show.jpg', width: 1280, height: 720, alt: 'McPhee Big Band performing live' }],
  },
  twitter: {
    card: 'summary_large_image',
    images: ['/images/venue-show.jpg'],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} dark`}>
      <body>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] focus:bg-cb-blue focus:text-white focus:px-4 focus:py-2 focus:rounded-lg focus:text-sm focus:font-semibold"
        >
          Skip to main content
        </a>
        <Navbar />
        <Suspense fallback={null}>
          <ScrollToTop />
        </Suspense>
        <main id="main-content" className="pt-16">{children}</main>
        <Footer />
        <Analytics />
      </body>
    </html>
  )
}
