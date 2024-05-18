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
import useArticletore from '@/store/useArticleStore'
import { ErrorAlert, SuccessAlert } from '@/libs/helpers/Alert'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import EditIcon from '@mui/icons-material/Edit'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import Image from 'next/image'


const Article = () => {
  const { FetchArticles,  Articles, DeleteArticle} = useArticletore();
  const [search, setSearch] = useState<string>('');
  const [openArticle, setOpenArticle] = useState<boolean[]>(Array(Article.length).fill(false)); 

  const filteredArticle = Articles.filter(
    (Article) => Article?.title?.includes(search) || Article.title == null
  );

  const handleDelete = async (id: number) => {
    const status = await DeleteArticle(id);
    if (status == 200) {
      SuccessAlert('Successfully deleted');
    } else {
      ErrorAlert('Произошла ошибка!');
    }
  };

  useEffect(() => {
    FetchArticles();
  }, []);

  const toggleOpen = (index: number) => {
    setOpenArticle((prevOpenArticle) => {
      const newOpenArticle = [...prevOpenArticle];
      newOpenArticle[index] = !newOpenArticle[index]; // Toggle the collapse/expand state of the clicked Article
      return newOpenArticle;
    });
  };

  return (
    <div>
      <div className="d-flex justify-content-center mb-5">
        <Link href="articles/create">Добавить статью</Link>
      </div>
      <DashboardCard title="Article">
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
                      Title
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="subtitle2" fontWeight={600}>
                      Author
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="subtitle2" fontWeight={600}>
                      Date
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
                {filteredArticle.map((Article, index) => (
                  <React.Fragment key={Article.title}>
                    <TableRow>
                      <TableCell>
                        <IconButton
                          aria-label="expand service"
                          size="small"
                          onClick={() => toggleOpen(index)} // Toggle the collapse/expand state of the clicked Article
                        >
                          {openArticle[index] ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                        </IconButton>
                      </TableCell>
                      <TableCell>
                        <Typography
                          color="textSecondary"
                          variant="subtitle2"
                          fontWeight={400}
                        >
                          {Article.id}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="subtitle2" fontWeight={600}>
                          {Article.title == null ? <i>null</i> : Article.title}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="subtitle2" fontWeight={600}>
                          {Article.authorName == null ? <i>null</i> : Article.authorName}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="subtitle2" fontWeight={600}>
                        {new Date(Article.timestamp).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' })}
                        </Typography> 
                      </TableCell>
                      <TableCell>
                        <Link href={`/admin/articles/edit/${Article.id}`}>
                          <EditIcon color={'warning'} />
                        </Link>
                      </TableCell>
                      <TableCell align="right">
                        <Button onClick={() => handleDelete(Article.id)}>
                          <DeleteOutlineIcon color={'error'} />
                        </Button>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell style={{ paddingBottom: 0, paddingTop: 0, display:"flex", justifyContent:"space-between" }} colSpan={6} >
                        <Collapse in={openArticle[index]} timeout="auto" unmountOnExit>
                        <embed src={`https://localhost:7120/TempFileStorage/${Article.filePath}#toolbar=0`} className="w-100" height={400} />
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

export default Article;

