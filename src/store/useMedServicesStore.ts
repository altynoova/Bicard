import { create } from 'zustand'
import {
  CreateService,
  CreateSubService,
  DeleteService,
  DeleteSubService,
  EditService,
  EditSubService,
  GetMedServiceById,
  GetListOfMedServices,
  GetListOfSubMedServices,
  GetSubMedServiceById,
  GetAllSubMedServices,
} from '@/libs/requests/ServiceRequests'
import {
  MedService,
  MedServiceModel,
  SubMedService,
  SubMedServiceModel,
} from '@/entities/Service'
import { $http } from '@/libs/axios'

interface IMedServicerStore {
  medServices: MedService[]
  currentMedService: MedService
  currentSubMedService: SubMedService
  currentSubMedServices: SubMedService[]
  allSubMedServices: SubMedService[]

  GetListOfMedServices: () => Promise<number>
  GetListOfSubMedServices: (id: number) => Promise<number>
  GetMedServiceById: (id: number) => Promise<number>
  GetSubMedServiceById: (id: number) => Promise<number>
  GetAllSubMedServices: () => Promise<number>

  CreateMedService: (data: FormData) => Promise<number>
  CreateSubMedService: (data: SubMedServiceModel) => Promise<number>

  EditMedService: (data: MedServiceModel, id: number) => Promise<number>
  EditSubMedService: (data: SubMedServiceModel, id: number) => Promise<number>

  RemoveMedService: (id: number) => Promise<number>
  RemoveSubMedService: (id: number) => Promise<number>
}

const useMedServicesStore = create<IMedServicerStore>()((set) => ({
  medServices: [],
  currentMedService: {
    id: 0,
    name: '',
    shortDescription: '',
    longDescription: '',
    files: null,
    subMedServices: [],
  },
  currentSubMedService: {
    id: 0,
    name: '',
    price: '',
    medServiceId: 0,
    medService: null,
    subMedServiceDoctors: [],
  },
  currentSubMedServices: [],
  allSubMedServices: [],

  async GetListOfMedServices() {
    const response = await GetListOfMedServices()
    set(() => ({ medServices: response.data }))
    return response.status
  },

  async GetListOfSubMedServices(id) {
    const response = await GetListOfSubMedServices(id)
    set(() => ({ currentSubMedServices: response.data }))
    return response.status
  },

  async GetAllSubMedServices() {
    const response = await GetAllSubMedServices()
    set(() => ({ allSubMedServices: response.data }))
    return response.status
  },

  async GetMedServiceById(id) {
    const response = await GetMedServiceById(id)
    set(() => ({ currentMedService: response.data }))
    return response.status
  },

  async GetSubMedServiceById(id) {
    const response = await GetSubMedServiceById(id)
    set(() => ({ currentSubMedService: response.data }))
    return response.status
  },

  async CreateMedService(data) {
    console.log(data)
    const response =  await $http.post('/medservices/createmedservice', data, {
      headers:{
        "Content-Type": 'multipart/form-data'
      }
    })
    set(() => ({medServices: response.data}))
    return response.status
  },

  async CreateSubMedService(data) {
    const response = await CreateSubService(data)
    // set(() => ({medServices: response.data}))
    return response.status
  },

  async EditMedService(data, id) {
    const response = await EditService(data, id)
    // set(() => ({medServices: response.data}))
    return response.status
  },

  async EditSubMedService(data, id) {
    const response = await EditSubService(data, id)
    // set(() => ({medServices: response.data}))
    return response.status
  },

  async RemoveMedService(id) {
    const response = await DeleteService(id)
    set((state) => ({
      medServices: state.medServices.filter((s) => s.id != id),
    }))
    return response.status
  },

  async RemoveSubMedService(id) {
    const response = await DeleteSubService(id)
    // set((state) => ({subMedService: state.subMedService.filter(s => s.id != id)}))
    return response.status
  },
}))

export default useMedServicesStore
