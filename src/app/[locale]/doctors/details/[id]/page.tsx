'use client'
import React, { useEffect } from 'react'
import Image from 'next/image'
import PageBanner from '@/components/Common/PageBanner'
import AppointmentForm from '@/components/Appointment/AppointmentForm'
import useDoctorStore from '@/store/useDoctorStore'
import useUserStore from '@/store/useUserStore'
import { useTranslations } from 'next-intl'
import LatestArticles from '@/components/Common/LatestArticles'
import { url } from '@/config'
import useScheduleStore from '@/store/useSchedulesStore'
const DoctorsDetails = ({ params }: { params: { id: number } }) => {
  const { GetDoctor, currentDoctor } = useDoctorStore()
  const t = useTranslations('Doctors');
  const { user } = useUserStore()
  const { daysOfWeek, schedules, GetEmployeeScheduleById } = useScheduleStore()
  useEffect(() => {
    GetDoctor(params.id)
    GetEmployeeScheduleById(params.id)
    daysOfWeek
  }, [])

  return (
    <div>
      <PageBanner
        pageTitle={currentDoctor?.name || ''}
        homePageUrl="/"
        homePageText={t('Home')}
        activePageText={t('Doctors')}
        bgImage="page-title-five"
      />
      <div className="doctor-details-area pt-100 pb-70">
        <div className="container">
          <div className="row">
            <div className="col-lg-5">
              <div className="doctor-details-item doctor-details-left">
                <img width={250} height={400} src={`${url}/TempFileStorage/${currentDoctor.pathToPhoto}`} alt={currentDoctor.name} />

                <div className="doctor-details-contact">
                  <h3>{t('Contacts')}</h3>
                  <ul>
                    <li>
                      <i className="icofont-ui-call"></i>
                      {currentDoctor?.phoneNumber}
                    </li>
                    <li>
                      <i className="icofont-ui-message"></i>
                      {currentDoctor?.email}
                    </li>
                  </ul>
                </div>

                <div className="doctor-details-work">
                  <h3>{t('WorkHours')}</h3>
                  <div className="appointment-item-two-right">
                    <div className="appointment-item-content">
                      <ul>
                        {schedules.map((d) => {
                          const day = daysOfWeek.find(day => day.id == d.dayOfWeek);
                          if (day) {
                            return (
                              <li key={d.id}>
                                {t(day.name)} <span>{d.startTime} - {d.endTime}</span>
                              </li>
                            );
                          }
                          return null;
                        })}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-7">
              <div className="doctor-details-item">
                <div className="doctor-details-right">
                  <div className="doctor-details-biography">
                    <h3>{currentDoctor?.name}</h3>
                    <p>{currentDoctor?.speciality}</p>
                  </div>

                  <div className="doctor-details-biography">
                    <h3>{t('Biography')}</h3>

                    <p>{currentDoctor?.bio}</p>

                    <p></p>
                  </div>

                  <div className="doctor-details-biography">
                    <h3>{t('Education')}</h3>
                    <ul>
                      <li>{currentDoctor?.education}</li>
                    </ul>
                  </div>

                  <div className="doctor-details-biography">
                    <h3>{t('Experience')}</h3>
                    <p>{currentDoctor?.experience}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <LatestArticles />
    </div>
  )
}

export default DoctorsDetails
