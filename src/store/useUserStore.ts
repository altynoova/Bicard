import { create } from 'zustand'
import { User } from '@/entities/User'
import { Login } from '@/libs/requests/AuthRequests'
import { UserLogin } from '@/entities/User'
import { SetCookie } from '@/libs/cookie';

interface IUserStore {
  user: User | undefined;
  SignIn: (data: UserLogin) => Promise<number>;
}

const useUserStore = create<IUserStore>()((set) => ({
  user: undefined,
  async SignIn(data) {
    const response = await Login(data)
    console.log(response)
    SetCookie('Bicard-Web-API-Access-Token', response?.data?.accessToken)
    set(() => ({ user: response?.data }))
    return response.status
  },
}))

export default useUserStore