import React from 'react'
import Link from 'next/link'

const ServicesCard = () => {
  return (
    <>
      <div className="services-area pt-100 pb-70">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-sm-6 col-lg-3">
              <div className="service-item">
                <div className="service-front">
                  <i className="icofont-doctor"></i>
                  <Link href="/services/details">
                    <h3>Докторы</h3>
                  </Link>
                  <p>
                    Заведует стационаром первый кардиолог европейского образца в
                    Кыргызстане, соавтор множества научных работ, опубликованных
                    в зарубежных изданиях Осмонов Дамир. У него за плечами
                    большой опыт в кардиологии и в целом в сфере медицины.
                    Является членом двух именитых европейских объединений: Союза
                    кардиологов (FESC) и Ассоциации сердечного ритма (EHRA). Под
                    руководством Дамира Осмонова работает 75 сотрудников.
                  </p>
                </div>
              </div>
            </div>

            <div className="col-sm-6 col-lg-3">
              <div className="service-item">
                <div className="service-front">
                  <i className="icofont-prescription"></i>
                  <Link href="/services/details">
                    <h3>Диагностика</h3>
                  </Link>
                  <p>
                    Диагностическая служба — представлена клинико-биохимической
                    лабораторией, которая функционирует в течение 24 часов и
                    обеспечивает весь спектр необходимых лабораторных тестов с
                    выдачей результатов анализов в самые кратчайшие сроки. В
                    отделении лучевой и функциональной диагностики проводятся
                    все виды УЗИ исследований, допплерография, эхокардиография,
                    чреспищеводная эхокардиография и т.д.
                  </p>
                </div>
              </div>
            </div>

            <div className="col-sm-6 col-lg-3">
              <div className="service-item">
                <div className="service-front">
                  <i className="icofont-patient-file"></i>
                  <Link href="/services/details">
                    <h3>Амбулаторно-поликлиническая помощь </h3>
                  </Link>
                  <p>
                    Амбулаторно-поликлиническая помощь пациентам представляется
                    по специальностям: кардиология, кардиохирургия. Стационар на
                    45 коек, в том числе 5 реанимационных, оказывает
                    специализированную и высокоспециализированную медицинскую
                    помощь по специальностям кардиохирургия и кардиология.
                  </p>
                </div>
              </div>
            </div>

            <div className="col-sm-6 col-lg-3">
              <div className="service-item">
                <div className="service-front">
                  <i className="icofont-dna-alt-1"></i>
                  <Link href="/services/details">
                    <h3>Диагностика рентгенэндоваскулярными методами</h3>
                  </Link>
                  <p>
                    В перечень заболеваний, диагностики и лечение которых
                    проводится рентгенэндоваскулярными методами, входят:
                    Диагностическая коронарография – исследование просвета и
                    проходимости коронарных артерий; Стентирование коронарных
                    артерий – восстановление кровотока в суженных коронарных
                    артериях методом установки стента;
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ServicesCard
