import React from 'react'
import ServiceDetailsContent from '@/components/Services/ServiceDetailsContent'
import PageBanner from '@/components/Common/PageBanner'

const ServiceDetails = () => {
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
