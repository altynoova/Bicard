import React from 'react'
import PageBanner from '@/components/Common/PageBanner'
import FunFacts from '@/components/Common/FunFacts'
import TestimonialSlider from '@/components/Common/TestimonialSlider'
import LatestBlogPost from '@/components/Common/LatestBlogPost'
import AboutContent from '@/components/About/AboutContent'
import OurExpertise from '@/components/HomeOne/OurExpertise'
import Services from '@/components/HomeOne/Services'

const About = () => {
  return (
    <div>
      <PageBanner
        pageTitle="О компании"
        homePageUrl="/"
        homePageText="Главная"
        activePageText="О компании"
        bgImage="page-title-one"
      />
      <AboutContent />
      <FunFacts />
      <OurExpertise />
      <Services />
      <TestimonialSlider />
      <LatestBlogPost />
    </div>
  )
}

export default About
