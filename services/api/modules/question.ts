import { request } from "../config"

export const QUESTION = {
  getList() {
    return request.get("/question/")
  },

  getListByThemeId(theme_id: number) {
    return request.get(`/theme-gr-qs/`, {
      params: { theme_id }
    })
  },

  getFull(id: string) {
    return request.get(`/question/${id}/`)
  },

  search(query: string) {
    return request.get("/search-questions/", {
      params: {
        key: query
      }
    })
  },

  getMine() {
    return request.get("/questions-history/", {
      params: {
        status: "True"
      }
    })
  },

  COMMENTS: {
    getCommentsList(id: number) {
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
