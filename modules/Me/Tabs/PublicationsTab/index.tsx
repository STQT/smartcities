import { ReactNode, useEffect, useMemo, useState } from "react"
import { Post as TPost } from "shared/types"
import { ARTICLE, NEWS, QUESTION } from "services/api"
import { AxiosListResponse } from "services/api/config"
import { Comment, Like, Views } from "shared/components/atoms"
import Link from "next/link"
import { Tab } from "@headlessui/react"
import cn from "classnames"
import { EmptyState } from "shared/components/atoms/EmptyState"
import { useTranslation } from "next-export-i18n"
import { POST_TABS } from "shared/constants"

const Post = ({ post }: { post: TPost }) => {
  return (
    <article className={"bg-white rounded-[20px] flex flex-col"}>
      <div className={"px-[20px] py-[20px] border-b"}>
        <Link href={`/${post.type.toLowerCase()}/${post.id}`}>
          <span className={"text-[18px] cursor-pointer hover:text-blue"}>
            {post.title}
          </span>
        </Link>
      </div>

      <div
        className={"py-[20px] px-[20px]"}
        dangerouslySetInnerHTML={{
          __html: post.subtitle
        }}
      />

      <div className={"px-[20px] py-[20px] flex gap-4"}>
        <Like
          is_liked={post.is_liked}
          like_count={post.like_count}
          isClickable={false}
          toggleLike={() => {}}
        />

        <Views views_count={post.view_count} />

        <Comment comments_count={post.comments_count} />
      </div>
    </article>
  )
}

export const PublicationsTab = () => {
  const [posts, setPosts] = useState<TPost[]>()

  const { t } = useTranslation()

  const TABS = useMemo(() => POST_TABS(t), [t])

  const getTabIdxByKey = (key: string) => Object.keys(TABS).indexOf(key)
  const getTabKeyByIdx = (id: number) => Object.keys(TABS)[id]

  const [selectedTab, setSelectedTab] = useState<number>(
    getTabIdxByKey("profile")
  )

  const handleTabChange = (id: number) => {
    setSelectedTab(id)
  }

  useEffect(() => {
    NEWS.getMine().then((res: AxiosListResponse<TPost>) => {
      setPosts(res.data.results)
    })
  }, [])

  useEffect(() => {
    if (getTabKeyByIdx(selectedTab) === "news") {
      NEWS.getMine().then((res: AxiosListResponse<TPost>) => {
        setPosts(res.data.results)
      })
    }

    if (getTabKeyByIdx(selectedTab) === "articles") {
      ARTICLE.getMine().then((res: AxiosListResponse<TPost>) => {
        setPosts(res.data.results)
      })
    }

    if (getTabKeyByIdx(selectedTab) === "questions") {
      QUESTION.getMine().then((res: AxiosListResponse<TPost>) => {
        setPosts(res.data.results)
      })
    }
  }, [selectedTab])

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
            "grid grid-cols-3 border-r border-l flex pt-[20px] rounded-[20px] rounded-t-none bg-white px-[40px] gap-[20px] border-b  w-full"
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
                <Post key={post.id} post={post} />
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
                <Post key={post.id} post={post} />
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
                <Post key={post.id} post={post} />
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
