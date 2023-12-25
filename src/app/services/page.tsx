import React from "react";
import OurExpertise from "@/components/Services/OurExpertise";
import PageBanner from "@/components/Common/PageBanner";
import ServicesCard from "@/components/Services/ServicesCard";

const Service = () => {
  return (
    <div>
      <PageBanner
        pageTitle="Сервисы"
        homePageUrl="/"
        homePageText="Главная"
        activePageText="Сервисы"
        bgImage="page-title-one"
      />

      <ServicesCard />

      <OurExpertise />
    </div>
  );
};

export default Service;
