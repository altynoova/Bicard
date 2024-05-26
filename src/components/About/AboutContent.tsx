'use client'
import useMedServicesStore from '@/store/useMedServicesStore';
import { useTranslations } from 'next-intl';
import React, { useEffect } from 'react'
const AboutContent = () => {
const t = useTranslations('About');
const zzz = useMedServicesStore().GetAllSubMedServices
const { allSubMedServices } = useMedServicesStore()
useEffect(() => {
  zzz()
}, [])
  return (
    
    <>
      <div className="about-area pt-100 pb-70">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <div className="about-item">
                <div className="about-left">
                  <img src="/images/about41.png" alt="About" />
                </div>
              </div>
            </div>

            <div className="col-lg-6">
              <div className="about-item about-right">
                <img src="/images/about-shape1.png" alt="About" />
                <h2>{t('AboutUs')}</h2>
                <p>
                {t('AboutBicard')}
                 </p>
                 {allSubMedServices.map((subservice) => (
                  <p>{subservice.name.toUpperCase()}</p>
                 ))}
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
