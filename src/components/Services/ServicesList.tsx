'use client'
import React, { useEffect } from 'react'
import useMedServicesStore from '@/store/useMedServicesStore'
import ServiceCard from '@/components/Services/ServiceCard'

const ServicesList = () => {
  const { GetListOfMedServices, medServices } = useMedServicesStore()

  useEffect(() => {
    GetListOfMedServices()
  }, [])

  return (
    <>
      <div className="services-area pt-100 pb-70">
        <div className="container">
          <div className="row align-items-center justify-content-center">
            {medServices.map((s) => (
              <div key={s.id} className="col-sm-6 col-lg-3">
                <ServiceCard id={s.id} shortDescription={s.shortDescription} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default ServicesList
