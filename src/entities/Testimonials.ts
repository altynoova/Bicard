export type Testimonial = {
  id: number;
  intro: string;
  numberOfBeds: string;
  numberOfPatients: string;
  numberOfEmployees:string;
  pathToPhoto: string
};

export type TestimonialRequestModel = {
  id: number;
  intro: string;
  numberOfBeds: string;
  numberOfPatients: string;
  numberOfEmployees:string;
  Photo: File | null;
 }