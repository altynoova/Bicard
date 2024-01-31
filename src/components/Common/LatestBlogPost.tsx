import React from 'react'
import Link from 'next/link'

const LatestBlogPost = () => {
  return (
    <>
      <div className="blog-area pt-100 pb-70">
        <div className="container">
          <div className="section-title">
            <h2>Последние блоги</h2>
          </div>

          <div className="row justify-content-center">
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
                  <p>
                    В клинике БИКАРД провели операцию на сердце с использованием
                    технологии TAVI (транскатетерная имплантация аортального
                    клапана) . И это уже второй успех кардиологов Кыргызстана,
                    которые провели высокотехнологичную операцию на сердце с
                    использованием технологии TAVI (транскатетерная имплантация
                    аортального клапана).
                  </p>
                  <ul>
                    <li>
                      <Link href="/blog/details">
                        Читать...<i className="icofont-long-arrow-right"></i>
                      </Link>
                    </li>
                    <li>
                      <i className="icofont-calendar"></i>
                      18.07.2023
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="col-md-6 col-lg-4">
              <div className="blog-item">
                <div className="blog-top">
                  <Link href="/blog/details">
                    <img src="/images/blog22.png" alt="Blog" />
                  </Link>
                </div>
                <div className="blog-bottom">
                  <h3>
                    <Link href="/blog/details">Эл тараза, Эл сынчы</Link>
                  </h3>
                  <p>
                    Хотим под этим постом поблагодарить всех наших пациентов за
                    выбор и доверие🙏🏼 Наша клиника всегда работает во благо и
                    здоровье пациентов🫀 Получать второй год подряд премию в
                    номинации «Клиника Года» для нас большая честь и радость🫀🙏🏼
                  </p>
                  <ul>
                    <li>
                      <Link href="/blog/details">
                        Читать... <i className="icofont-long-arrow-right"></i>
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

            <div className="col-md-6 col-lg-4">
              <div className="blog-item">
                <div className="blog-top">
                  <Link href="/blog/details">
                    <img src="/images/blog33.png" alt="Blog" />
                  </Link>
                </div>
                <div className="blog-bottom">
                  <h3>
                    <Link href="/blog/details">Коронарография</Link>
                  </h3>
                  <p>
                    Коронарография — рентгеноконтрастный метод исследования,
                    который является наиболее точным и достоверным способом
                    диагностики ишемической болезни сердца (ИБС), позволяя точно
                    определить характер, место и степень сужения коронарной
                    артерии. Этот метод является «золотым стандартом» в
                    диагностике ИБС и позволяет решить вопрос о выборе и объёме
                    проведения в дальнейшем таких лечебных процедур, как
                    баллонная ангиопластика, стентирование и коронарное
                    шунтирование.
                  </p>
                  <ul>
                    <li>
                      <Link href="/blog/details">
                        Читать... <i className="icofont-long-arrow-right"></i>
                      </Link>
                    </li>
                    <li>
                      <i className="icofont-calendar"></i>
                      03.02.2023
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

export default LatestBlogPost
