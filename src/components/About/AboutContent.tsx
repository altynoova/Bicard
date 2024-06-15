'use client'
import { url } from '@/config';
import { Testimonial } from '@/entities/Testimonials';
import useMedServicesStore from '@/store/useMedServicesStore';
import useTestimonialstore from '@/store/useTestimonialstore';
import { useTranslations } from 'next-intl';
import React, { useEffect, useState } from 'react'
const AboutContent = () => {
  const t = useTranslations('About');
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
  }, [Testimonials]);
  return (

    <>
      <div className="about-area pt-100 pb-70">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <div className="about-item">
                <div className="about-left">
                  <img src={`${url}/TempFileStorage/${firstTestimonial?.pathToPhoto1}`} alt="Фото клиники" />
                </div>
              </div>
            </div>

            <div className="col-lg-6">
              <div className="about-item about-right">
                <img src="/images/about-shape1.png" alt="About" />
                <h2>{t('AboutUs')}</h2>
                  <div dangerouslySetInnerHTML={{ __html: firstTestimonial?.intro || '' }}></div>
                <ul>
                  <li>
                    <i className="icofont-check-circled"></i>
                    {t('Browse our site')}

                  </li>
                  <li>
                    <i className="icofont-check-circled"></i>
                    {t('Select a service')}
                  </li>
                  <li>
                    <i className="icofont-check-circled"></i>
                    {t('Send a message')}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default AboutContent
