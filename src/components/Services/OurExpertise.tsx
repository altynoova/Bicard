import React from 'react'
import Link from 'next/link'

const OurExpertise = () => {
  return (
    <>
      <div className="expertise-area pb-70">
        <div className="container">
          <div className="section-title">
            <h2>Наши эксперты</h2>
          </div>

          <div className="row align-items-center">
            <div className="col-lg-6">
              <div className="expertise-item">
                <div className="row">
                  <div className="col-sm-6 col-lg-6">
                    <Link href="/blog-details">
                      <div className="expertise-inner">
                        <i className="icofont-doctor-alt"></i>
                        <h3>Специалисты клиники</h3>
                        <p>
                          Кардиологи Кардиологи-аритмологи Кардиохирурги
                          Сосудистые хирурги (ангиологи)
                        </p>
                      </div>
                    </Link>
                  </div>
                  <div className="col-sm-6 col-lg-6">
                    <Link href="/blog-details">
                      <div className="expertise-inner">
                        <i className="icofont-stretcher"></i>
                        <h3>Скорая помощь</h3>
                        <p>
                          Клиника работает 24 часа в сутки, 7 дней в неделю и
                          оказывает экстренную высокотехнологичную помощь вне
                          зависимости от времени суток
                        </p>
                      </div>
                    </Link>
                  </div>
                  <div className="col-sm-6 col-lg-6">
                    <Link href="/blog-details">
                      <div className="expertise-inner">
                        <i className="icofont-network"></i>
                        <h3>Технологии</h3>
                        <p>
                          В кардиоклинике имеется самый современный ангиограф, с
                          помощью чего проводят диагностику и лечение
                          заболеваний рентгенэндоваскулярными методами.
                        </p>
                      </div>
                    </Link>
                  </div>
                  <div className="col-sm-6 col-lg-6">
                    <Link href="/blog-details">
                      <div className="expertise-inner">
                        <i className="icofont-ambulance-cross"></i>
                        <h3>Диагностика</h3>
                        <p>
                          В отделении лучевой и функциональной диагностики
                          проводятся все виды УЗИ исследований, допплерография,
                          эхокардиография, чреспищеводная эхокардиография и т.д.
                        </p>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-6">
              <div className="expertise-item">
                <div className="expertise-right">
                  <img src="/images/about4.jpg" alt="Expertise" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default OurExpertise
