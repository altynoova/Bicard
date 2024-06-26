import React from 'react'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import TopHeader from '@/components/App/TopHeader'
import Navbar from '@/components/App/Navbar'
import Footer from '@/components/App/Footer'
import { appWithTranslation } from 'next-i18next';
import { useRouter } from 'next/navigation';
import { NextIntlClientProvider, useMessages } from 'next-intl'


const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Bicard',
  description: 'Generated by ManasBM',
}
export default function LocaleLayout({
  children,
  params: { locale }
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const messages = useMessages()
  return (
    <html lang={locale}>
      <body className={inter.className}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <TopHeader />
          <Navbar />
          <main>{children}</main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

