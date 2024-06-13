import { Doctor } from '@/entities/Doctor'

export type MedService = {
  id: number
  name: string
  shortDescription: string
  longDescription: string
  pathToPhoto:string,
}

export type SubMedService = {
  id: number
  name: string
  price: string
  medServiceId: number
  medService: MedService | null
  subMedServiceDoctors: Doctor[]
}


export type MedServiceModel = {
  name: string
  shortDescription: string
  longDescription: string
  Photo:File|null,
}

export type SubMedServiceModel = Pick<
  SubMedService,
  'name' | 'price' | 'medServiceId'
>
