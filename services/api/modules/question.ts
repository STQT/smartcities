import { AxiosListResponse, request } from "../config"
import { Comment, Post } from "shared/types"
import { AxiosResponse } from "axios"

export const QUESTION = {
  getList(page?: number): Promise<AxiosListResponse<Post>> {
    return request.get("/question/", {
      params: {
        page
      }
    })
  },

  getListByThemeId(
    theme_id: number,
    page?: number
  ): Promise<AxiosListResponse<Post>> {
    return request.get(`/theme-gr-qs/`, {
      params: { theme_id, page }
    })
  },

  getFull(id: string): Promise<AxiosResponse<Post>> {
    return request.get(`/question/${id}/`)
  },

  search(query: string, page?: number): Promise<AxiosListResponse<Post>> {
    return request.get("/search-questions/", {
      params: {
        key: query,
        page
      }
    })
  },

  create(payload: any) {
    return request.post("/question/", payload)
  },

  getMine(page?: number): Promise<AxiosListResponse<Post>> {
    return request.get("/questions-history/", {
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
      return request.get(`/questions-comment/`, {
        params: {
          id,
          page
        }
      })
    },

    postComment(comment: any) {
      return request.post("/questions-comment/", comment)
    }
  },

  LIKES: {
    toggle(id: number) {
      return request.get(`/question/${id}/user_like/`)
    }
  }
}
