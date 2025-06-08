import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ClerkProvider } from '@clerk/nextjs'

import { ToasterProvider } from '@/components/provider/toaster-provider'
import { ModalProvider } from '@/components/provider/modal-provider'

import './globals.css'

const font = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Физика — Научный портал',
  description: 'Все о физике: теория, эксперименты, задачи и новости науки',
  keywords: ['физика', 'наука', 'эксперименты', 'обучение', 'теория физики'],
  authors: [{ name: 'Твой Имя', url: 'https://example.com' }],
  openGraph: {
    title: 'Физика — Научный портал',
    description: 'Все о физике: теория, эксперименты, задачи и новости науки',
    url: 'https://yourdomain.com',
    siteName: 'Физика',
    images: [
      {
        url: 'https://physics-plum.vercel.app/',
        width: 1200,
        height: 630,
        alt: 'Физика — Научный портал',
      },
    ],
    locale: 'ru_RU',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Физика — Научный портал',
    description: 'Все о физике: теория, эксперименты, задачи и новости науки',
    creator: '@your_twitter_handle',
    images: ['https://physics-plum.vercel.app/'],
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
          <link rel="manifest" href="https://physics-plum.vercel.app/" />
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
