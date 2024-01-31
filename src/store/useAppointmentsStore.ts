import { create } from 'zustand'
import { AppointmentRequest } from '@/entities/Appoinment'
import { CancelAppointment, FetchAppointments } from '@/libs/requests/AppointmentRequests'

interface IAppointmentsStore {
  appointments: AppointmentRequest[];
  fetchAppointments: () => void;
  removeAppointment: (id: number) => Promise<number>;
}

const useAppointmentsStore = create<IAppointmentsStore>()((set) => ({
  appointments: [],
  async fetchAppointments() {
    const response = await FetchAppointments()
    console.log(response)
    set((state) => ({ appointments: response.data }))
  },
  async removeAppointment(id) {
    const response = await CancelAppointment(id)
    console.log(response)
    if (response.status === 200) {
      set((state) => ({ appointments: state.appointments.filter(a => a.id !== id) }))
    }
    return response.status
  },
}))

export default useAppointmentsStore