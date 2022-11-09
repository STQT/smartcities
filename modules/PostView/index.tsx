import { useMemo, useState } from "react"
import { Page } from "shared/components/templates"
import { Language, Post } from "shared/types"

import {
  Avatar,
  Bookmark,
  Comment,
  Like,
  Tag,
  Views
} from "shared/components/atoms"
import { Comments } from "shared/components/templates"

import { ARTICLE, BOOKMARKS, NEWS, QUESTION } from "services/api"
import moment from "moment/moment"
import CountryFlag from "react-country-flag"
import { addBaseURL } from "../../shared/utils"
import { useRouter } from "next/router"
import { useLanguageQuery, useSelectedLanguage } from "next-export-i18n"

interface PostViewProps {
  post: Post
}

export const PostView = ({ post: targetPost }: PostViewProps) => {
  const [post, setPost] = useState(targetPost)

  const router = useRouter()

  const { lang: selectedLanguage } = useSelectedLanguage()
  const [languageQuery] = useLanguageQuery()

  const onCommentPosted = () => {
    setPost((prev) => ({ ...prev, comments_count: prev.comments_count + 1 }))
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

  const handleOpenProfile = () => {
    router.push({
      pathname: "/profile/[id]",
      query: {
        lang: languageQuery?.lang,
        id: post.user.username
      }
    })
  }

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

  return (
    <Page title={post?.title as string}>
      <main className={"flex-1 w-full rounded-[20px]"}>
        {post && (
          <section className={"bg-white border py-[20px] rounded-[20px]"}>
            <section className={"px-[20px] flex flex-col border-b pb-4"}>
              <section className={"flex flex-col mb-[20px]"}>
                <div className={"flex gap-2 items-center select-none"}>
                  <Avatar src={addBaseURL(post.user.image)} size={40} />
                  <span
                    onClick={handleOpenProfile}
                    className={
                      "text-[14px] hover:text-blue transition-all cursor-pointer"
                    }>
                    {post.user.first_name && post.user.last_name
                      ? `${post.user.first_name} ${post.user.last_name}`
                      : `@${post.user.username}`}
                  </span>

                  <span className={"mx-2 text-gray-400 text-[14px]"}>
                    {moment(post.created_at)
                      .locale(lang as Language)
                      .calendar()}
                  </span>

                  <CountryFlag
                    countryCode={post.user.country_code}
                    svg={true}
                    style={{
                      fontSize: "1.5rem"
                    }}
                  />
                </div>
              </section>

              <h1 className={"text-[20px] font-semibold mb-2"}>{post.title}</h1>
              <span className={"text-[14px] text-gray-400"}>
                {post.theme.name}
              </span>

              {post.tags.length > 0 && (
                <section className={"flex flex-wrap gap-2 mt-4"}>
                  {post.tags
                    .sort((a, b) => b.name.length - a.name.length)
                    .map((tag) => (
                      <Tag key={tag.id} {...tag} />
                    ))}
                </section>
              )}

              {post.image && (
                <section
                  className={
                    "max-w-full transition-all my-[20px] flex justify-center rounded-[10px] overflow-hidden relative"
                  }>
                  <img
                    className={"rounded-[10px]"}
                    src={`https://api.smartcities.uz${post.image}`}
                    alt={post.title}
                  />
                </section>
              )}

              <div className={"ql-snow"}>
                <div
                  className={"ql-editor"}
                  dangerouslySetInnerHTML={{
                    __html: post.description
                  }}
                />
              </div>
            </section>

            <section className={"p-[20px] pb-0 flex gap-5"}>
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
          </section>
        )}

        {post && (
          <Comments
            commentPostedCallback={onCommentPosted}
            comments_count={post.comments_count}
            type={post.type}
            id={post.id}
          />
        )}

        <section className={"mt-32"}></section>
      </main>
    </Page>
  )
}
