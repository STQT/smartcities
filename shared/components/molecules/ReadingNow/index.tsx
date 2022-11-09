import { useEffect, useState } from "react"
import Link from "next/link"

import { Comment, Like, Views } from "../../atoms"
import { Post as TPost } from "shared/types"

import { useAppDispatch, useAppSelector } from "store"
import { fetchReadingNow } from "store/slices/main"
import { ARTICLE, NEWS, QUESTION } from "services/api"
import { useLanguageQuery, useTranslation } from "next-export-i18n"
import { FireIcon } from "@heroicons/react/24/outline"

const Post = ({ targetPost }: { targetPost: TPost }) => {
  const [post, setPost] = useState(targetPost)
  const [languageQuery] = useLanguageQuery()

  const handleLikeToggle = () => {
    const toggleLikeEvent = {
      ARTICLE,
      NEWS,
      QUESTION
    }[post.type].LIKES.toggle

    if (post.is_liked) {
      toggleLikeEvent(post.id).then(() => {
        setPost((prev) => ({
          ...prev,
          is_liked: !post.is_liked,
          like_count: prev.like_count - 1
        }))
      })
    }

    if (!post.is_liked) {
      toggleLikeEvent(post.id).then(() => {
        setPost((prev) => ({
          ...prev,
          is_liked: !post.is_liked,
          like_count: prev.like_count + 1
        }))
      })
    }
  }

  return (
    <article
      className={
        "mt-[20px] flex flex-col gap-[20px] pb-[12px] border-b-[0.5px] border-gray-300/30"
      }>
      <Link
        href={{
          pathname: `/${post.type.toLowerCase()}/[id]`,
          query: { id: post.id, lang: languageQuery?.lang }
        }}>
        <span
          className={
            "text-[16px] cursor-pointer transition-all hover:text-blue"
          }>
          {post.title}
        </span>
      </Link>

      <div className={"flex items-center gap-6 text-gray-300"}>
        <Like
          toggleLike={handleLikeToggle}
          is_liked={post.is_liked}
          like_count={post.like_count}
        />
        <Views views_count={post.view_count} />
        <Comment comments_count={post.comments_count} />
      </div>
    </article>
  )
}

export const ReadingNow = () => {
  const { t } = useTranslation()
  const { readingNow } = useAppSelector((state) => state.main)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchReadingNow())
  }, [])

  return (
    <section className={"bg-white border rounded-[20px] w-full"}>
      <div className={"py-[20px] border-b-[0.5px] border-gray-300/30"}>
        <h2
          className={
            "text-blue text-[18px] flex gap-2 items-center ml-[20px] font-semibold"
          }>
          {t("reading_now")}{" "}
          <img src={"/svg/icons/fire.svg"} className={"w-[24px] h-[24px]"} />
        </h2>
      </div>

      <div className={"flex flex-col px-[20px]"}>
        {readingNow.length > 0 &&
          readingNow.map((post) => <Post key={post.id} targetPost={post} />)}
      </div>
    </section>
  )
}
