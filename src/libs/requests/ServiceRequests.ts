import { $http } from '@/libs/axios'
import { MedServiceModel, SubMedServiceModel } from '@/entities/Service'

export const GetMedServiceById = async (id: number) => {
  return await $http.get(`/medservices/getmedservicebyid/${id}`)
}

export const GetSubMedServiceById = async (id: number) => {
  return await $http.get(`/medservices/getsubmedservicebyid/${id}`)
}
export const GetListOfMedServices = async () => {
  return await $http.get('/medservices/getlistofmedservices')
}

export const GetListOfSubMedServices = async (id: number) => {
  return await $http.get(`/medservices/getlistofsubmedservices?medserviceid=${id}`)
}

export const CreateService = async (data: MedServiceModel) => {
  return await $http.post('/medservices/createmedservice', data)
}

export const CreateSubService = async (data: SubMedServiceModel) => {
  return await $http.post('/medservices/createsubmedservice', data)
}

export const EditService = async (data: MedServiceModel, id: number) => {
  return await $http.put(`/medservices/createmedservice?id=${id}`, data)
}

export const EditSubService = async (data: SubMedServiceModel, id: number) => {
  return await $http.put(`/medservices/createsubmedservice?id=${id}`, data)
}

export const DeleteService = async (id: number) => {
  return await $http.delete(`/medservices/deletemedservice/${id}`)
}

export const DeleteSubService = async (id: number) => {
  return await $http.delete(`/medservices/deletesubmedservice/${id}`)
}