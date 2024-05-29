import { create } from 'zustand'
import { Doctor, DoctorRequestModel, DoctorSchedule } from '@/entities/Doctor'
import {
  CreateDoctor,
  DeleteDoctor,
  EditDoctor,
  FetchDoctors,
  GetDoctor,
  GetUsersByRole,
  FetchDoctorsSchedules
} from '@/libs/requests/DoctorRequests'

interface IDoctorStore {
  doctors: Doctor[];
  currentDoctor: Doctor;
  doctorSchedule:DoctorSchedule[];
  userReferences: { id: number, userName: string }[]
  FetchDoctors: () => void;
  FetchDoctorsSchedule: (currentDay:string, doctorId:number) => void;
  GetDoctor: (id: number) => Promise<any>;
  
  CreateDoctor: (data: DoctorRequestModel) => Promise<number>;
  EditDoctor: (data: DoctorRequestModel, id: number) => Promise<number>;
  DeleteDoctor: (id: number) => Promise<number>;
  GetUsersByRole: (role: string) => Promise<number>;
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
  doctorSchedule:[],
  userReferences: [],

  async FetchDoctors() {
    const response = await FetchDoctors()
    console.log(response)
    set(() => ({ doctors: response.data }))
    return response.status
  },
  async FetchDoctorsSchedule(currentDay, doctorId) {
    const response = await FetchDoctorsSchedules(currentDay, doctorId)
    console.log(response)
    set(() => ({ doctorSchedule: response.data }))
    return response.status
  },
  async GetDoctor(id) {
    const response = await GetDoctor(id)
    console.log("Doctor", response.data)
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
      set((state) => ({ doctors: state.doctors.filter(d => d.id != id) }))
    }
    return response.status
  },

  async GetUsersByRole(role) {
    const response = await GetUsersByRole(role)
    set(() => ({ userReferences: response.data }))
    return response.status
  },
}))

export default useDoctorStore