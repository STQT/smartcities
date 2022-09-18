import { useState } from "react"
import { Switch } from "shared/components/atoms"
import { Notification } from "modules/Me/components/templates"

export const NotificationsTab = () => {
  const [isNotificationsDisabled, setNotificationsDisabled] = useState(false)

  return (
    <section className={"flex flex-col bg-white"}>
      <div className={"pb-[35px] border-b-[0.5px] border-gray-300/30 w-full"}>
        <div className={"w-full flex justify-between items-center px-[40px]"}>
          <h2 className={"text-[24px] font-semibold text-black"}>
            Уведомления
          </h2>

          <div className={"flex gap-[20px] items-center"}>
            <span className={"text-gray-400 text-[16px]"}>Не беспокоить</span>

            <Switch
              value={isNotificationsDisabled}
              setValue={setNotificationsDisabled}
            />
          </div>
        </div>
      </div>

      <div className={"flex flex-col"}>
        <Notification label={"Lorem"} receivedAt={"4 Hours ago"} />
        <Notification label={"Lorem"} receivedAt={"4 Hours ago"} />
        <Notification label={"Lorem"} receivedAt={"4 Hours ago"} />
        <Notification label={"Lorem"} receivedAt={"4 Hours ago"} />
        <Notification label={"Lorem"} receivedAt={"4 Hours ago"} />

        <button
          className={
            "py-[40px] flex items-center justify-center bg-gray-[#FCFCFF] text-[18px] font-semibold text-blue"
          }>
          Посмотреть все
        </button>
      </div>
    </section>
  )
}
