'use client'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { useTranslations } from 'next-intl'
import useTestimonialstore from '@/store/useTestimonialstore'
import { Testimonial } from '@/entities/Testimonials'
import { url } from '@/config'

const OurExpertise = () => {
  const t = useTranslations('About')
  const { FetchTestimonials, Testimonials } = useTestimonialstore();
  const [firstTestimonial, setFirstTestimonial] = useState<Testimonial | null>(null);
  useEffect(() => {
    // Fetch testimonials when the component mounts
    FetchTestimonials();
  }, [FetchTestimonials]);
  useEffect(() => {
    // Set the first testimonial after fetching
    if (Testimonials && Testimonials.length > 0) {
      setFirstTestimonial(Testimonials[0]);
    }
  })
  return (
    <>
      <div className="expertise-area pb-70">
        <div className="container">
          <div className="section-title">
            <h2>{t('Our experts')}</h2>
          </div>

          <div className="row align-items-center">
            <div className="col-lg-6">
              <div className="expertise-item">
                <div className="row">
                  <div className="col-sm-6 col-lg-6">
                    <div className="expertise-inner">
                      <i className="icofont-doctor-alt"></i>
                      <h3>
                        <Link href="/doctors/details">{t('experts')}</Link>
                      </h3>
                      <p>{t('expertsDesc')}</p>
                    </div>
                  </div>
                  <div className="col-sm-6 col-lg-6">
                    <div className="expertise-inner">
                      <i className="icofont-stretcher"></i>
                      <h3>
                        <Link href="/doctors/details">{t('emergency')}</Link>
                      </h3>
                      <p>{t('emergencyDesc')}</p>
                    </div>
                  </div>
                  <div className="col-sm-6 col-lg-6">
                    <div className="expertise-inner">
                      <i className="icofont-network"></i>
                      <h3>
                        <Link href="/doctors/details">{t('tech')}</Link>
                      </h3>
                      <p>{t('techDesc')}</p>
                    </div>
                  </div>
                  <div className="col-sm-6 col-lg-6">
                    <div className="expertise-inner">
                      <i className="icofont-ambulance-cross"></i>
                      <h3>
                        <Link href="/doctors/details">{t('diagnostics')}</Link>
                      </h3>
                      <p>{t('diagnosticsDesc')}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-6">
              <div className="expertise-item">
                <div className="expertise-right">
                <img src={`${url}/TempFileStorage/${firstTestimonial?.pathToPhoto2}`} alt="Фото клиники" />
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
