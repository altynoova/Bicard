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
import useFAQsStore from '@/store/useFAQStore'
import { ErrorAlert, SuccessAlert } from '@/libs/helpers/Alert'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import EditIcon from '@mui/icons-material/Edit'
import { useTranslations } from 'next-intl'

const FAQss = () => {
  const { fetchFAQs, DeleteFAQ, FAQList } = useFAQsStore();
  const t = useTranslations('Services')

  const [openFAQss, setOpenFAQss] = useState<boolean[]>([]);

  useEffect(() => {
    fetchFAQs();
  }, [fetchFAQs]);

  useEffect(() => {
    setOpenFAQss(Array(FAQList.length).fill(false));
  }, [FAQList]);

  const handleDelete = async (id: number) => {
    const status = await DeleteFAQ(id);
    if (status === 200) {
      SuccessAlert('Успешно');
      fetchFAQs();  
    } else {
      ErrorAlert('Произошла ошибка!');
    }
  };

  const toggleOpen = (index: number) => {
    setOpenFAQss((prevOpenFAQss) => {
      const newOpenFAQss = [...prevOpenFAQss];
      newOpenFAQss[index] = !newOpenFAQss[index];
      return newOpenFAQss;
    });
  };

  return (
    <div>
      <div className="d-flex justify-content-center mb-5">
        <Link href="faqs/create">{t('Create')}</Link>
      </div>
      <DashboardCard title={t('FAQ')}>
        <Box sx={{ overflow: 'auto' }}>
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
                    {t('Type')}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="subtitle2" fontWeight={600}>
                    {t('Question')}
                     </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="subtitle2" fontWeight={600}>
                    {t('Answer')}
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
                {FAQList.map((FAQCategory, index) => (
                  <React.Fragment key={FAQCategory.type}>
                    {FAQCategory.faqs.map((FAQ, FAQIndex) => (
                      <React.Fragment key={FAQ.id}>
                        <TableRow>
                          <TableCell>
                            <Typography variant="subtitle2" fontWeight={400}>
                              {index * FAQCategory.faqs.length + FAQIndex + 1}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Typography variant="subtitle2" fontWeight={400}>
                              {FAQ.type}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Typography
                              variant="subtitle2"
                              fontWeight={400}
                              style={{ wordWrap: 'break-word', whiteSpace: 'pre-line' }}
                            >
                              {FAQ.question == null ? <i>null</i> : FAQ.question}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Typography
                              variant="subtitle2"
                              fontWeight={400}
                              style={{ wordWrap: 'break-word', whiteSpace: 'pre-line' }}
                            >
                              {FAQ.answer == null ? <i>null</i> : FAQ.answer}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Link href={`/admin/faqs/edit/${FAQ.id}`}>
                              <EditIcon color={'warning'} />
                            </Link>
                          </TableCell>
                          <TableCell align="right">
                            <Button onClick={() => handleDelete(FAQ.id)}>
                              <DeleteOutlineIcon color={'error'} />
                            </Button>
                          </TableCell>
                        </TableRow>
                      </React.Fragment>
                    ))}
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

export default FAQss;
