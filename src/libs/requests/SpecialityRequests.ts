import { $http } from '@/libs/axios'

export const GetSpecialities = async () => {
  return await $http.get('Doctors/GetSpeciality')
}
