import { create } from 'zustand'
import { CertificateRequestModel, Certificate } from '@/entities/Certificate'
import { $http } from '@/libs/axios'
import router from 'next/router'

interface ICertificateStore {
  Certificates: Certificate[]
  CurrentCertificate : Certificate

  CreateCertificate: (data: CertificateRequestModel) => Promise<number>
  GetAllCertificates: () => Promise<number>
  GetCertificateById: (id: number) => Promise<any>
  GetCertificateByDoctorId: (id: number) => Promise<number>
  DeleteCertificate: (id: number) => Promise<number>
  EditCertificate: (data: CertificateRequestModel) => Promise<number>;
}

const useCertificateStore = create<ICertificateStore>()((set) => ({
  Certificates: [],
  CurrentCertificate : {
    id: 0,
    description: '',
    photoPath: ''
  },


  async CreateCertificate(data) {
    try {
      const response =  await $http({
        method: 'post',
        url: `/certificates/create`,
        data,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      return response.status
    } catch (error: any) {
      return error.status
    }
  },

  async GetAllCertificates() {
    const response = await $http.get('/Certificates/getall')
    console.log("GetAllCertificates", response.data)
    set(() => ({ Certificates: response.data }))
    return response.status
  },

  async GetCertificateById(id) {
    const response = await $http.get(`/Certificates/Get?id=${id}`)
    console.log("response", response)
    set(() => ({ CurrentCertificate: response.data }))
    return response
  },

  async GetCertificateByDoctorId(id) {
    const response = await $http.get(`/Certificates/getCertificatesbydoctorid/${id}`)
    set(() => ({ Certificates: response.data }))
    return response.status
  },

  async DeleteCertificate(id) {
    const response = await $http.delete(`/Certificates/delete?id=${id}`)
    set((state) => ({
      Certificates: state.Certificates.filter((f) => f.id != id),
    }))
    return response.status
  },
  async EditCertificate(data) {
    try {
      const response = await $http({
        method: 'put',
        url: `/certificates/update`,
        data,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      return response.status
    } catch (error: any) {
      return error.status
    }
  },
}))

export default useCertificateStore
