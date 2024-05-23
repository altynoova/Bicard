'use client'
import React, { useEffect, useState } from 'react'
import Image from 'next/image';
import Link from 'next/link'
import useBlogStore from '@/store/useBlogStore'
import Blog from '../Adminv2/Dashboard/Blog'
import Pagination from '../Pagination';
import { useTranslations } from 'next-intl';
import { url } from '@/config';

const BlogGrid = () => {
  const FetchBlogs = useBlogStore().FetchBlogs
  const t = useTranslations('Blogs');
  const { Blogs, pagenumber, pagesize, totalelements, totalpages } = useBlogStore()
  const [filter, setFilter] = useState('')

  const filteredBlogs = Blogs.filter(d => d.title.toLowerCase().includes(filter.toLowerCase()))
  console.log(filteredBlogs)

  useEffect(() => {
    FetchBlogs(pagesize, pagenumber )
  }, [])

  useEffect(() => {
    FetchBlogs(pagesize, pagenumber)
  }, [pagesize, pagenumber])



  return (
    <>
      <div className="blog-area-two pt-100 pb-70">
        <div className="container">
          <div className="row justify-content-center">
            {filteredBlogs.map((blog) => (
              <div key={blog.id} className="col-md-6 col-lg-4">
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
          <Pagination pagenumber={pagenumber} totalpages={totalpages}/>
        </div>
      </div>
    </>
  )
}

export default BlogGrid
