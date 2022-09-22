import { useMemo, useState } from "react"
import { useRouter } from "next/router"
import Image from "next/image"

import { Comment, Like, Tag, Views } from "shared/components/atoms"
import { Post as TPost } from "shared/types"

import { addBaseURL } from "shared/utils"

import { ARTICLE, QUESTION, NEWS } from "services/api"

interface PostProps {
  targetPost: TPost
}

export const Post = ({ targetPost }: PostProps) => {
  const [post, setPost] = useState(targetPost)
  const router = useRouter()

  const imageURL = useMemo(() => post && addBaseURL(post.image), [post])

  const handleReadMore = () => {
    router.push({
      pathname: `/${post.type.toLowerCase()}/[id]`,
      query: { id: post.id }
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

  return (
    <article className={"rounded-[20px] bg-white px-[20px] py-[32px]"}>
      <section className={"flex flex-col"}>
        <h1
          onClick={handleReadMore}
          className={"text-blue mb-4 font-semibold text-[20px]"}>
          {post.title}
        </h1>

        {post && post.image && (
          <div
            className={
              "max-w-full h-[350px] w-full relative overflow-hidden rounded-[10px] my-[20px]"
            }>
            <Image
              src={imageURL as string}
              layout={"fill"}
              className={"max-w-full h-full object-cover"}
            />
          </div>
        )}
        <p className={"text-[16px] mb-[20px]"}>{post.description}</p>

        {post.tags.length > 0 && (
          <section className={"mt-[10px] flex gap-2"}>
            {post.tags.map((tag) => (
              <Tag key={tag.id} {...tag} />
            ))}
          </section>
        )}

        <section className={"mt-auto flex w-full items-end justify-between"}>
          <section className={"flex items-center gap-[40px]"}>
            <Like
              toggleLike={handleLikeToggle}
              like_count={post.like_count}
              is_liked={post.is_liked}
            />

            <Views views_count={post.view_count} />
            <Comment comments_count={post.comments_count} />
          </section>

          <button
            onClick={handleReadMore}
            className={
              "px-[20px] py-[16px] text-blue border border-blue rounded-[10px] transition-all hover:bg-blue hover:text-white"
            }>
            Читать далее
          </button>
        </section>
      </section>
    </article>
  )
}
