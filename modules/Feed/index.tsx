import { Page } from "shared/components/templates"
import { useEffect, useMemo, useState } from "react"
import { USER } from "services/api"
import { useTranslation } from "next-export-i18n"
import { isLoggedIn } from "axios-jwt"

import { setLoggedIn, setUser } from "store/slices/main"
import { useAppDispatch } from "store"
import { Tab } from "@headlessui/react"
import cn from "classnames"

import { POST_TABS } from "../../shared/constants"
import { ArticlesTab, NewsTab, QuestionsTab } from "./Tabs"

export const FeedPage = () => {
  const dispatch = useAppDispatch()

  const { t } = useTranslation()

  useEffect(() => {
    if (isLoggedIn()) {
      dispatch(setLoggedIn())

      USER.getCurrent().then((res) => {
        dispatch(setUser(res.data))
      })
    }
  }, [dispatch])

  const TABS = useMemo(() => POST_TABS(t), [t])

  const getTabIdxByKey = (key: string) => Object.keys(TABS).indexOf(key)

  const [selectedTab, setSelectedTab] = useState<number>(
    getTabIdxByKey("questions")
  )

  const handleTabChange = (id: number) => {
    setSelectedTab(id)
  }

  const tabClasses = (isSelected: boolean) =>
    cn(
      "flex flex-1 gap-2 justify-center items-center uppercase text-[14px] font-semibold transition-all border-b-2 pb-[12px] outline-none",
      {
        "border-blue": isSelected,
        "border-[transparent] text-gray-400": !isSelected
      }
    )

  return (
    <Page
      withAside={true}
      title={`"Smart Cities" portal - Organization of Turkic States 2022`}>
      <main className={"flex-1 flex flex-col gap-[20px]"}>
        <Tab.Group selectedIndex={selectedTab} onChange={handleTabChange}>
          <Tab.List
            className={
              "flex border-t rounded-[20px] border-l border-r overflow-x-auto pt-4 bg-white px-[40px] gap-[20px] border-b  w-full"
            }>
            {Object.entries(TABS).map(([key, value]) => (
              <Tab className={({ selected }) => tabClasses(selected)} key={key}>
                {value.icon} {value.label}
              </Tab>
            ))}
          </Tab.List>

          <Tab.Panels>
            <Tab.Panel>
              <QuestionsTab />
            </Tab.Panel>
            <Tab.Panel>
              <NewsTab />
            </Tab.Panel>
            <Tab.Panel>
              <ArticlesTab />
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </main>
    </Page>
  )
}
