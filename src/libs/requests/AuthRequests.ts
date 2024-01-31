import { UserLogin, UserRegister } from "@/entities/User";
import { $http } from "@/libs/axios";

export const Register = async (data: UserRegister) => {
  return await $http.post("/users/register", data);
};

export const Login = async (data: UserLogin) => {
  return await $http.post("/users/login", data);
};
