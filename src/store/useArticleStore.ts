import { create } from 'zustand'
import { Article, ArticleRequestModel } from '@/entities/Article'
import {
  CreateArticle,
  DeleteArticle,
  EditArticle,
  FetchArticles,
  LatestArticles,
  GetArticle,
} from '@/libs/requests/ArticleRequest'

interface IArticleStore {
  Articles: Article[];
  Latestarticles: Article[];
  currentArticle: Article;
  
  FetchArticles: () => void;
  LatestArticles: (authorName: string) => void;
  GetArticle: (id: number) => Promise<any>;
  CreateArticle: (data: ArticleRequestModel) => Promise<number>;
  EditArticle: (id: number, data: ArticleRequestModel) => Promise<number>;
  DeleteArticle: (id: number) => Promise<number>;
}
const date = new Date();
const useArticleStore = create<IArticleStore>()((set) => ({
  Articles: [],
  currentArticle: {
    id: 0,
    title: '',
    filePath: '',
    authorName: ' ',
    timestamp: '',

  },
  Latestarticles: [],

  async FetchArticles() {
    const response = await FetchArticles()
    console.log("response",response)
    set(() => ({ Articles: response.data }))
    return response.status
  },
  async LatestArticles(authorName) {

    const response = await LatestArticles(authorName)
    set(() => ({ Latestarticles: response.data }))
    return response.status
  },
  async GetArticle(id) {
    const response = await GetArticle(id)
    set(() => ({ currentArticle: response.data}))
    console.log("currentArticle", response.data)
    return response.data
  },

  async CreateArticle(data) {
    const response = await CreateArticle(data)
    console.log("data in create Article", response)
    set(() => ({ currentArticle: response.data }))
    return response.status
  },

  async EditArticle(id, data) {
    const response = await EditArticle(id, data)
    set(() => ({ currentArticle: response.data }))
    return response.status
  },

  async DeleteArticle(id) {
    const response = await DeleteArticle(id)
    console.log(response)
    if (response.status == 200) {
      set((state) => ({ Articles: state.Articles.filter(d => d.id != id) }))
    }
    return response.status
  },


}))

export default useArticleStore