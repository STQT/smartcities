import { request } from "../config"

export const ARTICLE = {
  getList() {
    return request.get(`/article/`)
  },

  getListByThemeId(theme_id: number) {
    return request.get(`/theme-gr-ar/`, {
      params: { theme_id }
    })
  },

  getFull(id: string) {
    return request.get(`/article/${id}/`)
  },

  search(query: string) {
    return request.get("/search-articles/", {
      params: {
        key: query
      }
    })
  },

  COMMENTS: {
    getCommentsList(id: number) {
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
      return request.get(`/articles/${id}/user_like/`)
    }
  }
}
