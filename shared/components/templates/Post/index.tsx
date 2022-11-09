import { useMemo, useState } from "react"
import { useRouter } from "next/router"
import CountryFlag from "react-country-flag"

import {
  Avatar,
  Bookmark,
  Comment,
  Like,
  Tag,
  Views
} from "shared/components/atoms"
import { Language, Post as TPost } from "shared/types"

import { addBaseURL } from "shared/utils"

import { ARTICLE, QUESTION, NEWS, BOOKMARKS } from "services/api"
import moment from "moment"
import {
  useLanguageQuery,
  useSelectedLanguage,
  useTranslation
} from "next-export-i18n"

interface PostProps {
  targetPost: TPost
}

export const Post = ({ targetPost }: PostProps) => {
  const [post, setPost] = useState(targetPost)
  const router = useRouter()

  const { t } = useTranslation()
  const { lang: selectedLanguage } = useSelectedLanguage()
  const [languageQuery] = useLanguageQuery()

  const imageURL = useMemo(() => post && addBaseURL(post.image), [post])

  const lang = useMemo(
    () =>
      /*@ts-ignore*/
      ({
        gb: "en",
        kz: "kk",
        kg: "kk",
        tr: "tr",
        az: "az",
        uz: "uz"
      }[selectedLanguage as Language]),
    [selectedLanguage]
  )

  const handleReadMore = () => {
    router.push({
      pathname: `/${post.type.toLowerCase()}/[id]`,
      query: { lang: languageQuery?.lang, id: post.id }
    })
  }

  const handleOpenProfile = () => {
    router.push({
      pathname: "/profile/[id]",
      query: {
        lang: languageQuery?.lang,
        id: post.user.username
      }
    })
  }

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

  const handleSaveToggle = () => {
    if (!post.is_saved) {
      BOOKMARKS.add(post.id, post.type).then(() => {
        setPost((prev) => ({
          ...prev,
          is_saved: !prev.is_saved,
          saved_count: prev.saved_count + 1
        }))
      })
    }

    if (post.is_saved) {
      BOOKMARKS.add(post.id, post.type).then(() => {
        setPost((prev) => ({
          ...prev,
          is_saved: !prev.is_saved,
          saved_count: prev.saved_count - 1
        }))
      })
    }
  }

  return (
    <article className={"rounded-[20px] border bg-white px-[20px] py-[32px]"}>
      <section className={"flex flex-col mb-[20px]"}>
        <div className={"flex gap-2 items-center select-none"}>
          <Avatar src={post.user?.image} size={40} />
          <span
            onClick={handleOpenProfile}
            className={"text-[14px] hover:text-blue transition-all"}>
            {post.user?.first_name && post?.user.last_name
              ? `${post.user.first_name} ${post.user.last_name}`
              : `@${post.user?.username}`}
          </span>

          <span className={"mx-2 text-gray-400 text-[14px]"}>
            {moment(post.created_at)
              .locale(lang as Language)
              .calendar()}
          </span>

          <CountryFlag
            countryCode={post.user?.country_code}
            svg={true}
            style={{
              fontSize: "1.5rem"
            }}
          />
        </div>
      </section>
      <section className={"flex flex-col"}>
        <h1
          onClick={handleReadMore}
          className={
            "text-blue cursor-pointer hover:opacity-80 transition-opacity mb-4 font-semibold text-[16px] md:text-[20px]"
          }>
          {post.title}
        </h1>

        {post && post.image && (
          <div
            className={
              "max-w-full w-full relative flex justify-center overflow-hidden rounded-[10px] my-[20px]"
            }>
            <img className={"rounded-[10px]"} alt={post.title} src={imageURL} />
          </div>
        )}

        {post.subtitle && (
          <div
            className={"text-[16px] mb-[20px]"}
            dangerouslySetInnerHTML={{ __html: post.subtitle }}
          />
        )}

        {post.tags.length > 0 && (
          <section className={"mt-[10px] mb-[10px] flex flex-wrap gap-2"}>
            {post.tags
              .sort((a, b) => {
                return b.name.length - a.name.length
              })
              .map((tag) => (
                <Tag key={tag.id} {...tag} />
              ))}
          </section>
        )}

        <section
          className={"mt-8 md:mt-auto flex w-full items-end justify-between"}>
          <section
            className={
              "flex items-center justify-between md:justify-start w-full md:w-auto gap-[40px]"
            }>
            <Like
              toggleLike={handleLikeToggle}
              like_count={post.like_count}
              is_liked={post.is_liked}
            />

            <Views views_count={post.view_count} />
            <Comment comments_count={post.comments_count} />
            <Bookmark
              is_saved={post.is_saved}
              saves_count={post.saved_count}
              toggleSave={handleSaveToggle}
            />
          </section>

          <button
            onClick={handleReadMore}
            className={
              "hidden md:block px-[20px] py-[16px] text-blue border border-blue rounded-[10px] transition-all hover:bg-blue hover:text-white"
            }>
            {t("read_more")}
          </button>
        </section>
      </section>
    </article>
  )
}
