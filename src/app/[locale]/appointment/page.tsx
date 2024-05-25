import React from 'react'
import AppointmentForm from '@/components/Appointment/AppointmentForm'
import PageBanner from '@/components/Common/PageBanner'
import { useTranslations } from 'next-intl';

const Appointment = () => {
  const t = useTranslations('Doctors');

  return (
    <div>
      <PageBanner
        pageTitle={t('Make an appointment')}
        homePageUrl="/"
        homePageText={t('Home')}
        activePageText={t('Make an appointment')}
        bgImage="page-title-one"
      />
      <AppointmentForm doctorId={0} />
    </div>
  )
}

export default Appointment
