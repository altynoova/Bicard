import { create } from 'zustand'
import { CertificateRequestModel, Certificate } from '@/entities/Certificate'
import { $http } from '@/libs/axios'

interface ICertificateStore {
  Certificates: Certificate[]
  currentCertificate: Certificate;

  CreateCertificate: (data: CertificateRequestModel) => Promise<number>
  GetAllCertificates: () => Promise<number>
  GetCertificateById: (id: number) => Promise<Certificate>
  GetCertificateByDoctorId: (id: number) => Promise<number>
  DeleteCertificate: (id: number) => Promise<number>
  EditCertificate: (data: CertificateRequestModel, id: number) => Promise<number>;
}

const useCertificateStore = create<ICertificateStore>((set) => ({
  Certificates: [],
  currentCertificate: {
    id: 0,
    description: '',
    photoPath: ''
  },

  async CreateCertificate(data) {
    try {
      const response = await $http({
        method: 'post',
        url: `/certificates/create`,
        data,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      return response.status
    } catch (error: any) {
      return error.response.status
    }
  },

  async GetAllCertificates() {
    const response = await $http.get('/Certificates/getall')
    set(() => ({ Certificates: response.data }))
    return response.status
  },

  async GetCertificateById(id) {
    const response = await $http.get(`/Certificates/get?id=${id}`)
    console.log("response", response.data)
    set(() => ({ currentCertificate: response.data }))
    return response.data as Certificate
  },

  async GetCertificateByDoctorId(id) {
    const response = await $http.get(`/Certificates/getCertificatesbydoctorid/${id}`)
    set(() => ({ currentCertificate: response.data }))
    return response.status
  },

  async DeleteCertificate(id) {
    const response = await $http.delete(`/Certificates/delete?id=${id}`)
    set((state) => ({
      Certificates: state.Certificates.filter((f) => f.id != id),
    }))
    return response.status
  },

  async EditCertificate(data, id) {
    try {
      const response = await $http({
        method: 'put',
        url: `/certificates/update?id=${id}`,
        data,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      return response.status
    } catch (error: any) {
      return error.response.status
    }
  },
}))

export default useCertificateStore
