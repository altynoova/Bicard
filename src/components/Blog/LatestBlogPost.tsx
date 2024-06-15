'use client'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import useBlogStore from '@/store/useBlogStore'
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { url } from '@/config';
const LatestBlogPost = () => {
  const LatestBlogs = useBlogStore().LatestBlogs
  const { Blogs } = useBlogStore()
  const [filter, setFilter] = useState('')
  const t = useTranslations('Blogs')
  const filteredBlogs = Blogs.filter(d => d.title.toLowerCase().includes(filter.toLowerCase()))
  useEffect(() => {
    LatestBlogs()
  }, [])

  return (
    <>
      <div className="blog-area-two pb-70 pt-100">
        <div className="container">
          <div className="section-title">
            <h2>{t('Our Latest Blogs')} </h2>
          </div>

          <div className="row">
            {filteredBlogs.map((blog) => (
            <div className="col-md-6 col-lg-4" key={blog.id}>
              <div className="blog-item">
                <div className="blog-top">
                 <Link href={`/blog/details/${blog.id}`}>
                 <img width={100} height={300} src={`${url}/TempFileStorage/${blog.photoPath}`} alt={blog.title}/>
                  </Link>
                </div>
                <div className="blog-bottom">
                  <h3>
                    <Link href={`/blog/details/${blog.id}`}>
                      {blog.title}
                    </Link>
                  </h3>
                  <div className='text-wrap' dangerouslySetInnerHTML={{ __html: blog.text }}></div>
                  <ul>
                    <li>
                      <Link href={`/blog/details/${blog.id}`}>
                      {t('Read More')} <i className="icofont-long-arrow-right"></i>
                      </Link>
                    </li>
                    <li>
                      <i className="icofont-calendar"></i>
                      {new Date(blog.timestamp).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' })}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
export default LatestBlogPost
