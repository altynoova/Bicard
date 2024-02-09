'use client'
import React, { useEffect } from 'react'
import AppointmentsTable from '@/components/Admin/Table'
import useAppointmentsStore from '@/store/useAppointmentsStore'
import { ErrorAlert, SuccessAlert } from '@/libs/helpers/Alert'

const Appointments = () => {
  const removeAppointment = useAppointmentsStore().CancelAppointment
  const data = useAppointmentsStore().appointments

  const handleDelete = async (id: number) => {
    const responseStatus = await removeAppointment(id)
    if (responseStatus === 200) {
      SuccessAlert('Запись удалена!')
    } else {
      ErrorAlert('Произошла ошибка!')
    }
  }

  return (
    <div>
      {/*<AppointmentsTable*/}
      {/*  data={data}*/}
      {/*  handleAccept={handleAccept}*/}
      {/*  handleDelete={handleDelete}*/}
      {/*/>*/}
    </div>
  )
}

export default Appointments
