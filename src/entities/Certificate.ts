export type Certificate = {
  id: number
  photoPath: string
  description: string
}

export type CertificateRequestModel = {
  id:number
  Photo: File | null;
  Description: string
}
