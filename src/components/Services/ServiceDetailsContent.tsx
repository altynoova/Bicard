import Link from 'next/link'
import React from 'react'

const ServiceDetailsContent = () => {
  return (
    <>
      <div className="service-details-area ptb-100">
        <div className="container">
          <div className="services-details-img">
            <h2>Our Hospital Always Provide Good Services</h2>
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of
              Lorem Ipsum.
            </p>

            <blockquote>
              <i className="icofont-quote-left"></i>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint
              optio rem magni, dolorum aut vel nostrum quae, fugit
              necessitatibus eius perferendis. Quia optio tenetur pariatur
              aliquam obcaecati enim quam eum?Lorem ipsum dolor sit amet
              consectetur adipisicing elit. Sint optio rem magni, dolorum aut
              vel nostrum quae, fugit necessitatibus eius perferendis. Quia
              optio tenetur pariatur aliquam obcaecati enim quam eum?
            </blockquote>
            <div className="row justify-space-between">
              <div className="col-sm-6 col-lg-3">
                <div className="service-item">
                  <div className="service-front">
                    <i className="icofont-prescription"></i>
                    <Link href="/service-details">
                      <h3>Диагностические услуги</h3>
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
                  <i className="icofont-patient-file"></i>
                  <Link href="/service-details">
                    <h3>Амбулаторно-поликлиническая помощь</h3>
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
            </div>
          </div>

          <div className="row">
            <div className="col-lg-5">
              <div className="service-details-inner-left">
                <img src="/images/signup-bg.jpg" alt="Service" />
              </div>
            </div>
            <div className="col-lg-7">
              <div className="service-details-inner">
                <h2>We Always Take Care Our Patient</h2>
                <p>
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                  Architecto blanditiis obcaecati veritatis magnam pariatur
                  molestiae in maxime. Animi quae vitae in inventore. Totam
                  mollitia aspernatur provident veniam aperiam placeat impedit!
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Saepe rem natus nobis, dolorum nam excepturi iure autem nemo
                  ducimus temporibus facere, est eum voluptatem, culpa optio
                  fugit assumenda quod? Praesentium.
                </p>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Id,
                  laudantium ullam, iure distinctio officia libero voluptatem
                  obcaecati vero deleniti minima nemo itaque alias nisi eveniet
                  soluta architecto quae laboriosam unde.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ServiceDetailsContent
