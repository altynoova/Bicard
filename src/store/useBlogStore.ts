import { create } from 'zustand'
import { Blog, BlogRequestModel } from '@/entities/Blog'
import {
  CreateBlog,
  DeleteBlog,
  EditBlog,
  FetchBlogs,
  GetBlog,
} from '@/libs/requests/BlogRequest'

interface IBlogStore {
  Blogs: Blog[];
  currentBlog: Blog;
  FetchBlogs: () => void;
  GetBlog: (id: number) => Promise<any>;
  CreateBlog: (data: BlogRequestModel) => Promise<number>;
  EditBlog: (data: BlogRequestModel, id: number) => Promise<number>;
  DeleteBlog: (id: number) => Promise<number>;
}
const date = new Date();
const useBlogStore = create<IBlogStore>()((set) => ({
  Blogs: [],
  currentBlog: {
    id: 0,
    title: '',
    text: '',
    authorId: '',
    photoPath: '',
    timestamp: date 
  },

  async FetchBlogs() {
    const response = await FetchBlogs()
    console.log(response)
    set(() => ({ Blogs: response.data }))
    return response.status
  },

  async GetBlog(id) {
    const response = await GetBlog(id)
    console.log('current Blog in state', response)
    set(() => ({ currentBlog: response.data }))
    return response.data
  },

  async CreateBlog(data) {
    const response = await CreateBlog(data)
    console.log("data in create blog",response)
    set(() => ({ currentBlog: response.data }))
    return response.status
  },

  async EditBlog(data, id) {
    const response = await EditBlog(data, id)
    console.log(response)
    set(() => ({ currentBlog: response.data }))
    return response.status
  },

  async DeleteBlog(id) {
    const response = await DeleteBlog(id)
    console.log(response)
    if (response.status == 200) {
      set((state) => ({ Blogs: state.Blogs.filter(d => d.id != id) }))
    }
    return response.status
  },

}))

export default useBlogStore