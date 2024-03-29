export type Doctor = {
  id: number;
  name: string;
  bio: string;
  speciality: string;
  education: string;
  experience: string;
  photoBase64: string;
  phoneNumber: string;
  email: string;
  address: string;
  userId: number;
};

export type DoctorRequestModel = {
  name: string;
  speciality: string;
  bio: string;
  education: string;
  experience: string;
  photo: File | null;
  phoneNumber: string;
  email: string;
  address: string;
  userId: number;
}