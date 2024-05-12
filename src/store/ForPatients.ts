import { create } from 'zustand'
import { ForPatients, ForPatientsRequestModel } from '@/entities/ForPatients'
import {
  CreateForPatients,
  DeleteForPatients,
  EditForPatients,
  FetchForPatientss,
} from '@/libs/requests/ForPatientsRequest'

interface IForPatientsStore {
  ForPatientss: ForPatients[];
  currentForPatients: ForPatients;
  
  FetchForPatientss: () => void;
  CreateForPatients: (data: ForPatientsRequestModel) => Promise<number>;
  EditForPatients: (data: ForPatientsRequestModel, id: number) => Promise<number>;
  DeleteForPatients: (id: number) => Promise<number>;
}
const date = new Date();
const useForPatientsStore = create<IForPatientsStore>()((set) => ({
  ForPatientss: [],
  currentForPatients: {
    id: 0,
    title: '',
    content: ' ',
    timestamp: date,

  },


  async FetchForPatientss() {
    const response = await FetchForPatientss()
    console.log(response)
    set(() => ({ ForPatientss: response.data }))
    return response.status
  },
  async CreateForPatients(data) {
    const response = await CreateForPatients(data)
    console.log("data in create ForPatients", response)
    set(() => ({ currentForPatients: response.data }))
    return response.status
  },

  async EditForPatients(data, id) {
    const response = await EditForPatients(data, id)
    console.log(response)
    set(() => ({ currentForPatients: response.data }))
    return response.status
  },

  async DeleteForPatients(id) {
    const response = await DeleteForPatients(id)
    console.log(response)
    if (response.status == 200) {
      set((state) => ({ ForPatientss: state.ForPatientss.filter(d => d.id != id) }))
    }
    return response.status
  },


}))

export default useForPatientsStore