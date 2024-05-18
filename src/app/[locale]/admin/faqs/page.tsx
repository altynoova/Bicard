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
import useFAQsStore from '@/store/useFAQStore'
import { ErrorAlert, SuccessAlert } from '@/libs/helpers/Alert'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import EditIcon from '@mui/icons-material/Edit'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import router from 'next/router'

const FAQss = () => {
  const { fetchFAQs, DeleteFAQ, FAQList } = useFAQsStore();
  const [search, setSearch] = useState<string>('');
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
      SuccessAlert('Successfully deleted');
      fetchFAQs();  // Refresh the FAQs after deletion
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
        <Link href="/vacancies/create">Добавить FAQ</Link>
      </div>
      <DashboardCard title="FAQs">
        <Box sx={{ overflow: 'auto' }}>
          <Box sx={{ width: '100%', display: 'table', tableLayout: 'fixed' }}>
            <Table sx={{ whiteSpace: 'nowrap' }}>
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
                      Question
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="subtitle2" fontWeight={600}>
                      Answer
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
                {FAQList.map((FAQCategory, index) => (
                  <React.Fragment key={FAQCategory.type}>
                    {FAQCategory.faqs.map((FAQ) => (
                      <React.Fragment key={FAQ.id}>
                        <TableRow>
                          <TableCell>
                            <IconButton
                              aria-label="expand FAQ"
                              size="small"
                              onClick={() => toggleOpen(index)}
                            >
                              {openFAQss[index] ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                            </IconButton>
                          </TableCell>
                          <TableCell>
                            <Typography
                              color="textSecondary"
                              variant="subtitle2"
                              fontWeight={400}
                            >
                              {FAQ.id}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Typography variant="subtitle2" fontWeight={600}>
                              {FAQ.question}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Typography variant="subtitle2" fontWeight={600}>
                              {FAQ.answer}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Link href={`/admin/vacancies/edit/${FAQ.id}`}>
                              <EditIcon color={'warning'} />
                            </Link>
                          </TableCell>
                          <TableCell align="right">
                            <Button onClick={() => handleDelete(FAQ.id)}>
                              <DeleteOutlineIcon color={'error'} />
                            </Button>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                            <Collapse in={openFAQss[index]} timeout="auto" unmountOnExit>
                              <Box sx={{ padding: 2 }}>
                                <Typography variant="subtitle2" fontWeight={600}>
                                  {FAQ.type}
                                </Typography>
                              </Box>
                            </Collapse>
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
