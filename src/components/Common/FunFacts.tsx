'use client'
import { Testimonial } from '@/entities/Testimonials';
import useTestimonialstore from '@/store/useTestimonialstore';
import { useTranslations } from 'next-intl';
import React, { useEffect, useState } from 'react'

const FunFacts = () => {
  const t = useTranslations('About');
  const currentYear = new Date().getFullYear();
  const yearsOfExperience = currentYear - 2016;
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
      <div className="counter-area counter-bg counter-area-four">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-sm-6 col-lg-3">
              <div className="counter-item">
                <i className="icofont-patient-bed"></i>
                <h3 className="counter">{firstTestimonial?.numberOfBeds}</h3>
                <p>{t('Beds')}</p>
              </div>
            </div>

            <div className="col-sm-6 col-lg-3">
              <div className="counter-item">
                <i className="icofont-people"></i>
                <h3>
                  <span className="counter">{firstTestimonial?.numberOfPatients}</span>+
                </h3>
                <p>{t('Happy Patients')}</p>
              </div>
            </div>

            <div className="col-sm-6 col-lg-3">
              <div className="counter-item">
                <i className="icofont-doctor-alt"></i>
                <h3 className="counter">{firstTestimonial?.numberOfEmployees}</h3>
                <p>{t('Employees')}</p>
              </div>
            </div>

            <div className="col-sm-6 col-lg-3">
              <div className="counter-item">
                <i className="icofont-badge"></i>
                <h3 className="counter">{yearsOfExperience}</h3>
                <p>{t('Years of experience')} </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default FunFacts
