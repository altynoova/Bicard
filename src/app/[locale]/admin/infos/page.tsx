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
import useInfoStore from '@/store/useInfoStore'
import { ErrorAlert, SuccessAlert } from '@/libs/helpers/Alert'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import EditIcon from '@mui/icons-material/Edit'
import router, { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { info } from 'console'


const Infos = () => {
  const { FetchInfos, DeleteInfo, Infos } = useInfoStore();
  const t = useTranslations('Services')
  const router = useRouter()
  const [openInfos, setOpenInfos] = useState<boolean[]>(Array(Infos.length).fill(false)); // Array to track the collapse/expand state of each Info

  const filteredInfos = Infos.filter(
    (Infos) => Infos?.id);

  const handleDelete = async (id: number) => {
    const status = await DeleteInfo(id);
    if (status == 200) {
      SuccessAlert('Успешно');
      router.push('/admin/infos');
    } else {
      ErrorAlert('Произошла ошибка!');
    }
  };

  useEffect(() => {
    FetchInfos();
  }, []);

  const toggleOpen = (index: number) => {
    setOpenInfos((prevOpenInfos) => {
      const newOpenInfos = [...prevOpenInfos];
      newOpenInfos[index] = !newOpenInfos[index]; // Toggle the collapse/expand state of the clicked Info
      return newOpenInfos;
    });
  };

  return (
    <div>
      <div className="d-flex justify-content-center mb-5">
        <Link href="infos/create">{t('Create')}</Link>
      </div>
      <DashboardCard title={t('Infos')}>
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
                    {t('Title')}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="subtitle2" fontWeight={600}>
                    {t('Content')}
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
                {filteredInfos.map((Info, index) => (
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
                          {Info.title == null ? <i>null</i> : Info.title}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="subtitle2"
                              fontWeight={400}
                              style={{ wordWrap: 'break-word', whiteSpace: 'pre-line' }}>
                          <div dangerouslySetInnerHTML={{ __html: Info.content}}></div>
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="subtitle2" fontWeight={400}>
                          {new Date(Info.timestamp).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' })}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Link href={`/admin/infos/edit/${Info.id}`}>
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

export default Infos;

