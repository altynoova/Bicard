import { create } from 'zustand'
import { Info, InfoRequestModel } from '@/entities/Info'
import {
  CreateInfo,
  DeleteInfo,
  EditInfo,
  FetchInfos,
  GetInfo,
} from '@/libs/requests/InfoRequest'

interface IInfoStore {
  Infos: Info[];
  currentInfo: Info;
  
  FetchInfos: () => void;
  GetInfo: (id: number) => Promise<any>;
  CreateInfo: (data: InfoRequestModel) => Promise<number>;
  EditInfo: ( id: number, data: InfoRequestModel) => Promise<number>;
  DeleteInfo: (id: number) => Promise<number>;
}
const date = new Date();
const useInfoStore = create<IInfoStore>()((set) => ({
  Infos: [],
  currentInfo: {
    id: 0,
    title: '',
    content: '',
    timestamp: date

  },


  async FetchInfos() {
    const response = await FetchInfos()
    console.log(response)
    set(() => ({ Infos: response.data }))
    return response.status
  },
  async GetInfo(id) {
    const response = await GetInfo(id)
    set(() => ({ currentInfo: response.data }))
    return response.data
  },

  async CreateInfo(data) {
    const response = await CreateInfo(data)
    console.log("data in create Info", response)
    set(() => ({ currentInfo: response.data }))
    return response.status
  },

  async EditInfo(id, data) {
    const response = await EditInfo(id, data)
    console.log(response)
    set(() => ({ currentInfo: response.data }))
    return response.status
  },

  async DeleteInfo(id) {
    const response = await DeleteInfo(id)
    console.log(response)
    if (response.status == 200) {
      set((state) => ({ Infos: state.Infos.filter(d => d.id != id) }))
    }
    return response.status
  },


}))

export default useInfoStore