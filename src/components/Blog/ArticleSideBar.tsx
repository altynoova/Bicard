import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import useArticleStore from '@/store/useArticleStore';

const ArticleSidebar = () => {
  const t = useTranslations('Blogs');
  const AllArticles = useArticleStore().FetchArticles
  const { Articles } = useArticleStore()
  const filteredArticles = Articles.filter(d => d.title.toLowerCase()).slice(0, 3);
  useEffect(() => {
    AllArticles()
  }, [])
  return (
    <>
      <div className="blog-details-item">
        <div className="blog-details-recent">
          <h3>{t('Latest Articles')}</h3>
          <ul>
            {filteredArticles.map((article) => (
              <li key={article.id}>
                 <img src="/images/article.png" alt="article" />
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
              </li>
            ))
            }
          </ul>
        </div>

      </div>
    </>
  )
}

export default ArticleSidebar
