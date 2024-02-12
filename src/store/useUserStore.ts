import { create } from 'zustand'
import { User } from '@/entities/User'
import { Login } from '@/libs/requests/AuthRequests'
import { UserLogin } from '@/entities/User'
import { SetCookie } from '@/libs/cookie'

interface IUserStore {
  user: User
  SignIn: (data: UserLogin) => Promise<number>
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
    set(() => ({ user: response?.data }))
    return response.status
  },
}))

export default useUserStore
