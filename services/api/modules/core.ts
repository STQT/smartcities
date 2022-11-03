import { request } from "../config"
import { User } from "shared/types"

export const USER = {
  register(commonData: Partial<User>) {
    return request.post("/register/", commonData)
  },

  verify(number: string, userID: number) {
    return request.post("/verify/", { number, user: userID })
  },

  getCurrent() {
    return request.get("/users/me")
  },

  updateInfo(username: string, payload: any) {
    return request.put(`/users/${username}/`, payload)
  },

  getInfo(username: string) {
    return request.get(`/users/${username}`)
  }
}

export const BASE = {
  getFlows() {
    return request.get("/theme/")
  },

  getThemeByTreeId(id: number) {
    return request.get("/theme/", {
      params: {
        tree_id: id
      }
    })
  },

  getReadingNow() {
    return request.get(`/a-read/`)
  }
}
