'use client'
import React, { useEffect } from 'react'
import ServiceDetailsContent from '@/components/Services/ServiceDetailsContent'
import PageBanner from '@/components/Common/PageBanner'
import useMedServicesStore from '@/store/useMedServicesStore'
import Link from 'next/link'

const ServiceDetails = ({ params }: { params: { id: number } }) => {
  const {
    GetMedServiceById,
    GetListOfSubMedServices,
    currentMedService,
    currentSubMedServices,
  } = useMedServicesStore()

  const lastService = currentSubMedServices[currentSubMedServices.length - 1];

  useEffect(() => {
    GetMedServiceById(params.id)
    GetListOfSubMedServices(params.id)
  }, [])

  return (
    <div>
      <PageBanner
        pageTitle="Service Details"
        homePageUrl="/"
        homePageText="Home"
        activePageText="Service Details"
        bgImage="page-title-one"
      />

      <div className="service-details-area ptb-100">
        <div className="container">
          <div className="services-details-img">
            <h2>{currentMedService.name}</h2>
            <p>
              {currentMedService.shortDescription}
            </p>

            <blockquote>
              <i className="icofont-quote-left"></i>
              Лечим сердце от чистого сердца
            </blockquote>

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
                  {currentMedService.longDescription}
                </p>
              </div>
            </div>
          </div>

          <div className="row justify-space-between" style={{ marginTop: 50 }}>
            <div className="col-sm-6 col-lg-3">
              <div className="service-item">
                <div className="service-front">
                  <i className="icofont-prescription"></i>
                  <Link href="/service-details">
                    <h3>Диагностические услуги</h3>
                  </Link>
                  {currentSubMedServices.map((subservice) => (
                    <ul>
                      <li>{subservice.name} - {subservice.price}</li>
                    </ul>
                  ))}
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
                  <ul>
                    <li>
                      {lastService.name}-{lastService.price}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ServiceDetails
