'use client'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
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
import DashboardCard from '@/components/Adminv2/Shared/DashboardCard'
import useCertificateStore from '@/store/useCertificateStore'
import { ErrorAlert, SuccessAlert } from '@/libs/helpers/Alert'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import EditIcon from '@mui/icons-material/Edit'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import router from 'next/router'
import { useTranslations } from 'next-intl'
import { url } from '@/config'


const Certificates = () => {
  const { GetAllCertificates, DeleteCertificate, Certificates } = useCertificateStore();
  const t = useTranslations('Services')

  const [openCertificates, setOpenCertificates] = useState<boolean[]>(Array(Certificates.length).fill(false)); // Array to track the collapse/expand state of each Certificate

  const filteredCertificates = Certificates.filter(
    (Vacancies) => Vacancies?.id);

  const handleDelete = async (id: number) => {
    const status = await DeleteCertificate(id);
    if (status == 200) {
      SuccessAlert('Успешно');
      router.push('/admin/certificates');
    } else {
      ErrorAlert('Произошла ошибка!');
    }
  };

  useEffect(() => {
    GetAllCertificates();
  }, []);

  const toggleOpen = (index: number) => {
    setOpenCertificates((prevOpenCertificates) => {
      const newOpenCertificates = [...prevOpenCertificates];
      newOpenCertificates[index] = !newOpenCertificates[index]; // Toggle the collapse/expand state of the clicked Certificate
      return newOpenCertificates;
    });
  };

  return (
    <div>
      <div className="d-flex justify-content-center mb-5">
        <Link href="certificates/create">{t('Create')}</Link>
      </div>
      <DashboardCard title={t('Vacancies')}>
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
                      {t('Description')}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="subtitle2" fontWeight={600}>
                      {t('IMG')}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="subtitle2" fontWeight={600}>
                      {t('Edit')}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Typography variant="subtitle2" fontWeight={600}>
                      {t('Delete')}
                    </Typography>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredCertificates.map((Certificate, index) => (
                  <TableRow key={Certificate.id}>
                    <TableCell>
                      <Typography
                        color="textSecondary"
                        variant="subtitle2"
                        fontWeight={400}
                      >
                        {index + 1}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="subtitle2" fontWeight={400}>
                        {Certificate.description == null ? <i>null</i> : Certificate.description}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="subtitle2" fontWeight={400}>
                        <img width={200} height={200} src={`${url}/TempFileStorage/${Certificate.photoPath}`} alt="Блог" />
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Link href={`/admin/certificates/edit/${Certificate.id}`}>
                        <EditIcon color={'warning'} />
                      </Link>
                    </TableCell>
                    <TableCell align="right">
                      <Button onClick={() => handleDelete(Certificate.id)}>
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
  );
};

export default Certificates;

