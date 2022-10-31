import { useCallback, useEffect, useMemo, useState } from "react"
import { useRouter } from "next/router"
import { Tab } from "@headlessui/react"
import cn from "classnames"

import { Page } from "shared/components/templates"
import { useAppSelector } from "store"

import { NewsTab, ArticlesTab, QuestionsTab } from "./components/templates"
import { useSelectedLanguage, useTranslation } from "next-export-i18n"
import { Language, Theme } from "../../shared/types"

export const FlowPage = () => {
  const router = useRouter()
  const { t } = useTranslation()
  const { flows } = useAppSelector((state) => state.main)
  const { lang } = useSelectedLanguage()

  const TABS: Record<string, string> = {
    news: t("news"),
    articles: t("articles"),
    questions: t("questions")
  }

  const getTabIdxByKey = (key: string) => Object.keys(TABS).indexOf(key)
  const getTabKeyByIdx = (id: number) => Object.keys(TABS)[id]

  const flow = useMemo(
    () => flows.find((f) => f.id === Number(router.query.id)),
    [router]
  )

  const caption = useCallback(
    (flow: Theme) =>
      lang === "gb"
        ? flow.name
        : flow[`name_${lang as Exclude<Language, "gb">}`],
    [lang]
  )

  const [selectedTab, setSelectedTab] = useState<number>(
    getTabIdxByKey("profile")
  )

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
      "uppercase text-[14px] font-semibold transition-all border-b-2 pb-[12px] outline-none",
      {
        "border-blue": isSelected,
        "border-[transparent]": !isSelected
      }
    )

  useEffect(() => {
    if (Object.keys(TABS).includes(router?.query?.tab as string)) {
      setSelectedTab(getTabIdxByKey(router.query?.tab as string))
    } else {
      setSelectedTab(getTabIdxByKey("news"))

      router
        .replace({
          query: { ...router.query, tab: "news" }
        })
        .catch(console.error)
    }
  }, [router])

  return (
    <Page title={"Flow"}>
      <main className={"flex-1"}>
        <div
          className={"flex flex-col p-[24px] pb-0 rounded-t-[20px] bg-white"}>
          <h1 className={"font-semibold text-[24px]"}>
            {flow && caption(flow)}
          </h1>
        </div>
        <Tab.Group selectedIndex={selectedTab} onChange={handleTabChange}>
          <Tab.List
            className={
              "flex pt-[20px] bg-white px-[40px] gap-[20px] border-b-[0.5px] border-gray-300/30 w-full"
            }>
            {Object.entries(TABS).map(([key, value]) => (
              <Tab className={({ selected }) => tabClasses(selected)} key={key}>
                {value}
              </Tab>
            ))}
          </Tab.List>
          <Tab.Panels className={"overflow-hidden rounded-b-[20px]"}>
            <Tab.Panel>
              <NewsTab />
            </Tab.Panel>

            <Tab.Panel>
              <ArticlesTab />
            </Tab.Panel>

            <Tab.Panel>
              <QuestionsTab />
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </main>
    </Page>
  )
}
