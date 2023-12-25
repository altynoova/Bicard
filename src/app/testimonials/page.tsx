import React from "react";
import PageBanner from "@/components/Common/PageBanner";
import OurExpertise from "@/components/HomeOne/OurExpertise";
import TestimonialSlider from "@/components/Common/TestimonialSlider";
import OurDoctors from "@/components/Common/OurDoctors";

const Testimonials = () => {
  return (
    <div>
      <PageBanner
        pageTitle="Testimonials"
        homePageUrl="/"
        homePageText="Home"
        activePageText="Testimonials"
        bgImage="page-title-one"
      />

      <div className="pt-100">
        <OurExpertise />
      </div>

      <TestimonialSlider />

      <OurDoctors />
    </div>
  );
};

export default Testimonials;
