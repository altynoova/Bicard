'use client'
import React, { useEffect } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/swiper-bundle.css';
// @ts-ignore
import { Navigation } from 'swiper'
import useCertificateStore from '@/store/useCertificateStore'
import { url } from '@/config';
import { useTranslations } from 'next-intl';
import PageBanner from '@/components/Common/PageBanner';

const Certificates = () => {
  const { GetAllCertificates, Certificates } = useCertificateStore()
  const t = useTranslations('Navbar');

  useEffect(() => {
    GetAllCertificates()
  }, [])

  return (
    <>
      <div>
        <PageBanner
          pageTitle={t('Certificates')}
          homePageUrl="/"
          homePageText={t('Home')}
          activePageText={t('Certificates')}
          bgImage="page-title-one"
        />
        <div className="blog-area-two pt-100 pb-70">
          <div className="container">
            <div className="row justify-content-center">
              <div className="review-area ptb-100">
                <div className="container">
                  <Swiper
                    navigation={true}
                    modules={[Navigation]}
                    className="Certificate-slider"
                  >
                    {Certificates.map((Certificate, index) => (
                      <SwiperSlide key={index}>
                        <div className="feedback-item1">
                          <div className="client-img">
                            <img src={`${url}/TempFileStorage/${Certificate.photoPath}`} alt="Сертификат" />
                          </div>
                          <p>{Certificate.description}</p>
                        </div>
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </>
  )
}

export default Certificates
