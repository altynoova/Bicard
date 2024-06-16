'use client'
import React, { useEffect } from 'react'
import PageBanner from '@/components/Common/PageBanner'
import useBlogStore from '@/store/useBlogStore'
import Link from 'next/link'
import BlogSidebar from '@/components/Blog/BlogSidebar'
import { useTranslations } from 'next-intl'
import { url } from '@/config'

const BlogDetails = ({ params }: { params: { id: number } }) => {
  const { GetBlog, currentBlog } = useBlogStore()
  const t = useTranslations('Blogs')


  useEffect(() => {
    GetBlog(params.id)
  }, [])

  return (
    <div>
      <PageBanner
        pageTitle={t('Blogs Details')}
        homePageUrl="/"
        homePageText={t('Home')}
        activePageText={t('Blogs Details')}
        bgImage="page-title-four"
      />
      <div className="blog-details-area pt-100">
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              <div className="blog-details-item">
                <div className="blog-details-img">
                <img width={150} height={400} src={`${url}/TempFileStorage/${currentBlog.photoPath}`} alt={currentBlog.title}/>
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
                      <a href={`/blog/details/${currentBlog.id-1}`}>{t('Previous')}</a>
                      </li>
                      <li>
                        <a href={`/blog/details/${currentBlog.id+1}`}>{t('Next')}</a>
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
    </div>
  )
}
export default BlogDetails
