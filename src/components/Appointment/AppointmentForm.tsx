'use client'
import React, { useEffect, useState } from 'react'
import { CreateAppointmentModel } from '@/entities/Appoinment'
import useMedServicesStore from '@/store/useMedServicesStore'
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker'
import dayjs, { Dayjs } from 'dayjs'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { Box, Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import useAppointmentsStore from '@/store/useAppointmentsStore'
import { ErrorAlert, SuccessAlert } from '@/libs/helpers/Alert'
import { useTranslations } from 'next-intl'
import useScheduleStore from '@/store/useSchedulesStore'

interface IAppointmentForm {
  doctorId: number
}

const AppointmentForm = ({ doctorId }: IAppointmentForm) => {
  const { CreateAppointment } = useAppointmentsStore()
  const { GetAllSubMedServices, allSubMedServices } = useMedServicesStore()
  const t = useTranslations('Doctors');
  const { daysOfWeek } = useScheduleStore()
  const [name, setName] = useState<string>('')
  const [age, setAge] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [phoneNumber, setPhoneNumber] = useState<string>('')
  const [subMedServiceId, setSubMedServiceId] = useState(0)
  const [timeAtSchedule, setTimeAtSchedule] = useState<Dayjs | null>(dayjs('2022-04-17T15:30'))
  const filtereddays = daysOfWeek.filter(day=>day.id)

  const handleSubmit = async () => {
    const data: CreateAppointmentModel = {
      name,
      email,
      phoneNumber,
      subMedServiceId,
      doctorId,
      age,
      timeAtSchedule: dayjs(timeAtSchedule).add(6, 'hours').toJSON(),
    }

    const status = await CreateAppointment(data)
    if (status == 200) {
      SuccessAlert('Successfully created')
    } else {
      ErrorAlert('Произошла ошибка!')
    }
    console.log(data)
  }

  useEffect(() => {
    GetAllSubMedServices()
  }, [])

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box sx={{ width: '100%', display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
        <Box sx={{
          maxWidth: 600,
          boxShadow: '-11px 13px 41px 4px rgba(34, 60, 80, 0.2)',
          padding: 5,
          margin: 5,
          borderRadius: '15px',
        }}>
          <h2>Запишитесь онлайн</h2>
          <span>Мы подтвердим вашу запись в течение 2 часов.</span>

          <Grid sx={{ width: '100%', marginTop: 3 }} container spacing={2}>
            <Grid item xs={6}>
              <TextField
                fullWidth
                value={name}
                onChange={(event) => setName(event.target.value)}
                id="standard-basic"
                label="Name"
                variant="outlined"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                id="standard-basic"
                label="Email"
                variant="outlined"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                value={phoneNumber}
                onChange={(event) => setPhoneNumber(event.target.value)}
                id="standard-basic"
                label="Phone Number"
                variant="outlined"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                id="outlined-select-currency"
                label="Service"
                select
                variant="outlined"
                defaultValue={0}
                onChange={(event) => setSubMedServiceId(event.target.value as unknown as number)}
              >
                {allSubMedServices.map((s) => (
                  <MenuItem key={s.id} value={s.id}>
                    {s.name}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <DateTimePicker
                  sx={{ width: '100%' }}
                  value={timeAtSchedule}
                  format="DD.MM.YYYY HH:mm"
                  onChange={(newValue) => setTimeAtSchedule(newValue)}
                />
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                value={age}
                onChange={(event) => setAge(event.target.value)}
                id="standard-basic"
                label="Age"
                variant="outlined"
              />
            </Grid>
          </Grid>
          <Button sx={{ marginTop: 5 }} variant="contained" onClick={() => handleSubmit()}>Submit</Button>
        </Box>

        <div className="col-lg-5">
          <div className="appointment-item-two-right">
            <div className="appointment-item-content">
              <h2>{t('WorkHours')}</h2>
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
      </Box>
    </LocalizationProvider>
  )
}

export default AppointmentForm
