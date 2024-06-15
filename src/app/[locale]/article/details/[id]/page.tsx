'use client'
import React, { useEffect } from 'react';
import LatestBlogPost from '@/components/Blog/LatestBlogPost';
import PageBanner from '@/components/Common/PageBanner';
import Link from 'next/link';
import BlogSidebar from '@/components/Blog/BlogSidebar';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import useArticleStore from '@/store/useArticleStore';
import ArticleSidebar from '@/components/Blog/ArticleSideBar';
import { url } from '@/config';

const ArticleDetails = ({ params }: { params: { id: number } }) => {
  const { GetArticle, currentArticle, Articles,Latestarticles, LatestArticles } = useArticleStore();
  const t = useTranslations('Blogs');
  
  useEffect(() => {
    const fetchData = async () => {
      await GetArticle(params.id);
      await LatestArticles(currentArticle.authorName);
    };

    fetchData();
  }, [params.id, GetArticle, currentArticle.authorName, LatestArticles]);


  return (
    <div>
      {/* Page Banner */}
      <PageBanner
        pageTitle={t('Articles Details')}
        homePageUrl="/"
        homePageText={t('Home')}
        activePageText={t('Articles Details')}
        bgImage="page-title-four1"
      />

      {/* Blog Details Area */}
      <div className="blog-details-area pt-100">
        <div className="container">
          <div className="row">
            {/* Blog Details */}
            <div className="col-lg-8">
              <div className="blog-details-item">
                <div className="blog-details-img">
                  <div style={{ margin: 20 }}>
                    <embed src={`${url}/TempFileStorage/${currentArticle.filePath}#toolbar=0`} className="w-100" height={700} />
                  </div>
                  <h2>{currentArticle?.title}</h2>
                  <ul>
                    <li>
                      <Link href="/blog">
                        <i className="icofont-businessman"></i> {currentArticle?.authorName}
                      </Link>
                    </li>
                    <li>
                      <i className="icofont-calendar"></i>
                      {new Date(currentArticle.timestamp).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' })}
                    </li>
                    <li>
                      <a href={`https://localhost:7120/TempFileStorage/${currentArticle.filePath}`} download>
                        <i className="icofont-download"></i>
                      </a>
                    </li>
                  </ul>
                </div>
                {/* Previous and Next Links */}
                <div className="blog-details-previous">
                  <div className="prev-next">
                    <ul>
                      <li>
                        <a href={`/article/details/${currentArticle.id - 1}`}>{t('Previous')}</a>
                      </li>
                      <li>
                        <a href={`/article/details/${currentArticle.id + 1}`}>{t('Next')}</a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Blog Sidebar */}
            <div className="col-lg-4">
              <ArticleSidebar />
            </div>
          </div>
        </div>
      </div>

      {/* Author Latest Posts */}
      <div className="blog-area-two pb-70 pt-100">
        <div className="container">
          <div className="section-title">
            <h2>{t('Author Latest Articles')}</h2>
          </div>
          <div className="row">
            {Latestarticles.map((blog) => (
              <div className="col-md-12 col-lg-6" key={blog.id}>
                <div className="blog-item">
                  <div className="blog-top">
                  </div>
                  <div className="blog-bottom">
                    <h3>
                      <Link href={`/blog/details/${blog.id}`}>
                        {blog.title}
                      </Link>
                    </h3>
                    <p className="text-wrap">{blog.title}</p>
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
    </div>
  );
};

export default ArticleDetails;
