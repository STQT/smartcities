import { AxiosListResponse, request } from "../config"
import { Post, Comment } from "shared/types"
import { AxiosResponse } from "axios"

export const NEWS = {
  getList(page?: number): Promise<AxiosListResponse<Post>> {
    return request.get(`/news/`, {
      params: {
        page
      }
    })
  },

  getListByThemeId(
    theme_id: number,
    page?: number
  ): Promise<AxiosListResponse<Post>> {
    return request.get(`/theme-gr-news/`, {
      params: {
        theme_id,
        page
      }
    })
  },

  getFull(id: string): Promise<AxiosResponse<Post>> {
    return request.get(`/news/${id}/`)
  },

  search(query: string, page?: number): Promise<AxiosListResponse<Post>> {
    return request.get("/search-news/", {
      params: {
        key: query,
        page
      }
    })
  },

  create(payload: any) {
    return request.post("/news/", payload)
  },

  getMine(page?: number): Promise<AxiosListResponse<Post>> {
    return request.get("/news-history/", {
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
      return request.get(`/news-comment/`, {
        params: {
          id,
          page
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
