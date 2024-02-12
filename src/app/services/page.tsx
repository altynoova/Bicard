import React from 'react'
import PageBanner from '@/components/Common/PageBanner'
import OurExpertise from '@/components/Services/OurExpertise'
import ServicesList from '@/components/Services/ServicesList'

const Service = () => {
  return (
    <div>
      <PageBanner
        pageTitle="Сервисы"
        homePageUrl="/"
        homePageText="Главная"
        activePageText="Сервисы"
        bgImage="page-title-one"
      />

      <ServicesList />

      <OurExpertise />
    </div>
  )
}

export default Service
