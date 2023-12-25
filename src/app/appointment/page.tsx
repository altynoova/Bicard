import React from "react";
import AppointmentFormq from "@/components/Appointment/AppointmentForm";
import PageBanner from "@/components/Common/PageBanner";

const Appointment = () => {
  return (
    <div>
      <PageBanner
        pageTitle="Онлайн запись"
        homePageUrl="/"
        homePageText="Главная"
        activePageText="Онлайн запись"
        bgImage="page-title-one"
      />

      <AppointmentFormq />
    </div>
  );
};

export default Appointment;
