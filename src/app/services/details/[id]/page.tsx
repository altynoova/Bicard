'use client'
import React, { useEffect } from 'react'
import ServiceDetailsContent from '@/components/Services/ServiceDetailsContent'
import PageBanner from '@/components/Common/PageBanner'
import useMedServicesStore from '@/store/useMedServicesStore'

const ServiceDetails = ({ params }: { params: { id: number } }) => {
  const {
    GetMedServiceById,
    GetListOfSubMedServices,
    currentMedService,
    currentSubMedServices,
  } = useMedServicesStore()

  console.log(currentMedService)
  console.log(currentSubMedServices)

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

      <ServiceDetailsContent />
    </div>
  )
}

export default ServiceDetails
