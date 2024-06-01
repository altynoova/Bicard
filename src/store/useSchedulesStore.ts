import { create } from 'zustand'
import { Schedule, ScheduleModel } from '@/entities/Schedule'
import { $http } from '@/libs/axios'

interface IScheduleStore {
  schedules: Schedule[]
  daysOfWeek: { name: string, id:number, time:string }[]
  GetEmployeeScheduleById: (id: number) => Promise<number>
  CreateSchedule: (data: ScheduleModel) => Promise<number>
  UpdateSchedule: (data: ScheduleModel, id: number) => Promise<number>
  RemoveSchedule: (id: number) => Promise<number>
  ResetSchedules: () => void
}

const useScheduleStore = create<IScheduleStore>()((set) => ({
  schedules: [],
  daysOfWeek: [
    { name: 'Monday', id:1, time: "08:30 - 17:00" },
    { name: 'Tuesday', id:2, time: "08:30 - 17:00" },
    { name: 'Wednesday', id:2 , time: "08:30 - 17:00"},
    { name: 'Thursday', id:3 , time: "08:30 - 17:00"},
    { name: 'Friday', id:4, time: "08:30 - 17:00" },
    { name: 'Saturday', id:5, time: "08:30 - 13:00"},
    { name: 'Sunday' , id:0, time: "- "},
  ],

  ResetSchedules() {
    set(() => ({ schedules: [] }))
  },

  async GetEmployeeScheduleById(id) {
    console.log("GetEmployeeScheduleById:", id)
    const response = await $http.get(`/schedules/GetByDoctorId?id=${id}`)
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
    console.log("id", id)
    const response = await $http.post(`/schedules/delete?id=${id}`)
    set((state) => ({ schedules: state.schedules.filter(s => s.id != id) }))
    return response.status
  },


}))

export default useScheduleStore