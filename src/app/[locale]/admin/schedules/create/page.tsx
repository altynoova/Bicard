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

const CreateSchedule = () => {
  const router = useRouter()

  const { daysOfWeek, CreateSchedule } = useScheduleStore()
  const { FetchDoctors, doctors } = useDoctorStore()

  const [name, setName] = useState<string>()
  const [startTime, setStartTime] = useState<Dayjs | null>(null)
  const [endTime, setEndTime] = useState<Dayjs | null>(null)
  const [employeeId, setEmployeeId] = useState<number | undefined>(undefined)

  const handleCreate = async () => {
    if (name == undefined || startTime == null || endTime == null || employeeId == undefined) return

    const response = await CreateSchedule({
      name,
      startTime: dayjs(startTime).format('HH:mm'),
      endTime: dayjs(endTime).format('HH:mm'),
      employeeId,
    })

    console.log({
      name,
      startTime: startTime.format('HH:mm'),
      endTime: endTime.format('HH:mm'),
      employeeId,
    })

    if (response === 200) {
      SuccessAlert('Schedule успешно создана')
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
              Select day of week
            </InputLabel>
            <Select
              labelId="service-simple-select-label"
              size="medium"
              value={name}
              onChange={(event) => setName(event.target.value)}
              sx={{ width: '100%' }}
            >
              <MenuItem disabled value={undefined}>
                None
              </MenuItem>
              {daysOfWeek.map((d) => (
                <MenuItem key={d.name} value={d.name}>
                  {d.name}
                </MenuItem>
              ))}
            </Select>
          </div>
          <div className="mb-3">
            <InputLabel id="service-simple-select-label">
              Select doctor
            </InputLabel>
            <Select
              labelId="service-simple-select-label"
              size="medium"
              value={employeeId}
              onChange={(event) => setEmployeeId(event.target.value as number)}
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
              Select schedule startTime
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
              Select schedule endTime
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
            Создать
          </button>
        </div>
      </div>
    </LocalizationProvider>
  )
}

export default CreateSchedule
