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
import useBlogStore from '@/store/useBlogStore'
import { ErrorAlert, SuccessAlert } from '@/libs/helpers/Alert'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import EditIcon from '@mui/icons-material/Edit'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import Image from 'next/image'
import { useTranslations } from 'next-intl'


const Blogs = () => {
  const { FetchBlogs, DeleteBlog, Blogs, pagenumber, pagesize } = useBlogStore();
  const t = useTranslations('Blogs')

  const [search, setSearch] = useState<string>('');
  const [openBlogs, setOpenBlogs] = useState<boolean[]>(Array(Blogs.length).fill(false)); // Array to track the collapse/expand state of each blog

  const filteredBlogs = Blogs.filter(
    (Blog) => Blog?.title?.includes(search) || Blog.title == null
  );

  const handleDelete = async (id: number) => {
    const status = await DeleteBlog(id);
    if (status == 200) {
      SuccessAlert('Успешно');
      FetchBlogs(pagesize, pagenumber)
    } else {
      ErrorAlert('Произошла ошибка!');
    }
  };

  useEffect(() => {
    FetchBlogs(pagesize, pagenumber);
  }, []);

  const toggleOpen = (index: number) => {
    setOpenBlogs((prevOpenBlogs) => {
      const newOpenBlogs = [...prevOpenBlogs];
      newOpenBlogs[index] = !newOpenBlogs[index]; // Toggle the collapse/expand state of the clicked blog
      return newOpenBlogs;
    });
  };

  return (
    <div>
      <div className="d-flex justify-content-center mb-5">
        <Link href="blogs/create">{t('Create')}</Link>
      </div>
      <DashboardCard title={t('Blogs')}>
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
                    {t('Title')}
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
                {filteredBlogs.map((Blog, index) => (
                  <React.Fragment key={Blog.title}>
                    <TableRow>
                      <TableCell>
                        <IconButton
                          aria-label="expand service"
                          size="small"
                          onClick={() => toggleOpen(index)} // Toggle the collapse/expand state of the clicked blog
                        >
                          {openBlogs[index] ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
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
                        <Typography variant="subtitle2" fontWeight={600}>
                          {Blog.title == null ? <i>null</i> : Blog.title}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Link href={`/admin/blogs/edit/${Blog.id}`}>
                          <EditIcon color={'warning'} />
                        </Link>
                      </TableCell>
                      <TableCell align="right">
                        <Button onClick={() => handleDelete(Blog.id)}>
                          <DeleteOutlineIcon color={'error'} />
                        </Button>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell style={{ paddingBottom: 0, paddingTop: 0, display:"flex", justifyContent:"space-between" }} colSpan={6} >
                        <Collapse in={openBlogs[index]} timeout="auto" unmountOnExit>
                          <div style={{display:"flex", justifyContent:"center"}}>
                          <Image width={150} height={150} src={`data:image/png;base64, ${Blog.photoPath}`} alt="Блог" />
                          <Typography
                            variant="subtitle2"
                            fontWeight={600}
                            style={{ wordWrap: 'break-word', whiteSpace: 'pre-line'}}
                          >
                            {Blog.text}
                          </Typography>
                          </div>
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

export default Blogs;

