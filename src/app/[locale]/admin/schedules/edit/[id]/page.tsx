'use client'
import React, { useEffect, useState } from 'react'
import useDoctorStore from '@/store/useDoctorStore'
import { DoctorRequestModel } from '@/entities/Doctor'
import { ErrorAlert, SuccessAlert } from '@/libs/helpers/Alert'
import { useRouter } from 'next/navigation'
import useScheduleStore from '@/store/useSchedulesStore'
import dayjs, { Dayjs } from 'dayjs'
import { Schedule, ScheduleModel } from '@/entities/Schedule'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { InputLabel, MenuItem, Select, TextField } from '@mui/material'
import { LocalizationProvider, TimePicker } from '@mui/x-date-pickers'

const Edit = ({ params }: { params: { id: number } }) => {
  const router = useRouter()

  const { schedules, daysOfWeek, GetEmployeeScheduleById, UpdateSchedule } = useScheduleStore()
  const schedule = schedules.find(s => s.id == params.id)

  const [name, setName] = useState<string>(schedule?.name || '')
  const [startTime, setStartTime] = useState<Dayjs | null>(dayjs(`2022-04-17T${schedule?.startTime}`))
  const [endTime, setEndTime] = useState<Dayjs | null>(dayjs(`2022-04-17T1${schedule?.endTime}`))

  const handleSubmit = async () => {
    if (name == undefined || startTime == null || endTime == null || schedule == null) return

    const data: ScheduleModel = {
      name,
      startTime: dayjs(startTime).format('HH:mm'),
      endTime: dayjs(endTime).format('HH:mm'),
      employeeId: schedule?.employeeId,
    }

    console.log(data)

    const status = await UpdateSchedule(data, schedule?.id)

    if (status == 200) {
      SuccessAlert('Данные успешно обновлены.')
      router.push('/admin/schedules')
    } else {
      ErrorAlert('Произошла ошибка!')
    }
  }

  if (schedules.length < 0) {
    router.push('/admin/schedules')
  }

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
            onClick={handleSubmit}
          >
            Создать
          </button>
        </div>
      </div>
    </LocalizationProvider>
  )
}

export default Edit
