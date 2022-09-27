import { AxiosListResponse, request } from "../config"
import { Comment, Post } from "shared/types"
import { AxiosResponse } from "axios"

export const QUESTION = {
  getList(): Promise<AxiosListResponse<Post>> {
    return request.get("/question/")
  },

  getListByThemeId(theme_id: number): Promise<AxiosListResponse<Post>> {
    return request.get(`/theme-gr-qs/`, {
      params: { theme_id }
    })
  },

  getFull(id: string): Promise<AxiosResponse<Post>> {
    return request.get(`/question/${id}/`)
  },

  search(query: string): Promise<AxiosListResponse<Post>> {
    return request.get("/search-questions/", {
      params: {
        key: query
      }
    })
  },

  getMine(): Promise<AxiosListResponse<Post>> {
    return request.get("/questions-history/", {
      params: {
        status: "True"
      }
    })
  },

  COMMENTS: {
    getCommentsList(id: number): Promise<AxiosListResponse<Comment>> {
      return request.get(`/questions-comment/`, {
        params: {
          id
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
