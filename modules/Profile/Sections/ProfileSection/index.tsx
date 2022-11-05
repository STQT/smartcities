import { useEffect, useState } from "react"
import cn from "classnames"
import moment from "moment"

import type { User } from "shared/types"
import { USER } from "services/api"

import {
  CakeIcon,
  EnvelopeIcon,
  MapPinIcon,
  PhoneIcon
} from "@heroicons/react/24/outline"

interface ProfileSectionProps {
  username: string
}

export const ProfileSection = ({ username }: ProfileSectionProps) => {
  const [user, setUser] = useState<User>()

  useEffect(() => {
    USER.getInfo(username).then((res) => {
      setUser(res.data)
    })
  }, [username])

  return (
    <section
      className={
        "flex flex-col border-t rounded-t-[20px] border-r border-l px-[20px] py-[40px] outline-none md:px-[40px] bg-white"
      }>
      <section className={"flex items-center gap-[40px]"}>
        <div
          className={
            "w-[150px] h-[150px] bg-[#F5F6FA] flex items-center justify-center border border-[#D9DCE5] rounded-full relative"
          }>
          <img
            src={user?.image}
            alt={"image"}
            className={cn("rounded-full object-cover w-[150px] h-[150px]")}
          />
        </div>

        <div className={"flex flex-col gap-1"}>
          <h3 className={"text-[32px] leading-none font-bold"}>
            {user?.first_name} {user?.last_name}
          </h3>
          <span className={"text-sm text-gray-400"}>@{user?.username}</span>

          {user?.work_name && user?.organization_name && (
            <div className={"text-[16px] font-semibold items-center flex mt-4"}>
              <span>{user?.work_name}</span>
              <div
                className={
                  "w-[5px] h-[5px] mx-[10px] bg-[#4D85CF] rounded-full"
                }
              />
              <span>{user.organization_name}</span>
            </div>
          )}

          <div className={"flex gap-5"}>
            <div className={"text-gray-400 text-sm flex items-center gap-1"}>
              <MapPinIcon height={16} />

              <span>Uzbekistan</span>
            </div>

            <div className={"text-gray-400 text-sm flex items-center gap-1"}>
              <CakeIcon height={16} />

              <span>{moment(user?.birthday_date).format("DD MMM YYYY")}</span>
            </div>
          </div>

          <div className={"flex gap-5"}>
            <div className={"text-gray-400 text-sm flex items-center gap-1"}>
              <EnvelopeIcon height={16} />

              <span>{user?.email}</span>
            </div>

            <div className={"text-gray-400 text-sm flex items-center gap-1"}>
              <PhoneIcon height={16} />

              <span>{user?.phone}</span>
            </div>
          </div>
        </div>
      </section>
    </section>
  )
}
