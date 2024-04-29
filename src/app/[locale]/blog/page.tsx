import React from 'react'
import BlogGrid from '@/components/Blog/BlogGrid'
import PageBanner from '@/components/Common/PageBanner'
import { useTranslations } from 'next-intl';

const Blog = () => {
  const t = useTranslations('Blogs');
  return (
    <div>
      <PageBanner
        pageTitle={t('Blogs')}
        homePageUrl="/"
        homePageText={t('Home')}
        activePageText={t('Blogs')}
        bgImage="page-title-four"
      />
      <BlogGrid />
    </div>
  )
}

export default Blog
