import { $http } from "../axios";

export const FetchDoctors = async () => {
  return await $http.get("/doctors/getlistofdoctors");
};

export const GetDoctor = async (id:number) => {
  return await $http.get(`/doctors/getdoctorbyid?id=${id}`);
};