import { $http } from '../axios'
import { FAQRequestModel } from '@/entities/FAQ'

export const FetchFAQs = async () => {
  return await $http.get(`/faqs/getall`)
}
export const LatestFAQs = async () => {
  return await $http.get(`/Faqs/getlatest`)
}

export const GetFAQ = async (id: number) => {
  return await $http.get(`/Faqs/get?id=${id}`)
}

export const CreateFAQ = async (data: FAQRequestModel) => {
  try {
    return await $http({
      method: 'post',
      url: `/Faqs/create`,
      data,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
  } catch (error: any) {
    return error.status
  }
}

export const EditFAQ = async (data: FAQRequestModel, id: number) => {
  try {
    return await $http({
      method: 'put',
      url: `/Faqs/update?id=${id}`,
      data,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
  } catch (error: any) {
    return error.status
  }
}

export const DeleteFAQ = async (id: number) => {
  return await $http.delete(`/Faqs/delete?id=${id}`)
}