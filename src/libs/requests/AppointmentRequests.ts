import { $http } from '@/libs/axios'
import { Appointment, AppointmentConfirmationModel } from '@/entities/Appoinment'

export const FetchAppointments = async () => {
  return await $http.get('/appointments/getlistofappointments')
}

export const MakeAppointment = async (data: Appointment) => {
  return await $http.post('/appointments/create', data)
}

export const ConfirmAppointment = async (data: AppointmentConfirmationModel) => {
  return await $http.put('/appointments/confirmappointment', data)
}

export const CancelAppointment = async (id: number) => {
  return await $http.delete(`/appointments/cancel?id=${id}`)
}