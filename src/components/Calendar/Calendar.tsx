'use client'
import React, { useEffect, useState } from 'react'
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

const hours = Array.from(
  { length: 24 },
  (_, i) => `${i < 10 ? '0' : ''}${i}:00`
)

const doctorData = {
  doctorId: 1,
  doctorName: 'Dr. John Doe',
  doctorSpecialty: 'Cardiology',
  days: [
    {
      date: '2024-05-27T00:00:00+06:00',
      dayOfWeek: 'Monday',
      startTime: '09:30',
      endTime: '17:00',
      timeslots: [
        { Time: '09:30', Status: 'available' },
        { Time: '10:00', Status: 'available' },
        { Time: '10:30', Status: 'available' },
        { Time: '11:00', Status: 'available' },
        { Time: '11:30', Status: 'available' },
        { Time: '12:00', Status: 'available' },
        { Time: '12:30', Status: 'available' },
        { Time: '13:00', Status: 'available' },
        { Time: '13:30', Status: 'available' },
        { Time: '14:00', Status: 'available' },
        { Time: '14:30', Status: 'available' },
        { Time: '15:00', Status: 'available' },
        { Time: '15:30', Status: 'available' },
        { Time: '16:00', Status: 'available' },
        { Time: '16:30', Status: 'available' },
      ],
    },
    {
      date: '2024-05-27T00:00:00+06:00',
      dayOfWeek: 'Tuesday',
      startTime: '09:30',
      endTime: '17:00',
      timeslots: [
        { Time: '09:30', Status: 'not available' },
        { Time: '10:00', Status: 'available' },
        { Time: '10:30', Status: 'available' },
        { Time: '11:00', Status: 'available' },
        { Time: '11:30', Status: 'available' },
        { Time: '12:00', Status: 'available' },
        { Time: '12:30', Status: 'available' },
        { Time: '13:00', Status: 'available' },
        { Time: '13:30', Status: 'available' },
        { Time: '14:00', Status: 'available' },
        { Time: '14:30', Status: 'available' },
        { Time: '15:00', Status: 'available' },
        { Time: '15:30', Status: 'available' },
        { Time: '16:00', Status: 'available' },
        { Time: '16:30', Status: 'available' },
      ],
    },
    // Add other days here...
  ],
}

const TimeButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(0.5),
}))

const Scheduler = () => {
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [selectedDoctor, setSelectedDoctor] = useState(doctorData)
  const [doctorId, setDoctorId] = useState<number | undefined>()
  const {
    doctors,
    currentDoctor,
    doctorTimetable,
    FetchDoctors,
    GetDoctor,
    GetTimetableByDoctor,
  } = useDoctorStore()

  const startOfWeekDate = startOfWeek(selectedDate)
  const endOfWeekDate = endOfWeek(selectedDate)
  const daysOfWeek = eachDayOfInterval({
    start: startOfWeekDate,
    end: endOfWeekDate,
  })

  const handleDoctorChange = (event: any) => {
    // Update selectedDoctor with the appropriate data based on event.target.value
    // For simplicity, we're using static data
    setSelectedDoctor(doctorData)
  }

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
        {doctorTimetable && (
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
                      >
                        {slot.Time}
                      </TimeButton>
                    ))}
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Paper>
        )}
      </Box>
    </LocalizationProvider>
  )
}

export default Scheduler
