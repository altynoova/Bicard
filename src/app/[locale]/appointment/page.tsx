import React from 'react'
import AppointmentForm from '@/components/Appointment/AppointmentForm'
import PageBanner from '@/components/Common/PageBanner'

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
      <AppointmentForm />
    </div>
  )
}

export default Appointment
