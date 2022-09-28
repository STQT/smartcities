import { AxiosListResponse, request } from "../config"
import { Post, Comment } from "shared/types"
import { AxiosResponse } from "axios"

export const NEWS = {
  getList(): Promise<AxiosListResponse<Post>> {
    return request.get(`/news/`)
  },

  getListByThemeId(theme_id: number): Promise<AxiosListResponse<Post>> {
    return request.get(`/theme-gr-news/`, {
      params: {
        theme_id
      }
    })
  },

  getFull(id: string): Promise<AxiosResponse<Post>> {
    return request.get(`/news/${id}/`)
  },

  search(query: string): Promise<AxiosListResponse<Post>> {
    return request.get("/search-news/", {
      params: {
        key: query
      }
    })
  },

  create(payload: any) {
    return request.post("/news/", payload)
  },

  getMine(): Promise<AxiosListResponse<Post>> {
    return request.get("/news-history/", {
      params: {
        status: "True"
      }
    })
  },

  COMMENTS: {
    getCommentsList(id: number): Promise<AxiosListResponse<Comment>> {
      return request.get(`/news-comment/`, {
        params: {
          id
        }
      })
    },

    postComment(comment: any) {
      return request.post("/news-comment/", comment)
    }
  },

  LIKES: {
    toggle(id: number) {
      return request.get(`/news/${id}/user_like/`)
    }
  }
}
