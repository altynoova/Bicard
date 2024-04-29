import { $http } from '../axios'
import { BlogRequestModel } from '@/entities/Blog'

export const FetchBlogs = async (pagenumber: number, pagesize: number) => {
  return await $http.get(`/blogs/getall?pagenumber=${pagenumber}&pagesize=${pagesize}`)
}
export const LatestBlogs = async () => {
  return await $http.get(`/blogs/getlatest`)
}

export const GetBlog = async (id: number) => {
  return await $http.get(`/blogs/get?id=${id}`)
}

export const CreateBlog = async (data: BlogRequestModel) => {
  try {
    return await $http({
      method: 'post',
      url: `/blogs/create`,
      data,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
  } catch (error: any) {
    return error.status
  }
}

export const EditBlog = async (data: BlogRequestModel, id: number) => {
  try {
    return await $http({
      method: 'put',
      url: `/blogs/update?id=${id}`,
      data,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
  } catch (error: any) {
    return error.status
  }
}

export const DeleteBlog = async (id: number) => {
  return await $http.delete(`/blogs/delete?id=${id}`)
}