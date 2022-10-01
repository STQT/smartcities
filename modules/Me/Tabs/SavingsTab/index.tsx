import { useEffect, useState } from "react"
import { Post as TPost, PostTypes } from "shared/types"
import { BOOKMARKS } from "services/api"
import { Avatar } from "shared/components/atoms"
import { Tab } from "@headlessui/react"
import cn from "classnames"
import { EmptyState } from "shared/components/atoms/EmptyState"
import { ChevronRightIcon } from "@heroicons/react/24/outline"
import { useRouter } from "next/router"

const TABS: Record<string, string> = {
  news: "Новости",
  articles: "Статьи",
  questions: "Вопросы"
}

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
          <Avatar size={40} />
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
        className={"py-[32px] px-[32px]"}
        dangerouslySetInnerHTML={{
          __html: `${post.description.slice(0, 120)}...`
        }}
      />

      <button
        onClick={() => onDelete(post.id, type)}
        className={
          "w-full py-[30px] text-blue border-t hover:opacity-80 transition-opacity"
        }>
        Удалить
      </button>
    </article>
  )
}

export const SavingsTab = () => {
  const [posts, setPosts] = useState<{
    news: TPost[]
    questions: TPost[]
    articles: TPost[]
  }>()

  const [selectedTab, setSelectedTab] = useState<number>(0)

  const handleTabChange = (id: number) => {
    setSelectedTab(id)
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
            "flex pt-[20px] rounded-[20px] rounded-t-none bg-white px-[40px] gap-[20px] border-b-[0.5px] border-gray-300/30 w-full"
          }>
          {Object.entries(TABS).map(([key, value]) => (
            <Tab className={({ selected }) => tabClasses(selected)} key={key}>
              {value}
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
                <Post onDelete={handleDelete} post={post} type={"NEWS"} />
              ))}
            </section>

            {posts?.news.length === 0 && (
              <section>
                <EmptyState
                  className={"mt-0"}
                  isEmpty={true}
                  caption={"Не найдено сохраненных новостей"}
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
                <Post onDelete={handleDelete} post={post} type={"ARTICLE"} />
              ))}
            </section>

            {posts?.articles.length === 0 && (
              <section>
                <EmptyState
                  className={"mt-0"}
                  isEmpty={true}
                  caption={"Не найдено сохраненных статей"}
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
                <Post onDelete={handleDelete} post={post} type={"QUESTION"} />
              ))}
            </section>

            {posts?.questions.length === 0 && (
              <section>
                <EmptyState
                  className={"mt-0"}
                  isEmpty={true}
                  caption={"Не найдено сохраненных вопросов"}
                />
              </section>
            )}
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </>
  )
}
