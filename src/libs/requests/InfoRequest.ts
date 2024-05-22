import { $http } from '../axios'
import { InfoRequestModel } from '@/entities/Info'

export const FetchInfos = async () => {
  return await $http.get(`/infos/getall`)
}

export const GetInfo = async (id: number) => {
  return await $http.get(`/infos/get?id=${id}`)
}

export const CreateInfo = async (data: InfoRequestModel) => {
  try {
    return await $http({
      method: 'post',
      url: `/infos/create`,
      data,
    })
  } catch (error: any) {
    return error.status
  }
}

export const EditInfo = async (id: number, data: InfoRequestModel) => {
  console.log("InfoRequest", data)
  try {
    return await $http({
      method: 'put',
      url: `/infos/update?id=${id}`,
      data
    })
  } catch (error: any) {
    return error.status
  }
}

export const DeleteInfo = async (id: number) => {
  return await $http.delete(`/infos/delete?id=${id}`)
}