import { $http } from "@/libs/axios";
import { Contact } from "@/entities/Contact";

export const SendContactInfo = async (data: Contact) => {
  return await $http.post("/contact", data);
};
