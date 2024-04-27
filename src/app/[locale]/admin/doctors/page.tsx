'use client'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material'
import DashboardCard from '@/components/Adminv2/Shared/DashboardCard'
import useDoctorStore from '@/store/useDoctorStore'
import { ErrorAlert, SuccessAlert } from '@/libs/helpers/Alert'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import EditIcon from '@mui/icons-material/Edit'

const Doctors = () => {
  const { FetchDoctors, DeleteDoctor } = useDoctorStore()
  const { doctors } = useDoctorStore()

  const [search, setSearch] = useState<string>('')

  const filteredDoctors = doctors.filter(
    (doctor) => doctor?.name?.includes(search) || doctor.name == null,
  )

  const handleDelete = async (id: number) => {
    const status = await DeleteDoctor(id)
    if (status == 200) {
      SuccessAlert('Successfully deleted')
    } else {
      ErrorAlert('Произошла ошибка!')
    }
  }

  useEffect(() => {
    FetchDoctors()
  }, [])

  return (
    <div>
      <div className="d-flex justify-content-center mb-5">
        <Link href="doctors/create">Добавить доктора</Link>
      </div>
      <DashboardCard title="Doctors">
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
                      Speciality
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="subtitle2" fontWeight={600}>
                      Edit
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Typography variant="subtitle2" fontWeight={600}>
                      Delete
                    </Typography>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredDoctors.map((doctor) => (
                  <TableRow key={doctor.name}>
                    <TableCell>
                      <Typography
                        color="textSecondary"
                        variant="subtitle2"
                        fontWeight={400}
                      >
                        {doctor.id}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="subtitle2" fontWeight={600}>
                        {doctor.name == null ? <i>null</i> : doctor.name}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography
                        color="textSecondary"
                        variant="subtitle2"
                        fontWeight={400}
                      >
                        {doctor.email == null ? <i>null</i> : doctor.email}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Link href={`/admin/doctors/edit/${doctor.id}`}>
                        <EditIcon color={'warning'} />
                      </Link>
                    </TableCell>
                    <TableCell align="right">
                      <Button onClick={() => handleDelete(doctor.id)}>
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

export default Doctors
