'use client'
import React, { useEffect, useState } from 'react'
import {
  Box,
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material'
import DashboardCard from '@/components/Adminv2/Shared/DashboardCard'
import { ErrorAlert, SuccessAlert } from '@/libs/helpers/Alert'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import SearchIcon from '@mui/icons-material/Search'
import useAppointmentsStore from '@/store/useAppointmentsStore'
import useMedServicesStore from '@/store/useMedServicesStore'
import DoneIcon from '@mui/icons-material/Done'
import { CreateAppointmentModel } from '@/entities/Appoinment'
import useDoctorStore from '@/store/useDoctorStore'
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker'
import dayjs, { Dayjs } from 'dayjs'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

const Appointments = () => {
  const {
    appointments,
    GetAllAppointments,
    ConfirmAppointment,
    CancelAppointment,
  } = useAppointmentsStore()
  const { FetchDoctors, doctors } = useDoctorStore()
  const { GetAllSubMedServices, allSubMedServices } = useMedServicesStore()

  const [subMedServiceId, setSubMedServiceId] = useState(0)
  const [doctorId, setDoctorId] = useState(0)
  const [timeAtSchedule, setTimeAtSchedule] = useState<Dayjs | null>(dayjs('2022-04-17T15:30'))
  const [filter, setFilter] = useState<string>('')

  const filteredAppointments = appointments.filter((a) =>
    a.name.includes(filter),
  )

  const handleConfirm = async (id: number, data: CreateAppointmentModel) => {
    const status = await ConfirmAppointment(id, data)
    if (status == 200) {
      SuccessAlert('Successfully deleted')
    } else {
      ErrorAlert('Произошла ошибка!')
    }
  }

  const handleCancel = async (id: number) => {
    const status = await CancelAppointment(id)
    if (status == 200) {
      SuccessAlert('Successfully deleted')
    } else {
      ErrorAlert('Произошла ошибка!')
    }
  }

  useEffect(() => {
    GetAllAppointments()
    GetAllSubMedServices()
    FetchDoctors()
  }, [])

  useEffect(() => {
    console.log(dayjs(timeAtSchedule).add(6, 'hours').toJSON())
  }, [timeAtSchedule])

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div>
        <FormControl sx={{ m: 1, width: '30ch' }} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-appointment">Filter</InputLabel>
          <OutlinedInput
            id="outlined-adornment-appointment"
            type="text"
            value={filter}
            onChange={(event) => setFilter(event.target.value)}
            endAdornment={
              <InputAdornment position="end">
                <IconButton aria-label="toggle visibility" edge="end">
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            }
            label="appointment"
          />
        </FormControl>
        {filteredAppointments.length < 1 ? (
          <div>No results</div>
        ) : (
          <DashboardCard title="Appointments">
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
                          Id
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="subtitle2" fontWeight={600}>
                          Name
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="subtitle2" fontWeight={600}>
                          Email
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="subtitle2" fontWeight={600}>
                          Phone Number
                        </Typography>
                      </TableCell>
                      <TableCell align="left">
                        <Typography variant="subtitle2" fontWeight={600}>
                          Med service
                        </Typography>
                      </TableCell>
                      <TableCell align="left">
                        <Typography variant="subtitle2" fontWeight={600}>
                          Doctor
                        </Typography>
                      </TableCell>
                      <TableCell align="left">
                        <Typography variant="subtitle2" fontWeight={600}>
                          Time
                        </Typography>
                      </TableCell>
                      <TableCell align="right">
                        <Typography variant="subtitle2" fontWeight={600}>
                          Confirm
                        </Typography>
                      </TableCell>
                      <TableCell align="right">
                        <Typography variant="subtitle2" fontWeight={600}>
                          Cancel
                        </Typography>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {filteredAppointments.map((f) => (
                      <TableRow key={f.id}>
                        <TableCell>
                          <Typography
                            color="textSecondary"
                            variant="subtitle2"
                            fontWeight={400}
                          >
                            {f.id}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="subtitle2" fontWeight={600}>
                            {f.name == null ? <i>null</i> : f.name}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography
                            color="textSecondary"
                            variant="subtitle2"
                            fontWeight={400}
                          >
                            {f.email == null ? <i>null</i> : f.email}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="subtitle2" fontWeight={600}>
                            {f.phoneNumber == null ? <i>null</i> : f.phoneNumber}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <InputLabel id="service-simple-select-label">
                            Select service
                          </InputLabel>
                          <Select
                            labelId="service-simple-select-label"
                            label={'Select service'}
                            size="medium"
                            value={subMedServiceId}
                            onChange={(event) => setSubMedServiceId(event.target.value as number)}
                            sx={{ width: '150px' }}
                          >
                            {allSubMedServices.map((s) => (
                              <MenuItem key={s.id} value={s.id}>
                                {s.name}
                              </MenuItem>
                            ))}
                          </Select>
                        </TableCell>
                        <TableCell>
                          <InputLabel id="doctor-simple-select-label">
                            Select doctor
                          </InputLabel>
                          <Select
                            labelId="doctor-simple-select-label"
                            label={'Select doctor'}
                            size="medium"
                            value={doctorId}
                            onChange={(event) => setDoctorId(event.target.value as number)}
                            sx={{ width: '150px' }}
                          >
                            {doctors.map((d) => (
                              <MenuItem key={d.id} value={d.id}>
                                {d.name}
                              </MenuItem>
                            ))}
                          </Select>
                        </TableCell>
                        <TableCell>
                          <InputLabel id="doctor-simple-select-label">
                            Select schedule
                          </InputLabel>
                          <DateTimePicker
                            sx={{ width: '200px'}}
                            value={timeAtSchedule}
                            format="DD.MM.YYYY HH:mm"
                            onChange={(newValue) => setTimeAtSchedule(newValue)}
                          />
                        </TableCell>
                        <TableCell align="right">
                          <Button
                            onClick={() =>
                              handleConfirm(f.id, {
                                name: f.name,
                                age: f.age,
                                email: f.email,
                                phoneNumber: f.phoneNumber,
                                subMedServiceId,
                                doctorId,
                                timeAtSchedule: dayjs(timeAtSchedule).add(6, 'hours').toJSON(),
                              })
                            }
                          >
                            <DoneIcon color={'success'} />
                          </Button>
                        </TableCell>
                        <TableCell align="right">
                          <Button onClick={() => handleCancel(f.id)}>
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
        )}
      </div>
    </LocalizationProvider>
  )
}

export default Appointments
