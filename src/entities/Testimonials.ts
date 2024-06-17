export type Testimonial = {
  id: number;
  intro: string;
  numberOfBeds: string;
  numberOfPatients: string;
  numberOfEmployees:string;
  pathToPhoto1: string;
  pathToPhoto2: string

};

export type TestimonialRequestModel = {
  id: number;
  intro: string;
  numberOfBeds: string;
  numberOfPatients: string;
  numberOfEmployees:string;
  Photo1: File | null;
  Photo2: File | null;

 }