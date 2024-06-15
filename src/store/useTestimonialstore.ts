import { create } from 'zustand'
import { Testimonial, TestimonialRequestModel } from '@/entities/Testimonials'
import {
  CreateTestimonial,
  DeleteTestimonial,
  EditTestimonial,
  FetchTestimonials,
  GetTestimonial,
} from '@/libs/requests/TestimonialsRequest'

interface ITestimonialstore {
  Testimonials: Testimonial[];
  currentTestimonial: Testimonial;
  
  FetchTestimonials: () => void;
  GetTestimonial: (id: number) => Promise<any>;
  CreateTestimonial: (data: TestimonialRequestModel) => Promise<number>;
  EditTestimonial: ( id: number, data: TestimonialRequestModel) => Promise<number>;
  DeleteTestimonial: (id: number) => Promise<number>;
}
const date = new Date();
const useTestimonialstore = create<ITestimonialstore>()((set) => ({
  Testimonials: [],
  currentTestimonial: {
    id: 0,
    intro: '',
    numberOfBeds: '',
    numberOfEmployees: '',
    numberOfPatients:'',
    pathToPhoto1:'',
    pathToPhoto2:''

  },


  async FetchTestimonials() {
    const response = await FetchTestimonials()
    console.log(response)
    set(() => ({ Testimonials: response.data }))
    return response.status
  },
  async GetTestimonial(id) {
    const response = await GetTestimonial(id)
    console.log('data', response)
    set(() => ({ currentTestimonial: response.data }))
    return response.data
  },

  async CreateTestimonial(data) {
    const response = await CreateTestimonial(data)
    console.log("data in create Testimonial", response)
    set(() => ({ currentTestimonial: response.data }))
    return response.status
  },

  async EditTestimonial(id, data) {
    const response = await EditTestimonial(id, data)
    console.log(response)
    set(() => ({ currentTestimonial: response.data }))
    return response.status
  },

  async DeleteTestimonial(id) {
    const response = await DeleteTestimonial(id)
    console.log(response)
    if (response.status == 200) {
      set((state) => ({ Testimonials: state.Testimonials.filter(d => d.id != id) }))
    }
    return response.status
  },


}))

export default useTestimonialstore