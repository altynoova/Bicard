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
import useDoctorStore from '@/store/useDoctorStore'
import { url } from '@/config'
import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'

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
  const { GetDoctor, currentDoctor } = useDoctorStore()
  const t = useTranslations('Services');


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
      date: `${date.toISOString().substring(0, 10)}T${time}:00.000Z`,
    }

    console.log("data", data)

    const responseStatus = await CreateAppointment(data)
    if (responseStatus === 200) {
      SuccessAlert("Успешно")
      handleClose();
    } else {
      ErrorAlert('Произошла ошибка')
    }
  }

  useEffect(() => {
    GetDoctor(doctorId)
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
          {('Make an appointment')}
        </Typography>
        <Box mt={2} display="flex" alignItems="center">
          <Avatar
            alt={currentDoctor.name}
            src={`${url}/TempFileStorage/${currentDoctor.pathToPhoto}`}
            sx={{ width: 80, height: 80, marginRight: 2 }}
          />
          <Box>
            <Typography variant="subtitle1">
              {currentDoctor.name}
            </Typography>
            <Typography variant="body2" color="textSecondary">
             {currentDoctor.speciality}
            </Typography>
          </Box>
        </Box>
        <TextField
          fullWidth
          type={'text'}
          label={('Date')}
          value={`${new Date(date).toLocaleDateString()} ${time}`}
          margin="normal"
        />
        <TextField
          value={name}
          onChange={(e) => setName(e.target.value)}
          fullWidth
          label={('Name')}
          margin="normal"
        />
        <TextField
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
          type={'email'}
          label={('Email')}
          margin="normal"
        />
        <TextField
          fullWidth
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          label={('Phone Number')}
          margin="normal"
          placeholder="+996 (___) ___-___"
        />
        <TextField
          value={age}
          onChange={(e) => setAge(e.target.value)}
          fullWidth
          label={('Age')}
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
          {t('Save')}
        </Button>
        <Typography variant="caption" display="block" mt={2}>
        </Typography>
      </Box>
    </Modal>
  )
}

export default AppointmentModalWindow
