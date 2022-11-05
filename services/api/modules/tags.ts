import { AxiosListResponse, request } from "../config"
import { Post, Tag } from "shared/types"
import { AxiosResponse } from "axios"

export const TAGS = {
  getList(page?: number): Promise<AxiosResponse<Tag[]>> {
    return request.get("/tags/", {
      params: {
        page
      }
    })
  },

  get(id: string): Promise<AxiosResponse<Tag>> {
    return request.get(`/tags/${id}`)
  },

  getPublications(
    tag_id: string,
    type: "news" | "article" | "question",
    page?: number
  ): Promise<AxiosListResponse<Post>> {
    return request.get(`/search/${type}`, {
      params: {
        tag: tag_id,
        page
      }
    })
  },
  create(name: string): Promise<AxiosResponse<Tag>> {
    return request.post("/tags/", {
      name
    })
  }
}
