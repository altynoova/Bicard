'use client'
import React, { useEffect } from 'react'
import Link from 'next/link'
import { ErrorAlert, SuccessAlert } from '@/libs/helpers/Alert'
import useMedServicesStore from '@/store/useMedServicesStore'
import DashboardCard from '@/components/Adminv2/Shared/DashboardCard'
import {
  Box,
  Button,
  Collapse,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import { MedService, SubMedService } from '@/entities/Service'

const Services = () => {
  const {
    medServices,
    allSubMedServices,
    GetListOfMedServices,
    GetAllSubMedServices,
    RemoveMedService,
    RemoveSubMedService,
  } = useMedServicesStore()

  const deleteService = async (id: number) => {
    const response = await RemoveMedService(id)

    if (response === 200) {
      SuccessAlert('Service удалена')
    } else {
      ErrorAlert('Произошла ошибка')
    }
  }

  const deleteSubService = async (id: number) => {
    const response = await RemoveSubMedService(id)

    if (response === 200) {
      SuccessAlert('Sub service удалена')
    } else {
      ErrorAlert('Произошла ошибка')
    }
  }

  useEffect(() => {
    GetListOfMedServices()
    GetAllSubMedServices()
  }, [])

  return (
    <div>
      <div className="d-flex justify-content-center mb-5 gap-5">
        <div>
          <Link href="services/create">Добавить service</Link>
        </div>
        <div>
          <Link href="services/submedservice/create">Добавить sub service</Link>
        </div>
      </div>
      <DashboardCard title="Services">
        <Box sx={{ overflow: 'auto' }}>
          <Box sx={{ width: '100%', display: 'table', tableLayout: 'fixed' }}>
            <Table
              sx={{
                whiteSpace: 'nowrap',
              }}
            >
              <TableHead>
                <TableRow>
                  <TableCell />
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
                      Edit
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="subtitle2" fontWeight={600}>
                      Delete
                    </Typography>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {medServices.map((service) => (
                  <Row
                    key={service.id}
                    service={service}
                    subMedServices={allSubMedServices.filter(
                      (s) => s.medServiceId == service.id
                    )}
                    deleteService={deleteService}
                    deleteSubService={deleteSubService}
                  />
                ))}
              </TableBody>
            </Table>
          </Box>
        </Box>
      </DashboardCard>
    </div>
  )
}

export default Services

function Row({
  service,
  subMedServices,
  deleteService,
  deleteSubService,
}: {
  service: MedService
  subMedServices: SubMedService[]
  deleteService: (id: number) => void
  deleteSubService: (id: number) => void
}) {
  const [open, setOpen] = React.useState(false)

  return (
    <>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton
            aria-label="expand service"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="service">
          {service.id}
        </TableCell>
        <TableCell align="left">{service.name}</TableCell>
        <TableCell>
          <Link href={`/adminv2/services/edit/${service.id}`}>
            <EditIcon color={'warning'} />{' '}
          </Link>
        </TableCell>
        <TableCell>
          <Button onClick={() => deleteService(service.id)}>
            <DeleteOutlineIcon color={'error'} />
          </Button>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            {subMedServices.filter((s) => s.medServiceId == service.id).length <
            1 ? (
              <Typography
                sx={{ marginY: 2 }}
                variant="h6"
                gutterBottom
                component="div"
              >
                No sub services
              </Typography>
            ) : (
              <Box sx={{ margin: 1 }}>
                <Typography variant="h6" gutterBottom component="div">
                  Sub med services
                </Typography>
                <Table size="small" aria-label="purchases">
                  <TableHead>
                    <TableRow>
                      <TableCell>Id</TableCell>
                      <TableCell>Name</TableCell>
                      <TableCell align="right">Edit this subservice</TableCell>
                      <TableCell align="right">
                        Delete this subservice
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {subMedServices.map((sms) => (
                      <TableRow key={sms.id}>
                        <TableCell component="th" scope="service">
                          {sms.id}
                        </TableCell>
                        <TableCell>{sms.name}</TableCell>
                        <TableCell align="right">
                          <Link
                            href={`/adminv2/services/submedservice/edit/${sms.id}`}
                          >
                            <EditIcon color={'warning'} />{' '}
                          </Link>
                        </TableCell>
                        <TableCell align="right">
                          <Button onClick={() => deleteSubService(sms.id)}>
                            <DeleteOutlineIcon color={'error'} />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Box>
            )}
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  )
}
