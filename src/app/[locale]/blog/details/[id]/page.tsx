'use client'
import React, { useEffect } from 'react'
import LatestBlogPost from '@/components/Blog/LatestBlogPost'
import PageBanner from '@/components/Common/PageBanner'
import BlogDetailsContent from '@/components/Blog/BlogDetailsContent'
import useBlogStore from '@/store/useBlogStore'
import Link from 'next/link'
import CommentForm from '@/components/Blog/CommentForm'
import BlogSidebar from '@/components/Blog/BlogSidebar'
import Image from 'next/image';

const BlogDetails = ({ params }: { params: { id: number } }) => {
  const { GetBlog, currentBlog } = useBlogStore()
  console.log('current Blog in state', currentBlog)

  useEffect(() => {
    GetBlog(params.id)
  }, [])

  return (
    <div>
      <PageBanner
        pageTitle="Blog Details"
        homePageUrl="/"
        homePageText="Home"
        activePageText="Blog Details"
        bgImage="page-title-four"
      />
      <div className="blog-details-area pt-100">
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              <div className="blog-details-item">
                <div className="blog-details-img">
                <Image width={100} height={300} src={`data:image/png;base64, ${currentBlog.photoPath}`} alt="Blog" />
                  <h2>
                    {currentBlog?.title}
                  </h2>

                  <ul>
                    <li>
                      <Link href="/blog">
                        <i className="icofont-businessman"></i>  {currentBlog?.authorName}
                      </Link>
                    </li>
                    <li>
                      <i className="icofont-calendar"></i>
                      {new Date(currentBlog.timestamp).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' })}
                    </li>
                  </ul>
                </div>
                <div className="blog-details-previous">
                <div dangerouslySetInnerHTML={{ __html: currentBlog.text }}></div>
                  <div className="prev-next">
                    <ul>
                      <li>
                      <a href={`/blog/details/${currentBlog.id-1}`}>Previous</a>
                      </li>
                      <li>
                        <a href={`/blog/details/${currentBlog.id+1}`}>Next</a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-4">
              <BlogSidebar />
            </div>
          </div>
        </div>
      </div>
      <LatestBlogPost />
    </div>
  )
}
export default BlogDetails
