'use client'
import React from 'react'
import HeroSlider from '@/components/HomeOne/HeroSlider'
import Stats from '@/components/HomeOne/Stats'
import AboutSection from '@/components/HomeOne/AboutSection'
import Services from '@/components/HomeOne/Services'
import OurExpertise from '@/components/HomeOne/OurExpertise'
import VideoIntro from '@/components/Common/VideoIntro'
import OurDoctors from '@/components/Common/OurDoctors'
import LatestBlogPost from '@/components/Common/LatestBlogPost'
import NewsletterForm from '@/components/Common/NewsletterForm'
import {useTranslations} from 'next-intl';


export default function Home() {
  const t = useTranslations('Index');
  return (
    <div>
       <h1>{t('title')}</h1>
          <HeroSlider />
          <Stats />
          <AboutSection />
          <Services />
          <OurExpertise />
          <VideoIntro />
          <OurDoctors />
          <LatestBlogPost />
          <NewsletterForm />
    </div>
  )
}
