import { create } from 'zustand'
import { Doctor, DoctorRequestModel } from '@/entities/Doctor'
import {
  CreateDoctor,
  DeleteDoctor,
  EditDoctor,
  FetchDoctors,
  GetDoctor,
  GetUsersByRole,
} from '@/libs/requests/DoctorRequests'

interface IDoctorStore {
  doctors: Doctor[];
  currentDoctor: Doctor;
  userReferences: { id: number, userName: string }[]
  FetchDoctors: () => void;
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
    photoBase64: '',
    phoneNumber: '',
    email: '',
    address: '',
    userId: 0,
  },
  userReferences: [],

  async FetchDoctors() {
    const response = await FetchDoctors()
    console.log(response)
    set(() => ({ doctors: response.data }))
    return response.status
  },

  async GetDoctor(id) {
    const response = await GetDoctor(id)
    console.log('current doctor in state', response)
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