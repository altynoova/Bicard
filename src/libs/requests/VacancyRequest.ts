import { $http } from '../axios'
import { VacancyRequestModel } from '@/entities/Vacancy'

export const FetchVacancies = async () => {
  return await $http.get(`/vacancies/getall`)
}

export const GetVacancy = async (id: number) => {
  return await $http.get(`/vacancies/get?id=${id}`)
}

export const CreateVacancy = async (data: VacancyRequestModel) => {
  try {
    return await $http({
      method: 'post',
      url: `/vacancies/create`,
      data,
    })
  } catch (error: any) {
    return error.status
  }
}

export const EditVacancy = async (id: number, data: VacancyRequestModel) => {
  console.log("VacancyRequest", data)
  try {
    return await $http({
      method: 'put',
      url: `/vacancies/update?id=${id}`,
      data
    })
  } catch (error: any) {
    return error.status
  }
}

export const DeleteVacancy = async (id: number) => {
  return await $http.delete(`/vacancies/delete?id=${id}`)
}