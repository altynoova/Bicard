import { Doctor } from '@/entities/Doctor'

export type MedService = {
  id: number
  name: string
  shortDescription: string
  longDescription: string
  subMedServices: SubMedService[] | null
}

export type SubMedService = {
  id: number
  name: string
  price: string
  medServiceId: number
  medService: MedService | null
  subMedServiceDoctors: Doctor[]
}

export type MedServiceModel = Pick<
  MedService,
  'name' | 'shortDescription' | 'longDescription'
>

export type SubMedServiceModel = Pick<
  SubMedService,
  'name' | 'price' | 'medServiceId'
>
