import { BASE_URL, request } from "./config"
import type { Comment } from "../../shared/types"
import axios from "axios"

interface RegisterFormState {
  first_name: string
  last_name: string
  username: string
  password: string
  email: string
}

/*
  --------------------------
  CORE SECTION
  --------------------------
*/

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

export const getReadingNow = () => {
  return request.get(`/a-read/`)
}

/*
  --------------------------
  QUESTIONS SECTION
  --------------------------
*/

export const getQuestions = () => {
  return request.get("/question/")
}

export const getQuestionsByThemeId = (theme_id: number) => {
  return request.get(`/theme-gr-qs/`, {
    params: { theme_id }
  })
}

export const getFullQuestion = (id: string) => {
  return request.get(`/question/${id}/`)
}

export const getQuestionComments = (id: number) => {
  return request.get(`/questions-comment/`, {
    params: {
      id
    }
  })
}

export const postQuestionComment = (comment: any) => {
  return request.post("/questions-comment/", comment)
}

export const likeQuestion = (userId: number, questionId: number) => {
  return request.post("/like-questions/", { user: userId, news: questionId })
}

export const unlikeQuestion = (userId: number, questionId: number) => {
  return request.delete("/like-questions/", {
    params: {
      id: questionId,
      user_id: userId
    }
  })
}

export const searchQuestions = (query: string) => {
  return request.get("/search-questions/", {
    params: {
      key: query
    }
  })
}

/*
  --------------------------
  NEWS SECTION
  --------------------------
*/

export const getNews = () => {
  return request.get(`/news/`)
}

export const getNewsByThemeId = (theme_id: number) => {
  return request.get(`/theme-gr-news/`, {
    params: {
      theme_id
    }
  })
}

export const getFullNews = (id: string) => {
  return request.get(`/news/${id}/`)
}

export const getNewsComments = (id: number) => {
  return request.get(`/news-comment/`, {
    params: {
      id
    }
  })
}

export const postNewsComment = (comment: any) => {
  return request.post("/news-comment/", comment)
}

export const likeNews = (userId: number, newsId: number) => {
  return request.post("/like-news/", { user: userId, news: newsId })
}

export const unlikeNews = (userId: number, newsId: number) => {
  return request.delete("/like-news/", {
    params: {
      id: newsId,
      user_id: userId
    }
  })
}

export const searchNews = (query: string) => {
  return request.get("/search-news/", {
    params: {
      key: query
    }
  })
}

/*
  --------------------------
  ARTICLES SECTION
  --------------------------
*/

export const getArticlesByThemeId = (theme_id: number) => {
  return request.get(`/theme-gr-ar/`, {
    params: { theme_id }
  })
}

export const getArticles = () => {
  return request.get(`/article/`)
}

export const getArticleComments = (id: number) => {
  return request.get(`/articles-comment`, {
    params: {
      id
    }
  })
}

export const likeArticle = (userId: number, articleId: number) => {
  return request.post("/like-articles/", { user: userId, article: articleId })
}

export const unlikeArticle = (userId: number, articleId: number) => {
  return request.delete("/like-articles/", {
    params: {
      id: articleId,
      user_id: userId
    }
  })
}

export const getFullArticle = (id: string) => {
  return request.get(`/article/${id}/`)
}

export const postArticleComment = (comment: any) => {
  return request.post("/articles-comment/", comment)
}

export const searchArticles = (query: string) => {
  return request.get("/search-articles/", {
    params: {
      key: query
    }
  })
}
