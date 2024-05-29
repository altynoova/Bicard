import { $http } from '../axios'
import { DoctorRequestModel } from '@/entities/Doctor'

export const FetchDoctors = async () => {
  return await $http.get('/doctors/getlistofdoctors')
}
export const FetchDoctorsSchedules = async (currentDay:string, doctorId:number) => {
  return await $http.get(`/doctors/getlistofdoctors?currentDay=${currentDay}&doctorId=${doctorId}`)
}

export const GetDoctor = async (id: number) => {
  return await $http.get(`/doctors/getdoctorbyid?id=${id}`)
}

export const CreateDoctor = async (data: DoctorRequestModel) => {
  try {
    return await $http({
      method: 'post',
      url: `/doctors/create`,
      data,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
  } catch (error: any) {
    return error.status
  }
}

export const EditDoctor = async (data: DoctorRequestModel, id: number) => {
  try {
    return await $http({
      method: 'put',
      url: `/doctors/update?id=${id}`,
      data,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
  } catch (error: any) {
    return error.status
  }
}

export const GetUsersByRole = async (role: string) => {
  return await $http.get(`/users/getusersbyrole?role=${role}`)
}

export const DeleteDoctor = async (id: number) => {
  return await $http.delete(`/doctors/delete?id=${id}`)
}