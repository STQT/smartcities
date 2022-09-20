import { request } from "../config"

export const NEWS = {
  getList() {
    return request.get(`/news/`)
  },

  getListByThemeId(theme_id: number) {
    return request.get(`/theme-gr-news/`, {
      params: {
        theme_id
      }
    })
  },

  getFull(id: string) {
    return request.get(`/news/${id}/`)
  },

  search(query: string) {
    return request.get("/search-news/", {
      params: {
        key: query
      }
    })
  },

  COMMENTS: {
    getCommentsList(id: number) {
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
