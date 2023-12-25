'use client'
import React from "react";
import GoogleMap from "@/components/Contact/GoogleMap";
import PageBanner from "@/components/Common/PageBanner";
import ContactInfo from "@/components/Contact/ContactInfo";
import ContactForm from "@/components/Contact/ContactForm";

const Contact = () => {
  return (
    <div>
      <PageBanner
        pageTitle="Contact Us"
        homePageUrl="/"
        homePageText="Home"
        activePageText="Contact Us"
        bgImage="page-title-one"
      />

      <ContactInfo />

      <ContactForm />

      <GoogleMap />
    </div>
  );
};

export default Contact;
