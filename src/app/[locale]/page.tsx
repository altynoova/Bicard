'use client'
import React from 'react'
import Services from '@/components/HomeOne/Services'
import OurExpertise from '@/components/HomeOne/OurExpertise'
import VideoIntro from '@/components/Common/VideoIntro'
import LatestBlogPost from '@/components/Common/LatestBlogPost'
import PageBanner from '@/components/Common/PageBanner'
import AboutContent from '@/components/About/AboutContent'
import FunFacts from '@/components/Common/FunFacts'
import TestimonialSlider from '@/components/Common/TestimonialSlider'
import { useTranslations } from 'next-intl'


export default function Home() {
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
      <VideoIntro />
      <FunFacts />
      <OurExpertise />
      <Services />
      <LatestBlogPost />
      <TestimonialSlider />
      </div>
  )
}
