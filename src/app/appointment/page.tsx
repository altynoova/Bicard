import React from "react";
import AppointmentFormq from "@/components/Appointment/AppointmentForm";
import PageBanner from "@/components/Common/PageBanner";

const Appointment = () => {
  return (
    <div>
      <PageBanner
        pageTitle="Appointment"
        homePageUrl="/"
        homePageText="Home"
        activePageText="Appointment"
        bgImage="page-title-one"
      />

      <AppointmentFormq />
    </div>
  );
};

export default Appointment;
