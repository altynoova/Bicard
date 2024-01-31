import React from 'react'
import Head from 'next/head'
import GoTop from './GoTop'

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <Head>
        <title>Bicard - Лечим сердце от чистого сердца </title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
      </Head>

      {children}

      <GoTop scrollStepInPx="100" delayInMs={10.5} />
    </>
  )
}

export default Layout
