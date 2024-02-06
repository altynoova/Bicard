import { $http } from '@/libs/axios'

export const GetRoles = async () => {
  return await $http.get('roles/getroles')
}

export const AssignRole = async (data: { userName: string, roleName: string }) => {
  return await $http.post(`roles/assignrole?userName=${data.userName}&roleName=${data.roleName}`)
}

export const UnassignRole = async (data: { userName: string, roleName: string }) => {
  return await $http.post(`roles/unassignrole?userName=${data.userName}&roleName=${data.roleName}`)
}

export const CreateRole = async (role: string) => {
  return await $http.post(`roles/createrole`, role)
}
export const DeleteRole = async (role: string) => {
  return await $http.delete(`roles/${role}`)
}