import { UserLogin, UserRegister } from "@/entities/User";
import { $http } from "@/libs/axios";

export const Register = async (data: UserRegister) => {
  const response = await $http.post("/users/register", data);
  return response.data;
};

export const Login = async (data: UserLogin) => {
  const response = await $http.post("/users/login", data);
  return response.data;
};
