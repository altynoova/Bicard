import { create } from 'zustand'
import { CreateRole, DeleteRole, GetRoles } from '@/libs/requests/RoleRequests'

interface IRoleStore {
  roles: {
    id: number
    name: string
    normalizedName: string
    concurrencyStamp: string
  }[]
  GetRoles: () => Promise<number>;
  CreateRole: (role: string) => Promise<number>
  RemoveRole: (role: string) => Promise<number>
}

const useRoleStore = create<IRoleStore>()((set) => ({
  roles: [],

  async GetRoles() {
    const response = await GetRoles()
    console.log("roles",response.data)
    set(() => ({ roles: response.data }))
    return response.status
  },

  async CreateRole(role) {
    const response = await CreateRole(role)
    // set((state) => ({ roles: response.data }))
    return response.status
  },

  async RemoveRole(roleName) {
    const response = await DeleteRole(roleName)
    set((state) => ({ roles: state.roles.filter(role => role.name != roleName) }))
    return response.status
  },


}))

export default useRoleStore