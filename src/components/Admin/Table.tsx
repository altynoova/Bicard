'use client'
import React from 'react'
import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import DoneIcon from '@mui/icons-material/Done'
import { AppointmentConfirmationModel, AppointmentRequest } from '@/entities/Appoinment'

interface IAppointmentsTable {
  data: AppointmentRequest[];
  handleAccept: (data: AppointmentConfirmationModel) => void;
  handleDelete: (id: number) => void;
}

const AppointmentsTable = ({ data, handleAccept, handleDelete }: IAppointmentsTable) => {

  return <div style={{ height: 400, width: '100%', margin: '20px' }}>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Id</TableCell>
            <TableCell align="left">Name</TableCell>
            <TableCell align="left">Email</TableCell>
            <TableCell align="left">Phone Number</TableCell>
            <TableCell align="left">Service Type</TableCell>
            <TableCell align="left">Doctor Name</TableCell>
            <TableCell align="left">Age</TableCell>
            <TableCell align="left">Date</TableCell>
            <TableCell align="left">Confirmed</TableCell>
            <TableCell align="left">Schedule time</TableCell>
            <TableCell align="left">Confirmed by User Id</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((appointment) => (
            <TableRow
              key={appointment.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {appointment.id}
              </TableCell>
              <TableCell align="left">{appointment.name}</TableCell>
              <TableCell align="left">{appointment.age}</TableCell>
              <TableCell align="left">{appointment.email}</TableCell>
              <TableCell align="left">{appointment.phoneNumber}</TableCell>
              <TableCell align="left">{appointment.serviceType}</TableCell>
              <TableCell align="left">{appointment.doctorName}</TableCell>
              <TableCell align="left">{appointment.timeStamp}</TableCell>
              <TableCell align="left">{appointment.isConfirmed ? <DoneIcon /> : <CloseIcon />}</TableCell>
              <TableCell align="left">{appointment.timeAtSchedule}</TableCell>
              <TableCell align="left">{appointment.confirmedByUserId}</TableCell>
              <TableCell align="left">
                <Button
                  variant="outlined"
                  color="success"
                  onClick={() => handleAccept({
                    id: appointment.id,
                    timeAtSchedule: appointment.timeAtSchedule || '23-23',
                    confirmedByUserId: appointment.confirmedByUserId || 5,
                  })}
                >
                  Accept
                </Button>
              </TableCell>
              <TableCell align="left">
                <Button
                  variant="outlined"
                  color="error"
                  onClick={() => handleDelete(appointment.id)}
                >
                  Decline
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  </div>
}

export default AppointmentsTable
