import { create } from 'zustand'
import { Vacancy, VacancyRequestModel } from '@/entities/Vacancy'
import {
  CreateVacancy,
  DeleteVacancy,
  EditVacancy,
  FetchVacancies,
  GetVacancy,
} from '@/libs/requests/VacancyRequest'

interface IVacancyStore {
  Vacancies: Vacancy[];
  currentVacancy: Vacancy;
  
  FetchVacancies: () => void;
  GetVacancy: (id: number) => Promise<any>;
  CreateVacancy: (data: VacancyRequestModel) => Promise<number>;
  EditVacancy: (data: VacancyRequestModel, id: number) => Promise<number>;
  DeleteVacancy: (id: number) => Promise<number>;
}
const date = new Date();
const useVacancyStore = create<IVacancyStore>()((set) => ({
  Vacancies: [],
  currentVacancy: {
    id: 0,
    position: '',
    requirements: '',
    description: ' ',
    timestamp: date

  },


  async FetchVacancies() {
    const response = await FetchVacancies()
    console.log(response)
    set(() => ({ Vacancies: response.data }))
    return response.status
  },
  async GetVacancy(id) {
    const response = await GetVacancy(id)
    set(() => ({ currentVacancy: response.data }))
    return response.data
  },

  async CreateVacancy(data) {
    const response = await CreateVacancy(data)
    console.log("data in create Vacancy", response)
    set(() => ({ currentVacancy: response.data }))
    return response.status
  },

  async EditVacancy(data, id) {
    const response = await EditVacancy(data, id)
    console.log(response)
    set(() => ({ currentVacancy: response.data }))
    return response.status
  },

  async DeleteVacancy(id) {
    const response = await DeleteVacancy(id)
    console.log(response)
    if (response.status == 200) {
      set((state) => ({ Vacancies: state.Vacancies.filter(d => d.id != id) }))
    }
    return response.status
  },


}))

export default useVacancyStore