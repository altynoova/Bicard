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

export default function Home() {
  return (
    <div>
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
