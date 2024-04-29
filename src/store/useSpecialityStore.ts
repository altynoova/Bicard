import { create } from 'zustand'
import { GetSpecialities } from '@/libs/requests/SpecialityRequests'

interface ISpecialityStore {
  Specialities:[]
  GetSpecialities: () => Promise<number>;
 
}

const useSpecialityStore = create<ISpecialityStore>()((set) => ({
  Specialities: [],

  async GetSpecialities() {
    const response = await GetSpecialities()
    set(() => ({ Specialities: response.data }))
    return response.status
  },

 
}))

export default useSpecialityStore