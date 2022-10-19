import { AxiosListResponse, request } from "../config"
import { Notification } from "shared/types"

export const NOTIFICATIONS = {
  getList(): Promise<AxiosListResponse<Notification>> {
    return request("/notifications/")
  }
}
