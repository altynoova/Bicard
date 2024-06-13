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
  styled,
} from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import { MedService, SubMedService } from '@/entities/Service'
import { useTranslations } from 'next-intl'
import { t } from 'i18next'
import { blue300 } from 'material-ui/styles/colors'
const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));
const Services = () => {
  const t = useTranslations('Services')

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
      SuccessAlert('Успешно')
      GetListOfMedServices()
      GetAllSubMedServices()
    } else {
      ErrorAlert('Произошла ошибка')
    }
  }

  const deleteSubService = async (id: number) => {
    const response = await RemoveSubMedService(id)

    if (response === 200) {
      SuccessAlert('Успешно')
      GetListOfMedServices()
      GetAllSubMedServices()
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
          <Link href="services/create">{t('Add Service')}</Link>
        </div>
        <div>
          <Link href="services/submedservice/create">{t('Add Subservice')}</Link>
        </div>
      </div>
      <DashboardCard title={t('Services')}>
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
                    №
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="subtitle2" fontWeight={600}>
                    {t('Name')}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="subtitle2" fontWeight={600}>
                    {t('Edit')}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="subtitle2" fontWeight={600}>
                    {t('Delete')}
                    </Typography>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
              {Array.isArray(medServices) && medServices.map((service) => (
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
          <Link href={`/admin/services/edit/${service.id}`}>
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
                Кошумча кызматтар жок
              </Typography>
            ) : (
              <Box sx={{ margin: 1 }}>
                <Typography variant="h6" gutterBottom component="div">
                Кошумча кызматтар
                </Typography>
                <Table size="small" aria-label="purchases">
                  <TableHead>
                    <TableRow>
                      <TableCell>№</TableCell>
                      <TableCell>{t('Name')}</TableCell>
                      <TableCell>{t('Price')}</TableCell>
                      <TableCell align="right">{t('Edit')}</TableCell>
                      <TableCell align="right">
                      {t('Delete')}
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {subMedServices.map((sms, index) => (
                      <StyledTableRow key={sms.id}>
                        <TableCell component="th" scope="service">
                          {index+1}
                        </TableCell>
                        <TableCell>{sms.name}</TableCell>
                        <TableCell>{sms.price}</TableCell>
                        <TableCell align="right">
                          <Link
                            href={`/admin/services/submedservice/edit/${sms.id}`}
                          >
                            <EditIcon color={'warning'} />{' '}
                          </Link>
                        </TableCell>
                        <TableCell align="right">
                          <Button onClick={() => deleteSubService(sms.id)}>
                            <DeleteOutlineIcon color={'error'} />
                          </Button>
                        </TableCell>
                      </StyledTableRow>
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
