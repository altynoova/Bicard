'use client'
import React, { useEffect } from 'react'
import AppointmentsTable from '@/components/Admin/Table'
import useAppointmentsStore from '@/store/useAppointmentsStore'
import { AppointmentConfirmationModel } from '@/entities/Appoinment'
import { ConfirmAppointment } from '@/libs/requests/AppointmentRequests'
import { ErrorAlert, SuccessAlert } from '@/libs/helpers/Alert'

const Appointments = () => {
  const initAppointments = useAppointmentsStore().fetchAppointments
  const removeAppointment = useAppointmentsStore().removeAppointment
  const data = useAppointmentsStore().appointments

  const handleAccept = async (data: AppointmentConfirmationModel) => {
    const response = await ConfirmAppointment(data)
    console.log(response)
  }

  const handleDelete = async (id: number) => {
    const responseStatus = await removeAppointment(id)
    if (responseStatus === 200) {
      SuccessAlert('Запись удалена!')
    } else {
      ErrorAlert('Произошла ошибка!')
    }
  }

  useEffect(() => {
    initAppointments()
  }, [])

  return (
    <div>
      <AppointmentsTable data={data} handleAccept={handleAccept} handleDelete={handleDelete} />
    </div>
  )
}

export default Appointments