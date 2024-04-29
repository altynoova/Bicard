'use client'
import { useTranslations } from 'next-intl';
import Link from 'next/link'
const LatestArticles = () => {
  const t = useTranslations('Doctors');
  
  return (
    <>
      <div className="blog-area-two pb-70">
        <div className="container">
          <div className="section-title">
            <h2>{t('Latest Articles')}</h2>
          </div>

          <div className="row">
            <div className="col-md-6 col-lg-4">
              <div className="blog-item">
                <div className="blog-top">
                 <Link href="/blog/details">
                    <img src="/images/blog11.png" alt="Blog" />
                  </Link>
                </div>
                <div className="blog-bottom">
                  <h3>
                    <Link href="/blog/details">
                      В клинике БИКАРД провели операцию на сердце с
                      использованием технологии TAVI (транскатетерная
                      имплантация аортального клапана) .
                    </Link>
                  </h3>
                  <p className='text-wrap'>
                  В клинике БИКАРД провели операцию на сердце с использованием
                    технологии TAVI (транскатетерная имплантация аортального
                    клапана) . И это уже второй успех кардиологов Кыргызстана,
                    которые провели высокотехнологичную операцию на сердце с
                    использованием технологии TAVI (транскатетерная имплантация
                    аортального клапана).
                  </p>
                  <ul>
                    <li>
                      <Link href={`/blog/details/`}>  
                      {t('Read More')} <i className="icofont-long-arrow-right"></i>
                      </Link>
                    </li>
                    <li>
                      <i className="icofont-calendar"></i>
                      24.12.2023
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
export default LatestArticles
