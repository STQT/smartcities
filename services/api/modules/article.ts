import { AxiosListResponse, request } from "../config"
import { AxiosResponse } from "axios"
import { Post, Comment } from "shared/types"

export const ARTICLE = {
  getList(page?: number): Promise<AxiosListResponse<Post>> {
    return request.get(`/article/`, {
      params: {
        page
      }
    })
  },

  getListByThemeId(
    theme_id: number,
    page?: number
  ): Promise<AxiosListResponse<Post>> {
    return request.get(`/theme-gr-ar/`, {
      params: { theme_id, page }
    })
  },

  getFull(id: string): Promise<AxiosResponse<Post>> {
    return request.get(`/article/${id}/`)
  },

  search(query: string, page?: number): Promise<AxiosListResponse<Post>> {
    return request.get("/search-articles/", {
      params: {
        key: query,
        page
      }
    })
  },

  create(payload: FormData) {
    return request.post("/article/", payload, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    })
  },

  getMine(page?: number): Promise<AxiosListResponse<Post>> {
    return request.get("/articles-history/", {
      params: {
        status: "True",
        page
      }
    })
  },

  COMMENTS: {
    getCommentsList(
      id: number,
      page?: number
    ): Promise<AxiosListResponse<Comment>> {
      return request.get(`/articles-comment`, {
        params: {
          id,
          page
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
