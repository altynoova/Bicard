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
import useVacancyStore from '@/store/useVacancyStore'
import { ErrorAlert, SuccessAlert } from '@/libs/helpers/Alert'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import EditIcon from '@mui/icons-material/Edit'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import router from 'next/router'
import { useTranslations } from 'next-intl'


const Vacancys = () => {
  const { FetchVacancies, DeleteVacancy, Vacancies } = useVacancyStore();
  const t = useTranslations('Services')

  const [openVacancys, setOpenVacancys] = useState<boolean[]>(Array(Vacancys.length).fill(false)); // Array to track the collapse/expand state of each Vacancy

  const filteredVacancys = Vacancies.filter(
    (Vacancies) => Vacancies?.id);

  const handleDelete = async (id: number) => {
    const status = await DeleteVacancy(id);
    if (status == 200) {
      SuccessAlert('Успешно');
      router.push('/admin/vacancies');
    } else {
      ErrorAlert('Произошла ошибка!');
    }
  };

  useEffect(() => {
    FetchVacancies();
  }, []);

  const toggleOpen = (index: number) => {
    setOpenVacancys((prevOpenVacancys) => {
      const newOpenVacancys = [...prevOpenVacancys];
      newOpenVacancys[index] = !newOpenVacancys[index]; // Toggle the collapse/expand state of the clicked Vacancy
      return newOpenVacancys;
    });
  };

  return (
    <div>
      <div className="d-flex justify-content-center mb-5">
        <Link href="vacancies/create">{t('Create')}</Link>
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
                  <TableCell />
                  <TableCell>
                    <Typography variant="subtitle2" fontWeight={600}>
                    №
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="subtitle2" fontWeight={600}>
                    {t('Position')}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="subtitle2" fontWeight={600}>
                    {t('Date')}
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
                {filteredVacancys.map((Vacancy, index) => (
                  <React.Fragment key={Vacancy.id}>
                    <TableRow>
                      <TableCell>
                        <IconButton
                          aria-label="expand service"
                          size="small"
                          onClick={() => toggleOpen(index)}
                        >
                          {openVacancys[index] ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                        </IconButton>
                      </TableCell>
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
                          {Vacancy.position == null ? <i>null</i> : Vacancy.position}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="subtitle2" fontWeight={400}>
                          {new Date(Vacancy.timestamp).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' })}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Link href={`/admin/vacancies/edit/${Vacancy.id}`}>
                          <EditIcon color={'warning'} />
                        </Link>
                      </TableCell>
                      <TableCell align="right">
                        <Button onClick={() => handleDelete(Vacancy.id)}>
                          <DeleteOutlineIcon color={'error'} />
                        </Button>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell style={{ paddingBottom: 0, paddingTop: 0, display: "flex", justifyContent: "space-between" }} colSpan={6} >
                        <Collapse in={openVacancys[index]} timeout="auto" unmountOnExit>
                          <Table>
                            <TableHead>
                              <TableCell>
                                <Typography variant="subtitle2" fontWeight={400}>
                                  <b>{t('Requirements')}</b>  :  {Vacancy.requirements}
                                </Typography>
                              </TableCell>
                            </TableHead>
                            <TableHead>
                              <TableCell>
                                <Typography variant="subtitle2" fontWeight={400}>
                                <b>{t('Description')}</b>  :  {Vacancy.description}
                                </Typography>
                              </TableCell>
                            </TableHead>
                            <TableHead>
                              <TableCell>

                              </TableCell>
                            </TableHead>
                            <TableHead>
                              <TableCell>

                              </TableCell>
                            </TableHead>
                          </Table>
                        </Collapse>
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

export default Vacancys;

