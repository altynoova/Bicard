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
  Tabs,
  Tab,
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
    confirmedappointments,
    GetAllAppointments,
    GetAllConfirmedAppointments,
    ConfirmAppointment,
    CancelAppointment,
  } = useAppointmentsStore()
  const { FetchDoctors, doctors } = useDoctorStore()
  const { GetAllSubMedServices, allSubMedServices } = useMedServicesStore()

  const [filter, setFilter] = useState<string>('')
  const [selectedDoctorIds, setSelectedDoctorIds] = useState<{ [key: number]: number }>({})
  const [selectedTimeAtSchedules, setSelectedTimeAtSchedules] = useState<{ [key: number]: Dayjs | null }>({})
  const [tabIndex, setTabIndex] = useState(0)

  const filteredAppointments = appointments.filter((a) =>
    a.name.includes(filter),
  )

  const handleConfirm = async (id: number, data: CreateAppointmentModel) => {
    const status = await ConfirmAppointment(id, data)
    if (status == 200) {
      SuccessAlert('Successfully updated')
      GetAllAppointments();
      GetAllConfirmedAppointments();
    } else {
      ErrorAlert('Произошла ошибка!')
    }
  }

  const handleCancel = async (id: number) => {
    const status = await CancelAppointment(id)
    if (status == 200) {
      SuccessAlert('Successfully deleted')
      GetAllAppointments();
      GetAllConfirmedAppointments();

    } else {
      ErrorAlert('Произошла ошибка!')
    }
  }

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabIndex(newValue)
  }

  useEffect(() => {
    GetAllAppointments()
    GetAllConfirmedAppointments()
    GetAllSubMedServices()
    FetchDoctors()
  }, [])

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
        <Tabs value={tabIndex} onChange={handleTabChange}>
          <Tab label="Manage Appointments" />
          <Tab label="View Appointments" />
        </Tabs>
        <TabPanel value={tabIndex} index={0}>
          {filteredAppointments.length < 1 ? (
            <div>No results</div>
          ) : (
            <DashboardCard title="Appointments">
              <Box sx={{ overflow: 'auto' ,  overflowY: 'auto'}}>
                <Box sx={{ width: '100%', display: 'table', tableLayout: 'fixed' }}>
                  <Table sx={{ whiteSpace: 'nowrap' }}>
                    <TableHead>
                      <TableRow>
                        <TableCell>
                          <Typography variant="subtitle2" fontWeight={600}>
                            №
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
                            Doctor
                          </Typography>
                        </TableCell>
                        <TableCell align="left">
                          <Typography variant="subtitle2" fontWeight={600}>
                            Date and time 
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
                      {filteredAppointments.map((f, index) => {
                        const selectedDoctorId = selectedDoctorIds[f.id] ?? f.doctorId;
                        const selectedTimeAtSchedule = selectedTimeAtSchedules[f.id] ?? dayjs(f.date);
                        return (
                          <TableRow key={f.id}>
                            <TableCell>
                              <Typography color="textSecondary" variant="subtitle2" fontWeight={400}>
                                {index + 1}
                              </Typography>
                            </TableCell>
                            <TableCell>
                              <Typography variant="subtitle2" fontWeight={600}>
                                {f.name == null ? <i>null</i> : f.name}
                              </Typography>
                            </TableCell>
                            <TableCell>
                              <Typography color="textSecondary" variant="subtitle2" fontWeight={400}>
                                {f.email == null ? <i>null</i> : f.email}
                              </Typography>
                            </TableCell>
                            <TableCell>
                              <Typography variant="subtitle2" fontWeight={600}>
                                {f.phoneNumber == null ? <i>null</i> : f.phoneNumber}
                              </Typography>
                            </TableCell>
                            <TableCell>
                              <InputLabel id="doctor-select-label">Select doctor</InputLabel>
                              <Select
                                labelId="doctor-select-label"
                                value={selectedDoctorId}
                                onChange={(event) => {
                                  setSelectedDoctorIds(prev => ({ ...prev, [f.id]: event.target.value as number }))
                                }}
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
                              <InputLabel id="schedule-select-label">Select schedule</InputLabel>
                              <DateTimePicker
                                sx={{ width: '200px' }}
                                value={selectedTimeAtSchedule}
                                format="DD.MM.YYYY HH:mm"
                                onChange={(newValue) => {
                                  setSelectedTimeAtSchedules(prev => ({ ...prev, [f.id]: newValue }))
                                }}
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
                                    doctorId: selectedDoctorId,
                                    date: selectedTimeAtSchedule?.add(6, 'hours').toJSON() || f.date,
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
                        )
                      })}
                    </TableBody>
                  </Table>
                </Box>
              </Box>
            </DashboardCard>
          )}
        </TabPanel>
        <TabPanel value={tabIndex} index={1}>
          {confirmedappointments.length < 1 ? (
            <div>No results</div>
          ) : (
            <DashboardCard title="Appointments">
              <Box sx={{ overflow: 'auto',  overflowY: 'auto'  }}>
                <Box sx={{ width: '100%', display: 'table', tableLayout: 'fixed' }}>
                  <Table sx={{ whiteSpace: 'nowrap' }}>
                    <TableHead>
                      <TableRow>
                        <TableCell>
                          <Typography variant="subtitle2" fontWeight={600}>
                            №
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="subtitle2" fontWeight={600}>
                            Name
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="subtitle2" fontWeight={600}>
                            Doctor
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="subtitle2" fontWeight={600}>
                            Date and time
                          </Typography>
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {confirmedappointments.map((f, index) => (
                        <TableRow key={f.id}>
                          <TableCell>
                            <Typography color="textSecondary" variant="subtitle2" fontWeight={400}>
                              {index + 1}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Typography variant="subtitle2" fontWeight={600}>
                              {f.name == null ? <i>null</i> : f.name}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Typography variant="subtitle2" fontWeight={600}>
                              {doctors.find(d => d.id === f.doctorId)?.name || 'N/A'}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Typography variant="subtitle2" fontWeight={600}>
                              {dayjs(f.date).format('DD.MM.YYYY HH:mm')}
                            </Typography>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </Box>
              </Box>
            </DashboardCard>
          )}
        </TabPanel>
      </div>
    </LocalizationProvider>
  )
}

const TabPanel = (props: { children?: React.ReactNode; value: number; index: number }) => {
  const { children, value, index, ...other } = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  )
}

export default Appointments
