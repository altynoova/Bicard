import React from "react";
import PageBanner from "@/components/Common/PageBanner";
import AboutContent1 from "@/components/About/AboutContent";
import FunFacts from "@/components/Common/FunFacts";
import OurExpertise from "@/components/HomeOne/OurExpertise";
import Services from "@/components/HomeOne/Services";
import TestimonialSlider from "@/components/Common/TestimonialSlider";
import LatestBlogPost from "@/components/Common/LatestBlogPost";

const About = () => {
  return (
    <div>
      <PageBanner
        pageTitle="About"
        homePageUrl="/"
        homePageText="Home"
        activePageText="About"
        bgImage="page-title-one"
      />

      <AboutContent1 />

      <FunFacts />

      <OurExpertise />

      <Services />

      <TestimonialSlider />

      <LatestBlogPost />
    </div>
  );
};

export default About;
