'use client'
import React, { useEffect, useState } from 'react'
import { ErrorAlert, SuccessAlert } from '@/libs/helpers/Alert'
import useRoleStore from '@/store/useRoleStore'
import Link from 'next/link'
import DashboardCard from '@/components/Adminv2/Shared/DashboardCard'
import {
  Box,
  Button, InputLabel, MenuItem, Select,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import EditIcon from '@mui/icons-material/Edit'
import useScheduleStore from '@/store/useSchedulesStore'
import useDoctorStore from '@/store/useDoctorStore'

const Schedules = () => {
  const { schedules, GetEmployeeScheduleById, RemoveSchedule, ResetSchedules } = useScheduleStore()
  const { doctors, FetchDoctors } = useDoctorStore()

  const [doctorId, setDoctorId] = useState<number | undefined>()
  console.log(schedules)
  const deleteSchedule = async (id: number) => {
    const response = await RemoveSchedule(id)
    if (response === 200) {
      SuccessAlert('schedule удалена')
    } else {
      ErrorAlert('Произошла ошибка')
    }
  }

  useEffect(() => {
    if (doctorId == undefined) {
      return
    }
    GetEmployeeScheduleById(doctorId)
  }, [doctorId])

  useEffect(() => {
    ResetSchedules()
    FetchDoctors()
  }, [])

  return (
    <div>
      <div className="d-flex justify-content-center mb-5">
        <Link href="schedules/create">Добавить schedule</Link>
      </div>
      <div className="mb-3">
        <InputLabel id="service-simple-select-label">
          Select doctor
        </InputLabel>
        <Select
          labelId="service-simple-select-label"
          size="small"
          value={doctorId}
          onChange={(event) => setDoctorId(event.target.value as number)}
          sx={{ width: '200px' }}
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
      </div>
      <DashboardCard title="Schedule">
        <Box sx={{ overflow: 'auto' }}>
          <Box sx={{ width: '100%', display: 'table', tableLayout: 'fixed' }}>
            <Table
              sx={{
                whiteSpace: 'nowrap',
              }}
            >
              <TableHead>
                <TableRow>
                <TableCell>
                    <Typography variant="subtitle2" fontWeight={600}>
                    №
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="subtitle2" fontWeight={600}>
                      day of week
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="subtitle2" fontWeight={600}>
                      start time
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="subtitle2" fontWeight={600}>
                      end time
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography variant="subtitle2" fontWeight={600}>
                      Update schedule
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography variant="subtitle2" fontWeight={600}>
                      Delete schedule
                    </Typography>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {schedules.map((s, index) => (
                  <TableRow key={s.name}>
                     <TableCell>
                      <Typography
                        color="textSecondary"
                        variant="subtitle2"
                        fontWeight={400}
                      >
                        {index+1}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography
                        color="textSecondary"
                        variant="subtitle2"
                        fontWeight={400}
                      >
                        {s.name}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography
                        color="textSecondary"
                        variant="subtitle2"
                        fontWeight={400}
                      >
                        {s.startTime}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography
                        color="textSecondary"
                        variant="subtitle2"
                        fontWeight={400}
                      >
                        {s.endTime}
                      </Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Link href={`schedules/edit/${s.id}`}>
                        <EditIcon color={'warning'} />
                      </Link>
                    </TableCell>
                    <TableCell align="center">
                      <Button onClick={() => deleteSchedule(s.id)}>
                        <DeleteOutlineIcon color={'error'} />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Box>
        </Box>
      </DashboardCard>
    </div>
  )
}

export default Schedules
