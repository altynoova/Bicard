import { create } from 'zustand'
import { Appointment, CreateAppointmentModel } from '@/entities/Appoinment'
import { $http } from '@/libs/axios'

interface IAppointmentsStore {
  appointments: Appointment[]

  GetAllAppointments: () => Promise<number>
  CreateAppointment: (data: CreateAppointmentModel) => Promise<number>
  ConfirmAppointment: (
    id: number,
    data: CreateAppointmentModel
  ) => Promise<number>
  CancelAppointment: (id: number) => Promise<number>
}

const useAppointmentsStore = create<IAppointmentsStore>()((set) => ({
  appointments: [],

  async GetAllAppointments() {
    const response = await $http.get('/appointments/GetUnconfirmedAppointments')
    set(() => ({ appointments: response.data }))
    return response.status
  },

  async CreateAppointment(data) {
    const response = await $http.post('/appointments/create', data)
    console.log(response)
    return response.status
  },

  async ConfirmAppointment(id, data) {
    const response = await $http.put(
      `/appointments/confirmappointment/${id}`,
      data
    )
    return response.status
  },

  async CancelAppointment(id) {
    const response = await $http.delete(`/appointments/cancel?id=${id}`)
    if (response.status === 200) {
      set((state) => ({
        appointments: state.appointments.filter((a) => a.id !== id),
      }))
    }
    return response.status
  },
}))

export default useAppointmentsStore
