'use client'
import React, { useEffect, useState } from 'react'
import {
  Box,
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material'
import DashboardCard from '@/components/Adminv2/Shared/DashboardCard'
import { ErrorAlert, SuccessAlert } from '@/libs/helpers/Alert'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import useFeedbackStore from '@/store/useFeedbackStore'
import SearchIcon from '@mui/icons-material/Search'

const Doctors = () => {
  const { feedbacks, GetAllFeedbacks, DeleteFeedback } = useFeedbackStore()
  const [filter, setFilter] = useState<string>('')

  const filteredFeedbacks = feedbacks.filter((f) => f.userName.includes(filter))

  const handleDelete = async (id: number) => {
    const status = await DeleteFeedback(id)
    if (status == 200) {
      SuccessAlert('Successfully deleted')
    } else {
      ErrorAlert('Произошла ошибка!')
    }
  }

  useEffect(() => {
    GetAllFeedbacks()
  }, [])

  return (
    <div>
      <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
        <InputLabel htmlFor="outlined-adornment-password">
          Search by doctor name
        </InputLabel>
        <OutlinedInput
          id="outlined-adornment-password"
          type="text"
          value={filter}
          onChange={(event) => setFilter(event.target.value)}
          endAdornment={
            <InputAdornment position="end">
              <IconButton aria-label="toggle password visibility" edge="end">
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          }
          label="Password"
        />
      </FormControl>
      {filteredFeedbacks.length < 1 ? (
        <div>No results</div>
      ) : (
        <DashboardCard title="Feedbacks">
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
                        Username
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="subtitle2" fontWeight={600}>
                        Message
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="subtitle2" fontWeight={600}>
                        Date
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
                  {filteredFeedbacks.map((f) => (
                    <TableRow key={f.id}>
                      <TableCell>
                        <Typography
                          color="textSecondary"
                          variant="subtitle2"
                          fontWeight={400}
                        >
                          {f.id}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="subtitle2" fontWeight={600}>
                          {f.message == null ? <i>null</i> : f.message}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography
                          color="textSecondary"
                          variant="subtitle2"
                          fontWeight={400}
                        >
                          {f.userName == null ? <i>null</i> : f.userName}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="subtitle2" fontWeight={600}>
                          {f.timeStamp == null ? <i>null</i> : f.timeStamp}
                        </Typography>
                      </TableCell>
                      <TableCell align="right">
                        <Button onClick={() => handleDelete(f.id)}>
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
      )}
    </div>
  )
}

export default Doctors
