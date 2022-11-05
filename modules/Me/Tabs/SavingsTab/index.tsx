import { useEffect, useMemo, useState } from "react"
import { Tab } from "@headlessui/react"

import { useTranslation } from "next-export-i18n"
import { useRouter } from "next/router"
import cn from "classnames"

import type { Post as TPost, Posts, PostTypes } from "shared/types"
import { POST_TABS } from "shared/constants"

import { BOOKMARKS } from "services/api"
import { Avatar } from "shared/components/atoms"

import { EmptyState } from "shared/components/atoms/EmptyState"
import { ChevronRightIcon } from "@heroicons/react/24/outline"

const Post = ({
  post,
  onDelete,
  type
}: {
  post: TPost
  onDelete: (id: number, type: PostTypes) => void
  type: PostTypes
}) => {
  const router = useRouter()
  const { t } = useTranslation()

  const handleOpen = () => {
    router.push({
      pathname: `/${type.toLowerCase()}/[id]`,
      query: {
        id: post.id
      }
    })
  }

  return (
    <article className={"bg-white rounded-[20px] flex flex-col"}>
      <div
        className={
          "px-[20px] py-[20px] border-b flex items-center justify-between"
        }>
        <div className={"flex items-center gap-2"}>
          <Avatar src={post?.user?.image} size={40} />
          <span className={"text-[14px]"}>
            {post.user.first_name && post.user.last_name
              ? `${post.user.first_name} ${post.user.last_name}`
              : `@${post.user.username}`}
          </span>
        </div>

        <button onClick={handleOpen} className={"hover:text-blue"}>
          <ChevronRightIcon className={"w-[20px] h-[20px]"} />
        </button>
      </div>

      <div
        className={"p-[12px] lg:p-[32px]"}
        dangerouslySetInnerHTML={{
          __html: post.subtitle
        }}
      />

      <button
        onClick={() => onDelete(post.id, type)}
        className={
          "w-full py-[30px] text-blue border-t hover:opacity-80 transition-opacity"
        }>
        {t("delete")}
      </button>
    </article>
  )
}

export const SavingsTab = () => {
  const { t } = useTranslation()

  const TABS = useMemo(() => POST_TABS(t), [t])

  const [posts, setPosts] = useState<Posts>()

  const [selectedTab, setSelectedTab] = useState<number>(0)

  const handleTabChange = (id: number) => setSelectedTab(id)

  const tabClasses = (isSelected: boolean) =>
    cn(
      "flex gap-2 justify-center items-center uppercase text-[14px] font-semibold transition-all border-b-2 pb-[12px] outline-none",
      {
        "border-blue": isSelected,
        "border-[transparent] text-gray-400": !isSelected
      }
    )

  useEffect(() => {
    BOOKMARKS.getList().then((res) => {
      setPosts(res.data)
    })
  }, [])

  const handleDelete = (id: number, type: PostTypes) => {
    BOOKMARKS.add(id, type).then(() => {
      BOOKMARKS.getList().then((res) => {
        setPosts(res.data)
      })
    })
  }

  return (
    <>
      <Tab.Group selectedIndex={selectedTab} onChange={handleTabChange}>
        <Tab.List
          className={
            "grid grid-cols-3 flex pt-[20px] rounded-[20px] rounded-t-none bg-white px-[40px] gap-[20px] border-b-[0.5px] border-gray-300/30 w-full"
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
              {posts?.news.map((post) => (
                <Post
                  key={post.id}
                  onDelete={handleDelete}
                  post={post}
                  type={"QUESTION"}
                />
              ))}
            </section>

            {posts?.news.length === 0 && (
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
              {posts?.articles.map((post) => (
                <Post
                  key={post.id}
                  onDelete={handleDelete}
                  post={post}
                  type={"NEWS"}
                />
              ))}
            </section>

            {posts?.articles.length === 0 && (
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
              {posts?.questions.map((post) => (
                <Post
                  key={post.id}
                  onDelete={handleDelete}
                  post={post}
                  type={"ARTICLE"}
                />
              ))}
            </section>

            {posts?.questions.length === 0 && (
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
