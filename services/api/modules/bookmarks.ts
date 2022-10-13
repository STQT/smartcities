import { request } from "../config"
import { Post, PostTypes } from "shared/types"
import { AxiosResponse } from "axios"

export const BOOKMARKS = {
  getList(
    page?: number
  ): Promise<
    AxiosResponse<{ news: Post[]; articles: Post[]; questions: Post[] }>
  > {
    return request.get("/saved/", {
      params: {
        page
      }
    })
  },

  add(id: number, type: PostTypes) {
    return request.post("/saved/", {
      id,
      type
    })
  }
}
