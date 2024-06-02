import { NewPassword, UserLogin, UserRegister, UserReset } from '@/entities/User'
import { $http } from '@/libs/axios'
import { AxiosError } from 'axios'

export const Register = async (data: UserRegister) => {
  try {
    return await $http.post('/users/register', data)
  } catch (error: any) {
    return error.response
  }
}
export const ResetPassword = async (data: NewPassword) => {
  try {
    return await $http.post(`/users/ResetPassword?email=${data.email}&token=${data.token}&password=${data.password}&confirmPassword=${data.confirmPassword}`);
  } catch (error: any) {
    return error.response
  }
}
export const Login = async (data: UserLogin) => {
  try {
    return await $http.post('/users/login', data)
  } catch (error: any) {
    return error.response
  }
}
export const Reset = async (email: string) => {
  try {
    return await $http.post(`/users/SendPasswordResetLink?email=${email}`)
  } catch (error: any) {
    return error.response
  }
}
