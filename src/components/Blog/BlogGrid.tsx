'use client'
import React, { useEffect, useState } from 'react'
import Image from 'next/image';
import Link from 'next/link'
import useBlogStore from '@/store/useBlogStore'
import Blog from '../Adminv2/Dashboard/Blog'
const BlogGrid = () => {
  const FetchBlogs = useBlogStore().FetchBlogs
  const { Blogs } = useBlogStore()
  const [filter, setFilter] = useState('')

  const filteredBlogs = Blogs.filter(d => d.title.toLowerCase().includes(filter.toLowerCase()))
console.log(filteredBlogs)

  useEffect(() => {
    FetchBlogs()
  }, [])



  return (
    <>
      <div className="blog-area-two pt-100 pb-70">
        <div className="container">
          <div className="row justify-content-center">
          {filteredBlogs.map((blog) => (
            <div key={blog.id} className="col-md-6 col-lg-4">
              <div className="blog-item">
                <div className="blog-top">
                  <Link href="/blog/details">
                  <Image width={100} height={300} src={`data:image/png;base64, ${blog.photoPath}`} alt="Blog" />
                  </Link>
                </div>
                <div className="blog-bottom">
                  <h3>
                    <Link href="/blog/details">
                      {blog.title}
                    </Link>
                  </h3>
                  <p>
                    {blog.text}
                  </p>
                  <ul>
                    <li>
                      <Link href="/blog/details">
                        Read More <i className="icofont-long-arrow-right"></i>
                      </Link>
                    </li>
                    <li>
                      <i className="icofont-calendar"></i>
                      {blog.timestamp.toString()}
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

export default BlogGrid
