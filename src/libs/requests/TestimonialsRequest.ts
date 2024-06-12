import { $http } from '../axios'
import { TestimonialRequestModel } from '@/entities/Testimonials'

export const FetchTestimonials = async () => {
  return await $http.get(`/AboutClinic/get`)
}

export const GetTestimonial = async (id: number) => {
  return await $http.get(`/AboutClinic/getone?id=${id}`)
}

export const CreateTestimonial = async (data: TestimonialRequestModel) => {
  try {
    return await $http({
      method: 'post',
      url: `/AboutClinic/create`,
      data,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
  } catch (error: any) {
    return error.status
  }
}

export const EditTestimonial = async (id: number, data: TestimonialRequestModel) => {
  console.log("TestimonialRequest", data)
  try {
    return await $http({
      method: 'put',
      url: `/AboutClinic/update?id=${id}`,
      data,
      headers: {
        'Content-Type': 'multipart/form-data',
      },

    })
  } catch (error: any) {
    return error.status
  }
}

export const DeleteTestimonial = async (id: number) => {
  return await $http.delete(`/AboutClinic/delete?id=${id}`)
}