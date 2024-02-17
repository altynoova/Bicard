import { create } from 'zustand'
import { Schedule, ScheduleModel } from '@/entities/Schedule'
import { $http } from '@/libs/axios'

interface IScheduleStore {
  schedules: Schedule[]
  daysOfWeek: { name: string }[]
  GetEmployeeScheduleById: (id: number) => Promise<number>
  CreateSchedule: (data: ScheduleModel) => Promise<number>
  UpdateSchedule: (data: ScheduleModel, id: number) => Promise<number>
  RemoveSchedule: (id: number) => Promise<number>
  ResetSchedules: () => void
}

const useScheduleStore = create<IScheduleStore>()((set) => ({
  schedules: [],
  daysOfWeek: [
    { name: 'Понедельник' },
    { name: 'Вторник' },
    { name: 'Среда' },
    { name: 'Четверг' },
    { name: 'Пятница' },
    { name: 'Суббота' },
    { name: 'Воскресенье' },
  ],

  ResetSchedules() {
    set(() => ({ schedules: [] }))
  },

  async GetEmployeeScheduleById(id) {
    const response = await $http.get(`/schedules/getemployeeschedulebyid/${id}`)
    set(() => ({ schedules: response.data }))
    return response.status
  },

  async CreateSchedule(data) {
    const response = await $http.post('/schedules/create/', data)
    // set((state) => ({ roles: response.data }))
    return response.status
  },

  async UpdateSchedule(data, id) {
    const response = await $http.put(`/schedules/update/${id}`, data)
    // set((state) => ({ roles: response.data }))
    return response.status
  },

  async RemoveSchedule(id) {
    const response = await $http.delete(`/schedules/delete/${id}`)
    set((state) => ({ schedules: state.schedules.filter(s => s.id != id) }))
    return response.status
  },


}))

export default useScheduleStore