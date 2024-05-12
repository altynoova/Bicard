import { $http } from '../axios'
import { ArticleRequestModel } from '@/entities/Article'

export const FetchArticles = async () => {
  return await $http.get(`/Articles/getall`)
}
export const LatestArticles = async (authorName:string) => {
  return await $http.get(`/Articles/GetByAuthorName?name=${authorName}`)
}

export const GetArticle = async (id: number) => {
  return await $http.get(`/Articles/get?id=${id}`)
}

export const CreateArticle = async (data: ArticleRequestModel) => {
  try {
    return await $http({
      method: 'post',
      url: `/Articles/create`,
      data,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
  } catch (error: any) {
    return error.status
  }
}

export const EditArticle = async (data: ArticleRequestModel, id: number) => {
  try {
    return await $http({
      method: 'put',
      url: `/Articles/update?id=${id}`,
      data,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
  } catch (error: any) {
    return error.status
  }
}

export const DeleteArticle = async (id: number) => {
  return await $http.delete(`/Articles/delete?id=${id}`)
}