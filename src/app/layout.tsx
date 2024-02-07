import React from 'react'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import TopHeader from '@/components/App/TopHeader'
import Navbar from '@/components/App/Navbar'
import Footer from '@/components/App/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Bicard',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <TopHeader />
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
