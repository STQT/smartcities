import { Page } from "shared/components/templates"
import { Tab } from "@headlessui/react"
import cn from "classnames"
import { ChangeEvent, ReactNode, useEffect, useMemo, useState } from "react"
import { useRouter } from "next/router"
import {
  NewsTab,
  ArticlesTab,
  QuestionsTab,
  UsersTab
} from "./components/templates"
import { Input } from "../../shared/components/atoms"
import debouce from "lodash.debounce"
import { useTranslation } from "next-export-i18n"
import { useAppDispatch, useAppSelector } from "../../store"
import { setSearchTerm } from "../../store/slices/main"
import {
  NewspaperIcon,
  PencilIcon,
  QuestionMarkCircleIcon,
  UserCircleIcon
} from "@heroicons/react/24/outline"

export const SearchPage = () => {
  const router = useRouter()
  const { searchTerm } = useAppSelector((state) => state.main)
  const [query, setQuery] = useState("")
  const dispatch = useAppDispatch()
  const { t } = useTranslation()

  useEffect(() => {
    searchTerm && setQuery(searchTerm)
  }, [searchTerm])

  const TABS: Record<string, { label: string; icon: ReactNode }> = {
    questions: {
      label: t("questions"),
      icon: <QuestionMarkCircleIcon height={20} />
    },
    news: {
      label: t("news"),
      icon: <NewspaperIcon height={20} />
    },
    articles: {
      label: t("articles"),
      icon: <PencilIcon height={20} />
    },
    users: {
      label: "Users",
      icon: <UserCircleIcon height={20} />
    }
  }

  const getTabIdxByKey = (key: string) => Object.keys(TABS).indexOf(key)
  const getTabKeyByIdx = (id: number) => Object.keys(TABS)[id]

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
      setSelectedTab(getTabIdxByKey("questions"))

      router
        .replace({
          query: { ...router.query, tab: "questions" }
        })
        .catch(console.error)
    }
  }, [router])

  const handleQueryChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value)
  }

  const debouncedResults = useMemo(() => {
    return debouce(handleQueryChange, 500)
  }, [])

  useEffect(() => {
    return () => {
      debouncedResults.cancel()
    }
  })

  const [isClicked, setClicked] = useState(false)

  return (
    <Page title={"Flow"}>
      <main className={"flex-1"}>
        <div
          className={"flex flex-col p-[24px] pb-0 rounded-t-[20px] bg-white"}>
          <Input
            onClick={() => {
              setClicked(true)
              dispatch(setSearchTerm(""))
            }}
            value={isClicked ? undefined : searchTerm ?? undefined}
            onChange={debouncedResults}
            placeholder={t("search")}
          />
        </div>
        <Tab.Group selectedIndex={selectedTab} onChange={handleTabChange}>
          <Tab.List
            className={
              "flex pt-[32px] bg-white px-[40px] gap-[20px] border-b-[0.5px] border-gray-300/30 w-full"
            }>
            {Object.entries(TABS).map(([key, value]) => (
              <Tab className={({ selected }) => tabClasses(selected)} key={key}>
                {value.icon} {value.label}
              </Tab>
            ))}
          </Tab.List>
          <Tab.Panels className={"overflow-hidden rounded-b-[20px]"}>
            <Tab.Panel>
              <NewsTab query={query} />
            </Tab.Panel>

            <Tab.Panel>
              <ArticlesTab query={query} />
            </Tab.Panel>

            <Tab.Panel>
              <QuestionsTab query={query} />
            </Tab.Panel>

            <Tab.Panel>
              <UsersTab query={query} />
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </main>
    </Page>
  )
}
