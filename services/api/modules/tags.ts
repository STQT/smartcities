import { request } from "../config"
import { Tag } from "shared/types"
import { AxiosResponse } from "axios"

export const TAGS = {
  getList(page?: number): Promise<AxiosResponse<Tag[]>> {
    return request.get("/tags/", {
      params: {
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
