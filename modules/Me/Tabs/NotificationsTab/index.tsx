import { useEffect, useState } from "react"

import { NOTIFICATIONS } from "services/api"
import { Notification } from "modules/Me/components/templates"
import { EmptyState } from "shared/components/atoms/EmptyState"
import { Notification as TNotification } from "shared/types"
import { PostLoading } from "shared/components/atoms/PostLoading"
import { useTranslation } from "next-export-i18n"

export const NotificationsTab = () => {
  const [isLoading, setLoading] = useState(true)
  const { t } = useTranslation()
  const [notifications, setNotifications] = useState<TNotification[]>([])

  useEffect(() => {
    NOTIFICATIONS.getList().then((res) => {
      setNotifications(res.data.results)
      setLoading(false)
    })
  }, [])

  return (
    <section className={"flex flex-col bg-white"}>
      <div className={"pb-[35px] border-b-[0.5px] border-gray-300/30 w-full"}>
        <div
          className={
            "w-full flex flex-col md:flex-row justify-between gap-5 items-center px-[20px] md:px-[40px]"
          }>
          <h2 className={"text-[24px] font-semibold text-black"}>
            {t("notifications")}
          </h2>
        </div>
      </div>

      <div className={"flex flex-col"}>
        <PostLoading isLoading={isLoading} />

        {!isLoading && notifications?.length === 0 && (
          <EmptyState isEmpty={true} caption={"Уведомлений нет"} />
        )}

        {notifications.map((notification) => (
          <Notification key={notification.id} {...notification} />
        ))}
      </div>
    </section>
  )
}
