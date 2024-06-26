import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import useBlogStore from '@/store/useBlogStore'
import Image from 'next/image';
import useMedServicesStore from '@/store/useMedServicesStore';
import { useTranslations } from 'next-intl';
import { url } from '@/config';
const BlogSidebar = () => {
  const LatestBlogs = useBlogStore().LatestBlogs
  const zzz = useMedServicesStore().GetAllSubMedServices

  const { Blogs } = useBlogStore()
  const { allSubMedServices } = useMedServicesStore()
  const [filter, setFilter] = useState('')
  const t = useTranslations('Blogs')

  const filteredBlogs = Blogs.filter(d => d.title.toLowerCase().includes(filter.toLowerCase()))
  useEffect(() => {
    LatestBlogs()
    zzz()
  }, [])

  return (
    <>
      <div className="blog-details-item">
        <div className="blog-details-search">
          <form>
            <input type="text" className="form-control" placeholder="Search" />
            <button type="submit" className="btn blog-details-btn">
              <i className="icofont-search-1"></i>
            </button>
          </form>
        </div>

        <div className="blog-details-recent">
          <h3>{t('Recent Blogs')}</h3>
          <ul>
            {filteredBlogs.map((blog) => (
              <li key={blog.id}>
                <img width={100} height={300} src={`${url}/TempFileStorage/${blog.photoPath}`} alt={blog.title} />
                <Link href={`/blog/details/${blog.id}`}>{blog.title}</Link>
                <ul>
                  <li>
                    <Link href={`/blog/details/${blog.id}`}>
                      <i className="icofont-businessman"></i> Admin
                    </Link>
                  </li>
                  <li>
                    <i className="icofont-calendar"></i> {new Date(blog.timestamp).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' })}
                  </li>
                </ul>
              </li>
            ))
            }
          </ul>
        </div>

        <div className="blog-details-tags">
          <h3>{t('Tags')}</h3>
          <ul>
            {allSubMedServices.map((subservice) => (
              <li key={subservice.id}>
                <Link href="/services/">{subservice.name}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  )
}

export default BlogSidebar
