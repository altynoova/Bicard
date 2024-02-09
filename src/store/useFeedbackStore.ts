import { create } from 'zustand'
import { CreateFeedbackModel, Feedback } from '@/entities/Feedback'
import { $http } from '@/libs/axios'

interface IFeedbackStore {
  feedbacks: Feedback[]

  CreateFeedback: (data: CreateFeedbackModel) => Promise<number>
  GetAllFeedbacks: () => Promise<number>
  GetFeedbackById: (id: number) => Promise<number>
  GetFeedbackByDoctorId: (id: number) => Promise<number>
  DeleteFeedback: (id: number) => Promise<number>
}

const useFeedbackStore = create<IFeedbackStore>()((set) => ({
  feedbacks: [],

  async CreateFeedback(data) {
    const response = await $http.post('/feedbacks/create', data)
    // set((state) => ({ feedbacks: state.feedbacks.push({message}) }))
    return response.status
  },

  async GetAllFeedbacks() {
    const response = await $http.get('/feedbacks/getallfeedbacks')
    set(() => ({ feedbacks: response.data }))
    return response.status
  },

  async GetFeedbackById(id) {
    const response = await $http.get(`/feedbacks/getfeedbackbyid/${id}`)
    set(() => ({ feedbacks: response.data }))
    return response.status
  },

  async GetFeedbackByDoctorId(id) {
    const response = await $http.get(`/feedbacks/getfeedbacksbydoctorid/${id}`)
    set(() => ({ feedbacks: response.data }))
    return response.status
  },

  async DeleteFeedback(id) {
    const response = await $http.delete(`/feedbacks/deletebyid/${id}`)
    set((state) => ({
      feedbacks: state.feedbacks.filter((f) => f.id != id),
    }))
    return response.status
  },
}))

export default useFeedbackStore
