'use client'
import React, { useEffect, useReducer, useState } from 'react'
import PageBanner from '@/components/Common/PageBanner'
import useDoctorStore from '@/store/useDoctorStore'
import useUserStore from '@/store/useUserStore'
import { useTranslations } from 'next-intl'
import { url } from '@/config'
import useScheduleStore from '@/store/useSchedulesStore'
import { Avatar, Box, Button, Grid, Paper, Typography, styled } from '@mui/material'
import AppointmentModalWindow from '@/components/Appointment/AppointmentModalWindow'
import { useRouter } from 'next/navigation'
import { addDays } from 'date-fns'

const DoctorsDetails = ({ params }: { params: { id: number } }) => {
  const t = useTranslations('Doctors');
  const { user } = useUserStore()
  const { daysOfWeek, schedules, GetEmployeeScheduleById } = useScheduleStore()
  const router = useRouter();
  const TimeButton = styled(Button)(({ theme }) => ({
    margin: theme.spacing(0.5),
  }))
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [selectedTime, setSelectedTime] = useState('')
  const [openModal, setOpenModal] = useState(false)
  const [, forceUpdate] = useReducer((x) => x + 1, 0)
  const {
    currentDoctor,
    doctorTimetable,
    GetDoctor,
    GetTimetableByDoctor,
  } = useDoctorStore()

  useEffect(() => {
    GetEmployeeScheduleById(params.id)
    GetDoctor(params.id)
    GetTimetableByDoctor(selectedDate.toJSON(), params.id)
  }, [params.id, selectedDate])

  useEffect(() => {
    console.log(doctorTimetable)
  }, [doctorTimetable])

  const handleOpen = () => {
    setOpenModal(true)
  }

  const handleClose = () => {
    setOpenModal(false)
  }

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
            <div className="col-lg-4">
              <div className="doctor-details-item doctor-details-left">
                <img width={250} height={400} src={`${url}/TempFileStorage/${currentDoctor.pathToPhoto}`} alt={currentDoctor.name} />
                <div className="doctor-details-contact" style={{paddingBottom:20}}>
                 
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
          <Box sx={{ padding: 10 }}>
            <div className='row'>
              <div className="col-lg-5">
                <div className="doctor-details-work">
                  <h3>{t('DoctorsWorkHours')}</h3>
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
              <div className="col-lg-7">
                <Grid container justifyContent="space-between" alignItems="center" paddingBottom={10}>
                  <Grid item>
                  </Grid>
                  <Grid item>
                    <Grid container spacing={2}>
                      <Grid item>
                        <Button
                          variant="contained"
                          onClick={() => setSelectedDate(addDays(selectedDate, -7))}
                        >
                          {t('Back')}
                        </Button>
                      </Grid>
                      <Grid item>
                        <Typography variant="h6">
                          <b>{new Date(selectedDate).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' }).replace(/\//g, '-')}</b>
                        </Typography>
                      </Grid>
                      <Grid item>
                        <Button
                          variant="contained"
                          onClick={() => setSelectedDate(addDays(selectedDate, 7))}
                        >
                          {t('Next')}
                        </Button>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
                {doctorTimetable.length > 0 && (
                  <Paper
                    elevation={3}
                    sx={{ padding: 2, maxWidth: 600, margin: 'auto' }}
                  >
                    <Grid container spacing={2}>
                      <Grid item xs={3}>
                        <Avatar
                          alt={currentDoctor.name}
                          src={`${url}/TempFileStorage/${currentDoctor.pathToPhoto}`}
                          sx={{ width: 80, height: 80 }}
                        />
                        <Typography variant="h6" component="div">

                        </Typography>
                        <Typography variant="body2" color="textSecondary">

                        </Typography>
                      </Grid>
                      <Grid item xs={9}>
                        <Typography variant="h6" component="div">
                          {currentDoctor.name}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                          {currentDoctor.speciality}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">

                        </Typography>
                      </Grid>
                    </Grid>
                    <Box mt={2}>
                      <Grid container justifyContent={'start'}>
                        {doctorTimetable.map((day, idx) => {
                          const dayy = daysOfWeek.find(d => d.id === Number(day.dayOfWeek));
                          if (dayy) {
                            return (
                              <Grid item xs={12} key={idx}>
                                {day.timeslots.length > 0 ? (
                                  <Typography>{new Date(day.date).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' }).replace(/\//g, '-')}   {t(dayy?.name)} </Typography>
                                ) : (
                                  <Typography></Typography>
                                )}
                                {day.timeslots.map((slot, index) => (
                                  <TimeButton
                                    disabled={slot.Status === 'booked'}
                                    variant="contained"
                                    color="primary"
                                    key={index}
                                    onClick={() => {
                                      setSelectedDate(new Date(day.date))
                                      setSelectedTime(slot.Time)
                                      handleOpen()
                                      forceUpdate()
                                    }}
                                  >
                                    {slot.Time}
                                  </TimeButton>
                                ))}
                              </Grid>
                            )
                          }
                        })}
                      </Grid>
                    </Box>
                    {currentDoctor.id && selectedTime && selectedDate && (
                      <AppointmentModalWindow
                        open={openModal}
                        handleClose={handleClose}
                        time={selectedTime}
                        date={selectedDate}
                        doctorId={currentDoctor.id}
                      />
                    )}
                  </Paper>
                )}
              </div>
            </div>
          </Box>
        </div>
      </div>
    </div>
  )
}

export default DoctorsDetails
