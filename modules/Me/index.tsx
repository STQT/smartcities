import { useEffect, useMemo, useState } from "react"
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
import { useLanguageQuery, useTranslation } from "next-export-i18n"
import { ME_TABS } from "shared/constants"

export const ProfilePage = () => {
  const router = useRouter()
  const { t } = useTranslation()
  const [languageQuery] = useLanguageQuery()

  const TABS = useMemo(() => ME_TABS(t), [t])

  const getTabIdxByKey = (key: string) => Object.keys(TABS).indexOf(key)
  const getTabKeyByIdx = (id: number) => Object.keys(TABS)[id]

  const [selectedTab, setSelectedTab] = useState<number>(
    getTabIdxByKey("profile")
  )

  useEffect(() => {
    if (!isLoggedIn) {
      router.push({ pathname: "/auth", query: languageQuery })
    }
  }, [])

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
      <main className={"flex-1 flex flex-col"}>
        <Tab.Group selectedIndex={selectedTab} onChange={handleTabChange}>
          <Tab.List
            className={
              "flex border-t rounded-t-[20px] border-l border-r overflow-x-auto pt-[40px] bg-white px-[40px] gap-[20px] border-b  w-full"
            }>
            {Object.entries(TABS).map(([key, value]) => (
              <Tab className={({ selected }) => tabClasses(selected)} key={key}>
                {value.icon} {value.label}
              </Tab>
            ))}
          </Tab.List>

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
