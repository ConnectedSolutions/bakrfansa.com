import type { Metadata } from 'next'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import '../globals.css'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://bakrfansa.com'

export const metadata: Metadata = {
  title: {
    default: 'Bakr Fansa — Artista Visual',
    template: '%s — Bakr Fansa',
  },
  description:
    'Portal oficial de Bakr Fansa, artista visual sirio. Galería de obras originales, reproducciones firmadas y contacto.',
  metadataBase: new URL(siteUrl),
  openGraph: {
    siteName: 'Bakr Fansa',
    locale: 'es_MX',
    type: 'website',
    images: [
      {
        url: '/og-default.jpg',
        width: 1200,
        height: 630,
        alt: 'Bakr Fansa — Artista Visual',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
