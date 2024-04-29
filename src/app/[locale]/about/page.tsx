import React from 'react'
import PageBanner from '@/components/Common/PageBanner'
import FunFacts from '@/components/Common/FunFacts'
import TestimonialSlider from '@/components/Common/TestimonialSlider'
import LatestBlogPost from '@/components/Common/LatestBlogPost'
import AboutContent from '@/components/About/AboutContent'
import OurExpertise from '@/components/HomeOne/OurExpertise'
import Services from '@/components/HomeOne/Services'
import { useTranslations } from 'next-intl'

const About = () => {
  const t = useTranslations('About');
  return (
    <div>
      <PageBanner
        pageTitle={t('AboutCompany')}
        homePageUrl="/"
        homePageText={t('Home')}
        activePageText={t('AboutCompany')}
        bgImage="page-title-one"
      />
      <AboutContent />
      <FunFacts />
      <OurExpertise />
      <Services />
      <LatestBlogPost />
      <TestimonialSlider />
    </div>
  )
}

export default About