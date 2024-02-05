import { UserLogin, UserRegister } from '@/entities/User'
import { $http } from '@/libs/axios'
import { AxiosError } from 'axios'

export const Register = async (data: UserRegister) => {
  try {
    return await $http.post('/users/register', data)
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
