import { request } from "../config"
import { User } from "../../../shared/types"

interface RegisterFormState {
  first_name: string
  last_name: string
  username: string
  password: string
  email: string
}

export const USER = {
  register(formState: RegisterFormState) {
    return request.post("/register/", formState)
  },

  verify(number: string, userID: number) {
    return request.post("/verify/", { number, user: userID })
  },

  getCurrent() {
    return request.get("/users/me")
  },

  updateInfo(username: string, payload: Partial<User>) {
    return request.put(`/users/${username}/`, payload)
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
