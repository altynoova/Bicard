'use client'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import PageBanner from '@/components/Common/PageBanner'
import { useTranslations } from 'next-intl';;
import useArticleStore from '@/store/useArticleStore';

const Blog = () => {
  const t = useTranslations('Blogs');
  const AllArticles = useArticleStore().FetchArticles
  const { Articles } = useArticleStore()
  const filteredArticles = Articles.filter(d => d.title.toLowerCase())
  useEffect(() => {
    AllArticles()
  }, [])
  return (
    <div>
      <PageBanner
        pageTitle={t('Articles')}
        homePageUrl="/"
        homePageText={t('Home')}
        activePageText={t('Articles')}
        bgImage="page-title-four1"
      />
      <div className="article">
        <div className="blog-details-item">
          <div className="blog-details-recent">
            <h3>{t('Articles')}</h3>
            <ul>
            {filteredArticles.map((article) => (
                <li>
                   <Link href={`/article/details/${article.id}`}>
                  <img src="/images/article.png" alt="article" />
                  </Link>
                  <Link href={`/article/details/${article.id}`}>{article.title}</Link>
                  <ul>
                    <li>  
                      <Link href={`/article/details/${article.id}`}>
                        <i className="icofont-businessman"></i> {article.authorName}
                      </Link>
                    </li>
                    <li>
                      <i className="icofont-calendar"></i> {new Date(article.timestamp).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' })}
                    </li>
                  </ul>
                  <hr></hr>
                </li>
                
              ))
              }
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Blog
