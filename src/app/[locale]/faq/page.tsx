'use client'
import React from 'react'
import PageBanner from '@/components/Common/PageBanner'
import FaqSection from '@/components/Common/FaqSection'

const Faq = () => {
  return (
    <div>
      <PageBanner
        pageTitle="FAQ's"
        homePageUrl="/"
        homePageText="Home"
        activePageText="Faq"
        bgImage="page-title-one"
      />

      <div className="ptb-100">
        <div className="container">
          <div className="faq-content">
            <h2>Dental Care</h2>

            <FaqSection />
          </div>

          <div className="faq-content">
            <h2>Cardiology</h2>

            <FaqSection />
          </div>

          <div className="faq-content">
            <h2>Diagnosis</h2>

            <FaqSection />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Faq
