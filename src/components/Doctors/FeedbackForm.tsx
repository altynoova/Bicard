import React, { useState } from 'react'
import { Box, Button, Grid, TextField } from '@mui/material'
import { CreateFeedbackModel, Feedback } from '@/entities/Feedback'
import useFeedbackStore from '@/store/useFeedbackStore'
import { ErrorAlert, SuccessAlert } from '@/libs/helpers/Alert'

interface IFeedbackForm {
  doctorId: number
  userId: number
}

const FeedbackForm = ({ doctorId, userId }: IFeedbackForm) => {
  const [message, setMessage] = useState<string>('')
  const { CreateFeedback } = useFeedbackStore()

  const handleSubmit = async () => {
    const data: CreateFeedbackModel = {
      message,
      doctorId,
      userId,
    }

    const status = await CreateFeedback(data)
    if (status == 200) {
      SuccessAlert('Отправлено')
    } else {
      ErrorAlert('Не отправлено')
    }
  }

  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
      }}
    >
      <Box
        sx={{
          maxWidth: 600,
          boxShadow: '-11px 13px 41px 4px rgba(34, 60, 80, 0.2)',
          padding: 5,
          margin: 5,
          borderRadius: '15px',
        }}
      >
        <h2>Оставьте фидбек</h2>
        <span>Мы удалим его есть оно нам не понравится.</span>

        <TextField
          fullWidth
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          id="standard-basic"
          label="Message"
          variant="outlined"
        />

        <Button
          sx={{ marginTop: 5 }}
          variant="contained"
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </Box>
    </Box>
  )
}

export default FeedbackForm
