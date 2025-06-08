import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ClerkProvider } from '@clerk/nextjs'

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
    <ClerkProvider>
      <html lang="ru" suppressHydrationWarning>
        <head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta name="robots" content="index, follow" />
          <link rel="manifest" href="https://physics-plum.vercel.app/site.webmanifest" />
          <link rel="canonical" href="https://physics-plum.vercel.app/" />
        </head>
        <body className={font.className}>
          <ToasterProvider />
          <ModalProvider />
          {children}
        </body>
      </html>
    </ClerkProvider>
  )
}
