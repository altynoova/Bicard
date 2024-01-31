import React from 'react'
import LatestBlogPost from '@/components/Blog/LatestBlogPost'
import PageBanner from '@/components/Common/PageBanner'
import BlogDetailsContent from '@/components/Blog/BlogDetailsContent'

const BlogDetails = () => {
  return (
    <div>
      <PageBanner
        pageTitle="Blog Details"
        homePageUrl="/"
        homePageText="Home"
        activePageText="Blog Details"
        bgImage="page-title-four"
      />
      <BlogDetailsContent />
      <LatestBlogPost />
    </div>
  )
}

export default BlogDetails
