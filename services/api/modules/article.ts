import { AxiosListResponse, request } from "../config"
import { AxiosResponse } from "axios"
import { Post, Comment } from "shared/types"

export const ARTICLE = {
  getList(): Promise<AxiosListResponse<Post>> {
    return request.get(`/article/`)
  },

  getListByThemeId(theme_id: number): Promise<AxiosListResponse<Post>> {
    return request.get(`/theme-gr-ar/`, {
      params: { theme_id }
    })
  },

  getFull(id: string): Promise<AxiosResponse<Post>> {
    return request.get(`/article/${id}/`)
  },

  search(query: string): Promise<AxiosListResponse<Post>> {
    return request.get("/search-articles/", {
      params: {
        key: query
      }
    })
  },

  create(payload: any) {
    return request.post("/article/", payload)
  },

  getMine(): Promise<AxiosListResponse<Post>> {
    return request.get("/articles-history/", {
      params: {
        status: "True"
      }
    })
  },

  COMMENTS: {
    getCommentsList(id: number): Promise<AxiosListResponse<Comment>> {
      return request.get(`/articles-comment`, {
        params: {
          id
        }
      })
    },
    postComment(comment: any) {
      return request.post("/articles-comment/", comment)
    }
  },

  LIKES: {
    toggle(id: number) {
      return request.get(`/article/${id}/user_like/`)
    }
  }
}
