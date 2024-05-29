import React, { FormEvent, useEffect, useState } from 'react'
import {
  Modal,
  Box,
  Typography,
  Avatar,
  TextField,
  Button,
} from '@mui/material'
import { CreateAppointmentModel } from '@/entities/Appoinment'
import useAppointmentsStore from '@/store/useAppointmentsStore'
import { ErrorAlert, SuccessAlert } from '@/libs/helpers/Alert'

interface IAppointmentModalProps {
  open: boolean
  handleClose: () => void
  time: string
  date: Date
  doctorId: number
}

const AppointmentModalWindow = ({
  open,
  handleClose,
  time,
  date,
  doctorId,
}: IAppointmentModalProps) => {
  const CreateAppointment = useAppointmentsStore(
    (state) => state.CreateAppointment
  )

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [age, setAge] = useState('')

  const [appointmentDateTime, setAppointmentDateTime] = useState<string>(
    new Date().toJSON()
  )

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const data: CreateAppointmentModel = {
      name: name,
      email: email,
      phoneNumber: phoneNumber,
      doctorId: doctorId,
      age: age,
      timeAtSchedule: `${date.toISOString().substring(0, 10)}T${time}:00.000Z`,
    }

    console.log(data)

    const responseStatus = await CreateAppointment(data)
    if (responseStatus === 200) {
      SuccessAlert('Заявка успешпо отправлена')
    } else {
      ErrorAlert('Произошла ошибка')
    }
  }

  useEffect(() => {
    setAppointmentDateTime(time)
  }, [])

  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          backgroundColor: 'white',
          border: '1px solid #000',
          boxShadow: 24,
          padding: 4,
        }}
        component={'form'}
        onSubmit={handleSubmit}
      >
        <Typography variant="h6" component="h2">
          Запись на прием
        </Typography>
        <Box mt={2} display="flex" alignItems="center">
          <Avatar
            alt="Татьяна Антоновна"
            src="path/to/image.jpg" // Use the path to the actual image
            sx={{ width: 80, height: 80, marginRight: 2 }}
          />
          <Box>
            <Typography variant="subtitle1">
              Балгазарова Татьяна Антоновна
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Акушер-гинеколог
            </Typography>
            <Typography variant="body2" color="textSecondary">
              ул. Туркестан, 28/2, Есильский район, Левый берег, Астана
            </Typography>
          </Box>
        </Box>
        <Typography variant="body2" color="error" mt={2}>
          Врач принимает только взрослых пациентов
        </Typography>
        <Typography variant="body2" mt={2}>
          Прием <span style={{ color: 'red' }}>10000 тг.</span>
        </Typography>
        <Typography>doctorId: {doctorId}</Typography>
        <Typography>time: {time}</Typography>
        <Typography>date: {date.toJSON()}</Typography>
        <Typography>
          Akyrky date time:{' '}
          {`${date.toISOString().substring(0, 10)}T${time}:00.000Z`}
        </Typography>
        <TextField
          fullWidth
          type={'text'}
          label="Дата и время приема"
          value={`${new Date(date).toLocaleDateString()} ${time}`}
          margin="normal"
        />
        <TextField
          value={name}
          onChange={(e) => setName(e.target.value)}
          fullWidth
          label="Ваше имя"
          margin="normal"
        />
        <TextField
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
          type={'email'}
          label="Email"
          margin="normal"
        />
        <TextField
          fullWidth
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          label="Ваш телефон"
          margin="normal"
          placeholder="+996 (___) ___-___"
        />
        <TextField
          value={age}
          onChange={(e) => setAge(e.target.value)}
          fullWidth
          label="Age"
          type={'number'}
          margin="normal"
        />
        <Button
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 2 }}
          type={'submit'}
        >
          Записаться
        </Button>
        <Typography variant="caption" display="block" mt={2}>
          Нажимая Записаться, я принимаю условия пользовательского соглашения,
          положения о защите персональных данных и даю свое согласие на
          обработку персональных данных.
        </Typography>
      </Box>
    </Modal>
  )
}

export default AppointmentModalWindow
