import { create } from 'zustand'
import { Blog, BlogRequestModel } from '@/entities/Blog'
import {
  CreateBlog,
  DeleteBlog,
  EditBlog,
  FetchBlogs,
  LatestBlogs,
  GetBlog,
} from '@/libs/requests/BlogRequest'

interface IBlogStore {
  Blogs: Blog[];
  currentBlog: Blog;

  pagesize: number;
  pagenumber: number;
  totalpages: number;
  totalelements: number;

  FetchBlogs: ( pagesize: number, pagenumber: number) => void;
  LatestBlogs: () => void;
  GetBlog: (id: number) => Promise<any>;
  CreateBlog: (data: BlogRequestModel) => Promise<number>;
  EditBlog: (data: BlogRequestModel, id: number) => Promise<number>;
  DeleteBlog: (id: number) => Promise<number>;

  SetPageNumber: (page: number) => void
  SetPageSize: (size: number) => void
}
const date = new Date();
const useBlogStore = create<IBlogStore>()((set) => ({
  Blogs: [],
  currentBlog: {
    id: 0,
    title: '',
    text: '',
    authorId: '',
    authorName: ' ',
    photoPath: '',
    timestamp: date,

  },

  pagesize: 6,
  pagenumber: 1,
  totalpages: 10,
  totalelements: 0,

  async FetchBlogs(pagesize, pagenumber ) {
    const response = await FetchBlogs(pagesize, pagenumber )
    console.log(response)
    set(() => ({ Blogs: response.data }))
    return response.status
  },
  async LatestBlogs() {
    const response = await LatestBlogs()
    set(() => ({ Blogs: response.data }))
    return response.status
  },
  async GetBlog(id) {
    const response = await GetBlog(id)
    set(() => ({ currentBlog: response.data }))
    return response.data
  },

  async CreateBlog(data) {
    const response = await CreateBlog(data)
    console.log("data in create blog", response)
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

  SetPageNumber(page) {
    set(() => ({ pagenumber: page }))
  },

  SetPageSize(size) {
    set(() => ({ pagesize: size }))
  },

}))

export default useBlogStore