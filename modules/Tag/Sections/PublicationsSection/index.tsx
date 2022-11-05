import { useEffect, useMemo, useState } from "react"
import { Post as TPost, PostTypes } from "shared/types"

import { TAGS } from "services/api"
import { AxiosListResponse } from "services/api/config"

import { Tab } from "@headlessui/react"
import cn from "classnames"
import { EmptyState } from "shared/components/atoms/EmptyState"
import { useTranslation } from "next-export-i18n"
import { POST_TABS } from "shared/constants"
import moment from "moment"
import { useRouter } from "next/router"

const Post = ({
  created_at,
  id,
  title,
  type
}: {
  created_at: string
  id: number
  title: string
  type: PostTypes
}) => {
  const router = useRouter()

  const handlePostClick = () => {
    router.push({
      pathname: `/${type.toLowerCase()}/[id]`,
      query: {
        id
      }
    })
  }

  return (
    <article
      className={
        "w-full bg-white border p-4 rounded-[20px] flex flex-col justify-center"
      }>
      <h2
        onClick={handlePostClick}
        className={"text-xl hover:text-blue transition-all cursor-pointer"}>
        {title}
      </h2>
      <span className={"text-sm text-gray-400 mt-2"}>
        {moment(created_at).calendar()}
      </span>
    </article>
  )
}

interface PublicationsSectionProps {
  tag_id: string
}

export const PublicationsSection = ({ tag_id }: PublicationsSectionProps) => {
  const [posts, setPosts] = useState<TPost[]>()

  const { t } = useTranslation()

  const TABS = useMemo(() => POST_TABS(t), [t])

  const getTabKeyByIdx = (id: number) => Object.keys(TABS)[id]

  const [selectedTab, setSelectedTab] = useState<number>(0)

  const handleTabChange = (id: number) => setSelectedTab(id)

  useEffect(() => {
    if (getTabKeyByIdx(selectedTab) === "questions") {
      TAGS.getPublications(tag_id, "question").then(
        (res: AxiosListResponse<TPost>) => {
          setPosts(res.data.results)
        }
      )
    }

    if (getTabKeyByIdx(selectedTab) === "news") {
      TAGS.getPublications(tag_id, "news").then(
        (res: AxiosListResponse<TPost>) => {
          setPosts(res.data.results)
        }
      )
    }

    if (getTabKeyByIdx(selectedTab) === "articles") {
      TAGS.getPublications(tag_id, "article").then(
        (res: AxiosListResponse<TPost>) => {
          setPosts(res.data.results)
        }
      )
    }
  }, [selectedTab, tag_id])

  const tabClasses = (isSelected: boolean) =>
    cn(
      "flex gap-2 justify-center items-center uppercase text-[14px] font-semibold transition-all border-b-2 pb-[12px] outline-none",
      {
        "border-blue": isSelected,
        "border-[transparent] text-gray-400": !isSelected
      }
    )

  return (
    <>
      <Tab.Group selectedIndex={selectedTab} onChange={handleTabChange}>
        <Tab.List
          className={
            "grid grid-cols-3 border-r border-l flex pt-[20px] rounded-[20px] border-t rounded-t-none bg-white px-[40px] gap-[20px] border-b-[0.5px] w-full"
          }>
          {Object.entries(TABS).map(([key, value]) => (
            <Tab className={({ selected }) => tabClasses(selected)} key={key}>
              {value.icon} {value.label}
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels className={"overflow-hidden rounded-b-[20px]"}>
          <Tab.Panel>
            <section
              className={
                "grid grid-cols-1 md:grid-cols-2 gap-[20px] mt-[20px]"
              }>
              {posts?.map((post) => (
                <Post key={post.id} {...post} />
              ))}
            </section>

            {posts?.length === 0 && (
              <section>
                <EmptyState
                  className={"mt-0"}
                  isEmpty={true}
                  caption={t("questions_not_found")}
                />
              </section>
            )}
          </Tab.Panel>

          <Tab.Panel>
            <section
              className={
                "grid grid-cols-1 md:grid-cols-2 gap-[20px] mt-[20px]"
              }>
              {posts?.map((post) => (
                <Post key={post.id} {...post} />
              ))}
            </section>

            {posts?.length === 0 && (
              <section>
                <EmptyState
                  className={"mt-0"}
                  isEmpty={true}
                  caption={t("news_not_found")}
                />
              </section>
            )}
          </Tab.Panel>

          <Tab.Panel>
            <section
              className={
                "grid grid-cols-1 md:grid-cols-2 gap-[20px] mt-[20px]"
              }>
              {posts?.map((post) => (
                <Post key={post.id} {...post} />
              ))}
            </section>

            {posts?.length === 0 && (
              <section>
                <EmptyState
                  className={"mt-0"}
                  isEmpty={true}
                  caption={t("articles_not_found")}
                />
              </section>
            )}
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </>
  )
}
