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
import { useTranslations } from 'next-intl'

const Doctors = () => {
  const { feedbacks, GetAllFeedbacks, DeleteFeedback } = useFeedbackStore()
  const t = useTranslations('Services')

  const [filter, setFilter] = useState<string>('')

  const filteredFeedbacks = feedbacks.filter((f) => f.userName.includes(filter))

  const handleDelete = async (id: number) => {
    const status = await DeleteFeedback(id)
    if (status == 200) {
      SuccessAlert('Успешно')
      GetAllFeedbacks()
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
        {t('Search')}
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
        <div>{t('No result')}</div>
      ) : (
        <DashboardCard title="Отзывы">
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
                      {t('User')}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="subtitle2" fontWeight={600}>
                      {t('Feedback')}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="subtitle2" fontWeight={600}>
                      {t('Date')}
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
                  {filteredFeedbacks.map((f, index) => (
                    <TableRow key={f.id}>
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
                          {f.userName == null ? <i>null</i> : f.userName}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography
                          color="textSecondary"
                          variant="subtitle2"
                          fontWeight={400}
                        >
                          {f.message == null ? <i>null</i> : f.message}
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
