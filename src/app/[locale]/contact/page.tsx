'use client'
import React from 'react'
import PageBanner from '@/components/Common/PageBanner'
import GoogleMap from '@/components/Contact/GoogleMap'
import ContactInfo from '@/components/Contact/ContactInfo'
import ContactForm from '@/components/Contact/ContactForm'

const Contact = () => {
  return (
    <div>
      <PageBanner
        pageTitle="Свяжитесь с нами"
        homePageUrl="/"
        homePageText="Главная"
        activePageText="Свяжитесь с нами"
        bgImage="page-title-one"
      />

      <ContactInfo />

      <ContactForm />

      <GoogleMap />
    </div>
  )
}

export default Contact
