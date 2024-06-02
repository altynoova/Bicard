'use client'
import React, { useEffect, useReducer, useState } from 'react'
import {
  Box,
  Button,
  Typography,
  Grid,
  Paper,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Avatar,
} from '@mui/material'
import {
  addDays,
} from 'date-fns'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { LocalizationProvider } from '@mui/x-date-pickers'
import useDoctorStore from '@/store/useDoctorStore'
import { styled } from '@mui/system'
import AppointmentModalWindow from '@/components/Appointment/AppointmentModalWindow'
import { url } from '@/config'
import { useTranslations } from 'next-intl'
import useScheduleStore from '@/store/useSchedulesStore'
import { useRouter } from 'next/navigation'

const TimeButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(0.5),
}))

const Scheduler = () => {
  const t = useTranslations('Services');
  const router = useRouter();

  const [selectedDate, setSelectedDate] = useState(new Date())
  const [selectedTime, setSelectedTime] = useState('')
  const [doctorId, setDoctorId] = useState<number | undefined>()
  const [openModal, setOpenModal] = useState(false)
  const [, forceUpdate] = useReducer((x) => x + 1, 0)
  const { daysOfWeek } = useScheduleStore()
  const filtereddays = daysOfWeek.filter(day => day.id)


  const handleOpen = () => {
    setOpenModal(true)
  }

  const handleClose = () => {
    setOpenModal(false)
  }
  const {
    doctors,
    currentDoctor,
    doctorTimetable,
    FetchDoctors,
    GetDoctor,
    GetTimetableByDoctor,
  } = useDoctorStore()

  useEffect(() => {
    FetchDoctors()
  }, [])

  useEffect(() => {
    GetDoctor(Number(doctorId))
    GetTimetableByDoctor(selectedDate.toJSON(), Number(doctorId))
  }, [doctorId,selectedDate])

  useEffect(() => {
    console.log(doctorTimetable)
  }, [doctorTimetable])

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box sx={{ padding: 10 }}>
        <div className='row'>
          <div className="col-lg-4">
            <div className="appointment-item-two-right">
              <div className="appointment-item-content">
                <h2>{t('WorkHours clinic')}</h2>
                <ul>
                  {filtereddays.map((day) => (
                    <>
                      <li>
                        {t(day.name)} <span>{day.time}</span>
                      </li>
                    </>
                  ))}
                </ul>
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
                    <b>{new Date(selectedDate).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' })}</b>
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
              <Grid item>
                <FormControl fullWidth>
                  <InputLabel id="doctor-select-label">{t('Select doctor')}</InputLabel>
                  <Select
                    labelId="service-simple-select-label"
                    size="small"
                    value={doctorId}
                    onChange={(event) => setDoctorId(event.target.value as number)}
                    sx={{ width: '200px' }}
                    MenuProps={{
                      disableScrollLock: true,
                    }}
                  >
                    <MenuItem disabled value={undefined}>
                      None
                    </MenuItem>
                    {doctors.map((d) => (
                      <MenuItem key={d.name} value={d.id}>
                        {d.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
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
                              <Typography>{new Date(day.date).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' })}   {t(dayy?.name)} </Typography>
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
                {doctorId && selectedTime && selectedDate && (
                  <AppointmentModalWindow
                    open={openModal}
                    handleClose={handleClose}
                    time={selectedTime}
                    date={selectedDate}
                    doctorId={doctorId}
                  />
                )}
              </Paper>
            )}
          </div>
        </div>
      </Box>
    </LocalizationProvider>
  )
}

export default Scheduler
