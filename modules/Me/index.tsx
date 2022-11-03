import { ReactNode, useEffect, useMemo, useState } from "react"
import { Tab } from "@headlessui/react"
import cn from "classnames"
import { useRouter } from "next/router"

import { Page } from "shared/components/templates"
import {
  NotificationsTab,
  ProfileTab,
  PublicationsTab,
  SavingsTab
} from "./Tabs"
import { isLoggedIn } from "axios-jwt"
import { useTranslation } from "next-export-i18n"
import {
  BellIcon,
  BookmarkIcon,
  PencilSquareIcon,
  UserCircleIcon
} from "@heroicons/react/24/outline"

export const ProfilePage = () => {
  const router = useRouter()
  const { t } = useTranslation()

  const TABS: Record<string, { label: string; icon: ReactNode }> = {
    profile: {
      label: t("profile"),
      icon: <UserCircleIcon height={20} />
    },
    notifications: {
      label: t("notifications"),
      icon: <BellIcon height={20} />
    },
    posts: {
      label: t("publications"),
      icon: <PencilSquareIcon height={20} />
    },
    saved: {
      label: t("saves"),
      icon: <BookmarkIcon height={20} />
    }
  }

  const getTabIdxByKey = (key: string) => Object.keys(TABS).indexOf(key)
  const getTabKeyByIdx = (id: number) => Object.keys(TABS)[id]

  const [selectedTab, setSelectedTab] = useState<number>(
    getTabIdxByKey("profile")
  )

  useEffect(() => {
    if (!isLoggedIn) {
      router.push("/auth")
    }
  }, [])

  const hasTabTransparentBg = useMemo(() => {
    // TODO: Yes I know, but deadline is soon :)
    return (
      selectedTab === getTabIdxByKey("posts") ||
      selectedTab === getTabIdxByKey("saved")
    )
  }, [selectedTab])

  const handleTabChange = (id: number) => {
    setSelectedTab(id)

    router
      .replace({
        query: { ...router.query, tab: getTabKeyByIdx(id) }
      })
      .catch(console.error)
  }

  const tabClasses = (isSelected: boolean) =>
    cn(
      "flex-1 flex gap-2 justify-center items-center uppercase text-[14px] font-semibold transition-all border-b-2 pb-[12px] outline-none",
      {
        "border-blue": isSelected,
        "border-[transparent] text-gray-400": !isSelected
      }
    )

  useEffect(() => {
    if (Object.keys(TABS).includes(router?.query?.tab as string)) {
      setSelectedTab(getTabIdxByKey(router.query?.tab as string))
    } else {
      setSelectedTab(getTabIdxByKey("profile"))

      router
        .replace({
          query: { ...router.query, tab: "profile" }
        })
        .catch(console.error)
    }
  }, [router])

  return (
    <Page title={TABS[getTabKeyByIdx(selectedTab)].label}>
      <main className={"flex-1 flex flex-col overflow-hidden rounded-[20px]"}>
        <Tab.Group selectedIndex={selectedTab} onChange={handleTabChange}>
          <Tab.List
            className={
              "flex overflow-x-auto pt-[40px] bg-white px-[40px] gap-[20px] border-b-[0.5px] border-gray-300/30 w-full"
            }>
            {Object.entries(TABS).map(([key, value]) => (
              <Tab className={({ selected }) => tabClasses(selected)} key={key}>
                {value.icon} {value.label}
              </Tab>
            ))}
          </Tab.List>

          <div
            className={cn(
              "w-full bg-white",
              hasTabTransparentBg
                ? "rounded-b-3xl h-0"
                : "rounded-none h-[35px]"
            )}
          />

          <Tab.Panels className={"overflow-hidden rounded-b-[20px]"}>
            <Tab.Panel>
              <ProfileTab />
            </Tab.Panel>

            <Tab.Panel>
              <NotificationsTab />
            </Tab.Panel>

            <Tab.Panel>
              <PublicationsTab />
            </Tab.Panel>

            <Tab.Panel>
              <SavingsTab />
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </main>
    </Page>
  )
}
