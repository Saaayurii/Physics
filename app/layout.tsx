import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
// import { ClerkProvider } from '@clerk/nextjs'

import { ToasterProvider } from '@/components/provider/toaster-provider'
import { ModalProvider } from '@/components/provider/modal-provider'

import './globals.css'

const font = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Структурный синтез программ — Учебный портал',
  description: 'Материалы, лекции и примеры по структурному синтезу программирования.',
  keywords: [
    'структурный синтез программ',
    'программирование',
    'синтез алгоритмов',
    'программные структуры',
    'обучение программированию'
  ],
  authors: [{ name: 'Роман', url: 'https://physics-plum.vercel.app/' }],
  openGraph: {
    title: 'Структурный синтез программ — Учебный портал',
    description: 'Материалы, лекции и примеры по структурному синтезу программирования.',
    url: 'https://physics-plum.vercel.app',
    siteName: 'Структурный синтез программ',
    images: [
      {
        url: 'https://physics-plum.vercel.app/og-image-ssp.png',
        width: 1200,
        height: 630,
        alt: 'Структурный синтез программ — Учебный портал',
      },
    ],
    locale: 'ru_RU',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Структурный синтез программ — Учебный портал',
    description: 'Материалы, лекции и примеры по структурному синтезу программирования.',
    creator: '@your_twitter_handle',
    images: ['https://physics-plum.vercel.app'],
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    // <ClerkProvider>
      <html lang="ru" suppressHydrationWarning>
         <head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta name="robots" content="index, follow" />
          <link rel="manifest" href="https://physics-plum.vercel.app/site.webmanifest" />
          <link rel="canonical" href="https://physics-plum.vercel.app/" />

          {/* Open Graph */}
          <meta property="og:title" content="Структурный синтез программ — Учебный портал" />
          <meta property="og:description" content="Материалы, лекции и примеры по структурному синтезу программирования." />
          <meta property="og:url" content="https://physics-plum.vercel.app" />
          <meta property="og:site_name" content="Структурный синтез программ" />
          <meta property="og:image" content="https://github.com/Saaayurii/Physics/blob/main/public/assets/Physics.png" />
          <meta property="og:image:width" content="1200" />
          <meta property="og:image:height" content="630" />
          <meta property="og:image:alt" content="Структурный синтез программ — Учебный портал" />
          <meta property="og:type" content="website" />
          <meta property="og:locale" content="ru_RU" />

          {/* Twitter Card */}
          <meta name="twitter:card" content="Структурный синтез программ — Учебный портал" />
          <meta name="twitter:title" content="Структурный синтез программ — Учебный портал" />
          <meta name="twitter:description" content="Материалы, лекции и примеры по структурному синтезу программирования." />
          <meta name="twitter:creator" content="@Relmontov" />
          <meta name="twitter:image" content="https://github.com/Saaayurii/Physics/blob/main/public/assets/Physics.png" />
        </head>
        <body className={font.className}>
          <ToasterProvider />
          <ModalProvider />
          {children}
        </body>
      </html>
    // </ClerkProvider>
  )
}
