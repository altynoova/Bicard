'use client'
import React from 'react'
import PageBanner from '@/components/Common/PageBanner'
import GoogleMap from '@/components/Contact/GoogleMap'
import ContactInfo from '@/components/Contact/ContactInfo'
import ContactForm from '@/components/Contact/ContactForm'
import { useTranslations } from 'next-intl'
import FeedbackForm from '@/components/Doctors/FeedbackForm'

const Contact = () => {
  const t = useTranslations('Contact');
  return (
    <div>
      <PageBanner
        pageTitle= {t('Contact us')}
        homePageUrl="/"
        homePageText={t('Home')}
        activePageText={t('Contact us')}
        bgImage="page-title-one"
      />

      <ContactInfo />
      <GoogleMap />
    </div>
  )
}

export default Contact
