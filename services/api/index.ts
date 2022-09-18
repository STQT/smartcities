import { BASE_URL, request } from "./config"
import type { Comment } from "../../shared/types"
import axios from "axios"

export const getNews = () => {
  return axios.get(`${BASE_URL}/news/`)
}

interface RegisterFormState {
  first_name: string
  last_name: string
  username: string
  password: string
  email: string
}
export const register = (formState: RegisterFormState) => {
  return request.post("/register/", formState)
}

export const verify = (number: string, userID: number) => {
  return request.post("/verify/", { number, user: userID })
}

export const getCurrentUser = () => {
  return request.get("/users/me")
}

export const getFlows = () => {
  return request.get("/theme/")
}

export const getNewsByThemeId = (theme_id: number) => {
  return request.get(`/theme-gr-news/`, {
    params: {
      theme_id
    }
  })
}

export const getArticlesByThemeId = (theme_id: number) => {
  return request.get(`/theme-gr-ar/`, {
    params: { theme_id }
  })
}

export const getQuestionsByThemeId = (theme_id: number) => {
  return request.get(`/theme-gr-qs/`, {
    params: { theme_id }
  })
}

export const getFullNews = (id: string) => {
  return request.get(`/news/${id}/`)
}

export const getFullQuestion = (id: string) => {
  return request.get(`/question/${id}/`)
}

export const getFullArticle = (id: string) => {
  return request.get(`/article/${id}/`)
}

export const getReadingNow = () => {
  return request.get(`/a-read/`)
}

export const getArticleComments = (id: number) => {
  return request.get(`/articles-comment`, {
    params: {
      id
    }
  })
}

export const getNewsComments = (id: number) => {
  return request.get(`/news-comment/`, {
    params: {
      id
    }
  })
}

export const postArticleComment = (comment: any) => {
  return request.post("/articles-comment/", comment)
}

export const postNewsComment = (comment: any) => {
  return request.post("/news-comment/", comment)
}

export const likeArticle = (userId: number, articleId: number) => {
  return request.post("/like-articles/", { user: userId, article: articleId })
}
