import { $http } from '../axios'
import { ForPatientsRequestModel } from '@/entities/ForPatients'

export const FetchForPatientss = async () => {
  return await $http.get(`/Infos/getall`)
}

export const CreateForPatients = async (data: ForPatientsRequestModel) => {
  try {
    return await $http({
      method: 'post',
      url: `/Infos/create`,
      data
    })
  } catch (error: any) {
    return error.status
  }
}

export const EditForPatients = async (data: ForPatientsRequestModel, id: number) => {
  try {
    return await $http({
      method: 'put',
      url: `/Infos/update?id=${id}`,
      data
    })
  } catch (error: any) {
    return error.status
  }
}

export const DeleteForPatients = async (id: number) => {
  return await $http.delete(`/Infos/delete?id=${id}`)
}