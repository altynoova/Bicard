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
  format,
  addDays,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
} from 'date-fns'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { LocalizationProvider } from '@mui/x-date-pickers'
import useDoctorStore from '@/store/useDoctorStore'
import { styled } from '@mui/system'
import AppointmentModalWindow from '@/components/Appointment/AppointmentModalWindow'

const TimeButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(0.5),
}))

const Scheduler = () => {
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [selectedTime, setSelectedTime] = useState('')
  const [doctorId, setDoctorId] = useState<number | undefined>()
  const [openModal, setOpenModal] = useState(false)
  const [, forceUpdate] = useReducer((x) => x + 1, 0)

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
    GetTimetableByDoctor(new Date().toJSON(), Number(doctorId))
  }, [doctorId])

  useEffect(() => {
    console.log(doctorTimetable)
  }, [doctorTimetable])

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box sx={{ padding: 3 }}>
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item>
            <Button
              variant="contained"
              onClick={() => setSelectedDate(new Date())}
            >
              Today
            </Button>
          </Grid>
          <Grid item>
            <Grid container spacing={2}>
              <Grid item>
                <Button
                  variant="contained"
                  onClick={() => setSelectedDate(addDays(selectedDate, -7))}
                >
                  Back
                </Button>
              </Grid>
              <Grid item>
                <Button
                  variant="contained"
                  onClick={() => setSelectedDate(addDays(selectedDate, 7))}
                >
                  Next
                </Button>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Typography variant="h6">
              {format(selectedDate, 'dd MMM yyyy')}
            </Typography>
          </Grid>
          <Grid item>
            <FormControl fullWidth>
              <InputLabel id="doctor-select-label">Select Doctor</InputLabel>
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
                  alt="Татьяна Антоновна 
                  Мээрим бул жактарды озгорт"
                  src="path/to/image.jpg" // Use the path to the actual image
                  sx={{ width: 80, height: 80 }}
                />
                <Typography variant="h6" component="div">
                  8.6
                  {/*Мээрим бул жактарды озгорт*/}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  12 отзывов
                  {/*Мээрим бул жактарды озгорт*/}
                </Typography>
              </Grid>
              <Grid item xs={9}>
                <Typography variant="h6" component="div">
                  {currentDoctor.name}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Акушер-гинеколог
                  {/*Мээрим бул жактарды озгорт*/}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Стаж 34 года / Врач высшей категории
                  {/*Мээрим бул жактарды озгорт*/}
                </Typography>
                <Typography variant="body1" component="div" color="error">
                  Прием в клинике 10000 тг.
                  {/*Мээрим бул жактарды озгорт*/}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Ayala, ул. Туркестан, 28/2, Есильский район, Левый берег,
                  Астана
                  {/*Мээрим бул жактарды озгорт*/}
                </Typography>
              </Grid>
            </Grid>
            <Box mt={2}>
              <Grid container justifyContent={'start'}>
                {doctorTimetable.map((day, idx) => (
                  <Grid item xs={12} key={idx}>
                    <Typography>{day.dayOfWeek}</Typography>
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
                        {/*Мээрим ойгон*/}
                      </TimeButton>
                    ))}
                  </Grid>
                ))}
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
      </Box>
    </LocalizationProvider>
  )
}

export default Scheduler
