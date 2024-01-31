import React from 'react'
import PageBanner from '@/components/Common/PageBanner'
import OurExpertise from '@/components/Services/OurExpertise'
import ServicesCard from '@/components/Services/ServicesCard'

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

      <ServicesCard />

      <OurExpertise />
    </div>
  )
}

export default Service
