import { create } from 'zustand'
import { User, UserReset } from '@/entities/User'
import { Login, Reset } from '@/libs/requests/AuthRequests'
import { UserLogin } from '@/entities/User'
import { RemoveCookie, SetCookie } from '@/libs/cookie'
import { AxiosResponse } from 'axios'
import email from 'material-ui/svg-icons/communication/email'

interface IUserStore {
  user: User
  SignIn: (data: UserLogin) => Promise<AxiosResponse>
  Reset: (email: string) => Promise<AxiosResponse>
  SignOut: () => void;
}

const useUserStore = create<IUserStore>()((set) => ({
  user: {
    userId: -1,
    doctorId: -1,
    userName: '',
    roleName: '',
    accessToken: '',
    message: '',
  },
  async SignIn(data) {
    const response = await Login(data)
    console.log(response)
    SetCookie('Bicard-Web-API-Access-Token', response?.data?.accessToken)
    SetCookie('userId', response?.data?.userId)
    SetCookie('doctorId', response?.data?.doctorId)
    SetCookie('userRole', response?.data?.roleName)
    SetCookie('userName', response?.data?.userName)
    set(() => ({ user: response?.data }))
    return response
  },
  async Reset(email) {
    const response = await Reset(email)
    return response.status
  },
  SignOut() {
    RemoveCookie('Bicard-Web-API-Access-Token')
    RemoveCookie('userId')
    RemoveCookie('userRole')
  }
}))

export default useUserStore
