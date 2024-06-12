'use client'
import React, { useEffect } from 'react'
import Link from 'next/link'
import useMedServicesStore from '@/store/useMedServicesStore'
import { useTranslations } from 'next-intl'

const Services = () => {
  const t = useTranslations('Services')
  const { GetListOfMedServices, medServices } = useMedServicesStore()

  useEffect(() => {
    GetListOfMedServices()
  }, [])
  return (
    <>
      <div className="services-area pb-70">
        <div className="container">
          <div className="section-title">
            <h2>{t('Services')}</h2>
          </div>
          <div className="row justify-content-center">
            {medServices.map((service, index) => (
              <div className="col-sm-6 col-lg-3" key={index}>
                <div className="service-item">
                  <div className="service-front">
                    {(index + 1) % 4 === 1 && <i className="icofont-doctor"></i>}
                    {(index + 1) % 4 === 2 && <i className="icofont-prescription"></i>}
                    {(index + 1) % 4 === 3 && <i className="icofont-patient-file"></i>}
                    {(index + 1) % 4 === 0 && <i className="icofont-dna-alt-1"></i>}
                    <Link href={`/services/details/${service.id}`}>
                      <h3>{service.name}</h3>
                    </Link>
                    <div className='service-wrap'>
                      {service.longDescription}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default Services
