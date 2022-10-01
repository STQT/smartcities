import { request } from "../config"
import { Tag } from "shared/types"
import { AxiosResponse } from "axios"

export const TAGS = {
  getList(): Promise<AxiosResponse<Tag[]>> {
    return request.get("/tags/")
  },

  create(name: string): Promise<AxiosResponse<Tag>> {
    return request.post("/tags/", {
      name
    })
  }
}
