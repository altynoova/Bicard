import { create } from 'zustand'
import { User } from '@/entities/User'
import { Login } from '@/libs/requests/AuthRequests'
import { UserLogin } from '@/entities/User'
import { RemoveCookie, SetCookie } from '@/libs/cookie'
import { AxiosResponse } from 'axios'

interface IUserStore {
  user: User
  SignIn: (data: UserLogin) => Promise<AxiosResponse>
  SignOut: () => void;
}

const useUserStore = create<IUserStore>()((set) => ({
  user: {
    userId: -1,
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
    SetCookie('userRole', response?.data?.roleName)
    SetCookie('userName', response?.data?.userName)
    set(() => ({ user: response?.data }))
    return response
  },
  SignOut() {
    RemoveCookie('Bicard-Web-API-Access-Token')
    RemoveCookie('userId')
    RemoveCookie('userRole')
  }
}))

export default useUserStore
