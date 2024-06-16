'use client'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import {
  Box,
  Button,
  Collapse,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material'
import DashboardCard from '@/components/Adminv2/Shared/DashboardCard'
import useTestimonialstore from '@/store/useTestimonialstore'
import { ErrorAlert, SuccessAlert } from '@/libs/helpers/Alert'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import EditIcon from '@mui/icons-material/Edit'
import router, { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { info } from 'console'
import { url } from '@/config'


const Testimonials = () => {
  const { FetchTestimonials, DeleteTestimonial, Testimonials } = useTestimonialstore();
  const t = useTranslations('Services')
  const router = useRouter()
  const [openTestimonials, setOpenTestimonials] = useState<boolean[]>(Array(Testimonials.length).fill(false)); 

  const filteredTestimonials = Testimonials.filter(
    (Testimonials) => Testimonials?.id);

  const handleDelete = async (id: number) => {
    const status = await DeleteTestimonial(id);
    if (status == 200) {
      SuccessAlert('Успешно');
      router.push('/admin/testimonials');
    } else {
      ErrorAlert('Произошла ошибка!');
    }
  };

  useEffect(() => {
    FetchTestimonials();
  }, []);

  const toggleOpen = (index: number) => {
    setOpenTestimonials((prevOpenTestimonials) => {
      const newOpenTestimonials = [...prevOpenTestimonials];
      newOpenTestimonials[index] = !newOpenTestimonials[index]; // Toggle the collapse/expand state of the clicked Info
      return newOpenTestimonials;
    });
  };

  return (
    <div>
      <div className="d-flex justify-content-center mb-5">
        <Link href="testimonials/create">{t('Create')}</Link>
      </div>
      <DashboardCard title={t('Testimonials')}>
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
                    {t('IMG')}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="subtitle2" fontWeight={600}>
                    {t('IMG')}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="subtitle2" fontWeight={600}>
                    {t('Intro')}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="subtitle2" fontWeight={600}>
                    {t('numberOfBeds')}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="subtitle2" fontWeight={600}>
                    {t('numberOfPatients')}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="subtitle2" fontWeight={600}>
                    {t('numberOfEmployees')}
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
                {filteredTestimonials.map((Info, index) => (
                  <React.Fragment key={Info.id}>
                    <TableRow>
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
                        <Typography variant="subtitle2" fontWeight={400}>
                        <img width={200} height={200} src={`${url}/TempFileStorage/${Info.pathToPhoto1}`} alt="Фото клиники" />
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="subtitle2" fontWeight={400}>
                        <img width={200} height={200} src={`${url}/TempFileStorage/${Info.pathToPhoto2}`} alt="Фото клиники" />
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="subtitle2"
                              fontWeight={400}
                              style={{ wordWrap: 'break-word', whiteSpace: 'pre-line' }}>
                          <div dangerouslySetInnerHTML={{ __html: Info.intro}}></div>
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="subtitle2" fontWeight={400}>
                          {Info.numberOfBeds}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="subtitle2" fontWeight={400}>
                        {Info.numberOfPatients}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="subtitle2" fontWeight={400}>
                        {Info.numberOfEmployees}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Link href={`/admin/testimonials/edit/${Info.id}`}>
                          <EditIcon color={'warning'} />
                        </Link>
                      </TableCell>
                      <TableCell align="right">
                        <Button onClick={() => handleDelete(Info.id)}>
                          <DeleteOutlineIcon color={'error'} />
                        </Button>
                      </TableCell>
                    </TableRow>
                  </React.Fragment>
                ))}
              </TableBody>
            </Table>
          </Box>
        </Box>
      </DashboardCard>
    </div>
  );
};

export default Testimonials;

