import { request } from "../config"
import { Post, PostTypes } from "shared/types"
import { AxiosResponse } from "axios"

export const BOOKMARKS = {
  getList(): Promise<
    AxiosResponse<{ news: Post[]; articles: Post[]; questions: Post[] }>
  > {
    return request.get("/saved/")
  },

  add(id: number, type: PostTypes) {
    return request.post("/saved/", {
      id,
      type
    })
  }
}
