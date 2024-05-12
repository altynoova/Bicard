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
import useBlogStore from '@/store/useBlogStore'
import { ErrorAlert, SuccessAlert } from '@/libs/helpers/Alert'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import EditIcon from '@mui/icons-material/Edit'

const Blogs = () => {
  const { FetchBlogs, DeleteBlog, Blogs, pagenumber, pagesize } = useBlogStore()
  const [search, setSearch] = useState<string>('')

  const filteredBlogs = Blogs.filter(
    (Blog) => Blog?.title?.includes(search) || Blog.title == null,
  )
console.log("blogs", filteredBlogs)
  const handleDelete = async (id: number) => {
    const status = await DeleteBlog(id)
    if (status == 200) {
      SuccessAlert('Successfully deleted')
    } else {
      ErrorAlert('Произошла ошибка!')
    }
  }

  useEffect(() => {
    FetchBlogs(pagesize, pagenumber)
  }, [])

  return (
    <div>
      <div className="d-flex justify-content-center mb-5">
        <Link href="blogs/create">Добавить блог</Link>
      </div>
      <DashboardCard title="Blogs">
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
                      Text
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
                {filteredBlogs.map((Blog) => (
                  <TableRow key={Blog.title}>
                    <TableCell>
                      <Typography
                        color="textSecondary"
                        variant="subtitle2"
                        fontWeight={400}
                      >
                        {Blog.id}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="subtitle2" fontWeight={600}>
                        {Blog.title == null ? <i>null</i> : Blog.title}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="subtitle2" fontWeight={600}>
                        {Blog.text == null ? <i>null</i> : Blog.text}
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
                ))}
              </TableBody>
            </Table>
          </Box>
        </Box>
      </DashboardCard>
    </div>
  )
}

export default Blogs
