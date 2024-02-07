import { create } from 'zustand'
import {
  CreateService,
  CreateSubService, DeleteService, DeleteSubService,
  EditService, EditSubService,
  GetServices,
  GetSubServices,
} from '@/libs/requests/ServiceRequests'
import { MedService, MedServiceModel, SubMedService, SubMedServiceModel } from '@/entities/Service'

interface IMedServicerStore {
  medServices: MedService[]
  subMedServices: SubMedService[]
  GetMedServices: () => Promise<number>;
  GetSubMedServices: () => Promise<number>;
  CreateMedService: (data: MedServiceModel) => Promise<number>
  CreateSubMedService: (data: SubMedServiceModel) => Promise<number>
  EditMedService: (data: MedServiceModel, id: number) => Promise<number>
  EditSubMedService: (data: SubMedServiceModel, id: number) => Promise<number>
  RemoveMedService: (id: number) => Promise<number>
  RemoveSubMedService: (id: number) => Promise<number>
}

const useMedServicesStore = create<IMedServicerStore>()((set) => ({
  medServices: [],
  subMedServices: [],
  async GetMedServices() {
    const response = await GetServices()
    set(() => ({ medServices: response.data }))
    return response.status
  },
  async GetSubMedServices() {
    const response = await GetSubServices()
    set(() => ({ medServices: response.data }))
    return response.status
  },
  async CreateMedService(data) {
    const response = await CreateService(data)
    set(() => ({ medServices: response.data }))
    return response.status
  },
  async CreateSubMedService(data) {
    const response = await CreateSubService(data)
    set(() => ({ medServices: response.data }))
    return response.status
  },
  async EditMedService(data, id) {
    const response = await EditService(data, id)
    set(() => ({ medServices: response.data }))
    return response.status
  },
  async EditSubMedService(data, id) {
    const response = await EditSubService(data, id)
    set(() => ({ medServices: response.data }))
    return response.status
  },
  async RemoveMedService(id) {
    const response = await DeleteService(id)
    set((state) => ({ medServices: state.medServices.filter(s => s.id != id) }))
    return response.status
  },
  async RemoveSubMedService(id) {
    const response = await DeleteSubService(id)
    set((state) => ({ subMedServices: state.subMedServices.filter(s => s.id != id) }))
    return response.status
  },
}))

export default useMedServicesStore