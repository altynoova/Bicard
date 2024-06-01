import { create } from 'zustand'
import {
  Doctor,
  DoctorRequestModel,
  DoctorTimetable,
  TimeSlots,
  TimeTable,
} from '@/entities/Doctor'
import {
  CreateDoctor,
  DeleteDoctor,
  EditDoctor,
  FetchDoctors,
  GetDoctor,
  GetUsersByRole,
} from '@/libs/requests/DoctorRequests'
import { $http } from '@/libs/axios'

interface IDoctorStore {
  doctors: Doctor[]
  currentDoctor: Doctor
  timetable: TimeTable[]
  timeslots: TimeSlots[]
  doctorTimetable: DoctorTimetable
  userReferences: { id: number; userName: string }[]

  FetchDoctors: () => void

  GetDoctor: (id: number) => Promise<any>
  GetScheduleByDoctorId: (doctorId: number) => Promise<any>
  GetTimetable: () => Promise<any>
  GetTimeSlots: (currentDay: string, doctorId: number) => Promise<any>
  GetTimetableByDoctor: (day: string, doctorId: number) => Promise<any>

  CreateDoctor: (data: DoctorRequestModel) => Promise<number>
  EditDoctor: (data: DoctorRequestModel, id: number) => Promise<number>
  DeleteDoctor: (id: number) => Promise<number>
  GetUsersByRole: (role: string) => Promise<number>
}

const useDoctorStore = create<IDoctorStore>()((set) => ({
  doctors: [],
  currentDoctor: {
    id: 0,
    name: '',
    bio: '',
    speciality: '',
    education: '',
    experience: '',
    pathToPhoto: '',
    phoneNumber: '',
    email: '',
    address: '',
    userId: 0,
  },
  userReferences: [],

  timetable: [],
  timeslots: [],
  doctorTimetable: [],
  doctorTimeslots: [],

  async FetchDoctors() {
    const response = await FetchDoctors()
    set(() => ({ doctors: response.data }))
    return response.status
  },
  async GetDoctor(id) {
    const response = await GetDoctor(id)
    console.log('Doctor', response.data)
    set(() => ({ currentDoctor: response.data }))
    return response.data
  },

  async CreateDoctor(data) {
    const response = await CreateDoctor(data)
    console.log(response)
    set(() => ({ currentDoctor: response.data }))
    return response.status
  },

  async EditDoctor(data, id) {
    const response = await EditDoctor(data, id)
    console.log(response)
    set(() => ({ currentDoctor: response.data }))
    return response.status
  },

  async DeleteDoctor(id) {
    const response = await DeleteDoctor(id)
    console.log(response)
    if (response.status == 200) {
      set((state) => ({ doctors: state.doctors.filter((d) => d.id != id) }))
    }
    return response.status
  },

  async GetUsersByRole(role) {
    const response = await GetUsersByRole(role)
    set(() => ({ userReferences: response.data }))
    return response.status
  },

  async GetScheduleByDoctorId(doctorId) {
    const response = await $http.get(`/Schedules/GetByDoctorId?id=${doctorId}`)
    set(() => ({ userReferences: response.data }))
    return response.status
  },

  async GetTimetable() {
    const response = await $http.post('/Schedules/GetTimetable')
    set(() => ({ timetable: response.data }))
    return response.status
  },

  async GetTimetableByDoctor(day, doctorId) {
    console.log("day", day)
    const response = await $http.post(
      `/Schedules/GetTimetableByDoctor?day=${day}&doctorId=${doctorId}`
    )
    set(() => ({ doctorTimetable: response.data }))
    return response.status
  },

  async GetTimeSlots(currentDay: string, doctorId: number) {
    const response = await $http.post(
      `/Schedules/GetTimeSlots?currentDay=${currentDay}&doctorId=${doctorId}`
    )
    set(() => ({ timeslots: response.data }))
    return response.status
  },
}))

export default useDoctorStore
