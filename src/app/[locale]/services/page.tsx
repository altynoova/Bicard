import React from 'react'
import PageBanner from '@/components/Common/PageBanner'
import OurExpertise from '@/components/Services/OurExpertise'
import ServicesList from '@/components/Services/ServicesList'
import { useTranslations } from 'next-intl'

const Service = () => {
  const t = useTranslations('Services');

  return (
    <div>
      <PageBanner
        pageTitle={t('Services')}
        homePageUrl="/"
        homePageText={t('Home')}
        activePageText={t('Services')}
        bgImage="page-title-one"
      />

      <ServicesList />
    </div>
  )
}

export default Service
