'use client'
import React, { useEffect, useState } from 'react'
import { ErrorAlert, SuccessAlert } from '@/libs/helpers/Alert'
import { useRouter } from 'next/navigation'
import useScheduleStore from '@/store/useSchedulesStore'
import useDoctorStore from '@/store/useDoctorStore'
import { InputLabel, MenuItem, Select, TextField } from '@mui/material'
import { LocalizationProvider, TimePicker } from '@mui/x-date-pickers'
import dayjs, { Dayjs } from 'dayjs'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { useTranslations } from 'next-intl'

const CreateSchedule = () => {
  const router = useRouter()
  const t = useTranslations('Services')


  const { daysOfWeek, CreateSchedule } = useScheduleStore()
  const { FetchDoctors, doctors } = useDoctorStore()

  const [dayOfWeek, setDayOfWeek] = useState<number | undefined>(undefined)
  const [id, setId] = useState<number>(0)
  const [startTime, setStartTime] = useState<Dayjs | null>(null)
  const [endTime, setEndTime] = useState<Dayjs | null>(null)
  const [doctorId, setDoctorId] = useState<number | undefined>(undefined)

  const handleCreate = async () => {
    if (dayOfWeek == undefined || startTime == null || endTime == null || doctorId == undefined) return

    const response = await CreateSchedule({
      id,
      dayOfWeek,
      startTime: dayjs(startTime).format('HH:mm'),
      endTime: dayjs(endTime).format('HH:mm'),
      doctorId,
    })

    console.log({
      dayOfWeek,
      startTime: startTime.format('HH:mm'),
      endTime: endTime.format('HH:mm'),
      doctorId,
    })

    if (response === 200) {
      SuccessAlert('Успешно')
      router.push('/admin/schedules')
    } else {
      ErrorAlert('Произошла ошибка')
    }
  }

  useEffect(() => {
    FetchDoctors()
  }, [])

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className="d-flex justify-content-center align-items-center mt-5">
        <div style={{ maxWidth: '700px', minWidth: '400px', minHeight: '300px' }}>
          <div className="mb-3">
            <InputLabel id="service-simple-select-label">
              {t('Day of week')}
            </InputLabel>
            <Select
              labelId="service-simple-select-label"
              size="medium"
              value={dayOfWeek}
              onChange={(event) => setDayOfWeek(event.target.value as number)}
              sx={{ width: '100%' }}
            >
              <MenuItem disabled value={undefined}>
                None
              </MenuItem>
              {daysOfWeek.map((d) => (
                <MenuItem key={d.name} value={d.id}>
                  {t(d.name)}
                </MenuItem>
              ))}
            </Select>
          </div>
          <div className="mb-3">
            <InputLabel id="service-simple-select-label">
              {t('DoctorsName')}
            </InputLabel>
            <Select
              labelId="service-simple-select-label"
              size="medium"
              value={doctorId}
              onChange={(event) => setDoctorId(event.target.value as number)}
              sx={{ width: '100%' }}
            >
              <MenuItem disabled value={undefined}>
                None
              </MenuItem>
              {doctors.map((d) => (
                <MenuItem key={d.id} value={d.id}>
                  {d.name}
                </MenuItem>
              ))}
            </Select>
          </div>
          <div className="mb-3">
            <InputLabel id="doctor-simple-select-label">
              {t('Start time')}
            </InputLabel>
            <TimePicker
              sx={{ width: '100%' }}
              value={startTime}
              format="HH:mm"
              onChange={(newValue) => setStartTime(newValue)}
            />
          </div>
          <div className="mb-3">
            <InputLabel id="doctor-simple-select-label">
              {t('End time')}
            </InputLabel>
            <TimePicker
              sx={{ width: '100%' }}
              value={endTime}
              format="HH:mm"
              onChange={(newValue) => setEndTime(newValue)}
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            onClick={handleCreate}
          >
            {t('Save')}
          </button>
        </div>
      </div>
    </LocalizationProvider>
  )
}

export default CreateSchedule
