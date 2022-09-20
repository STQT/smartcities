import { useState } from "react"
import { Page } from "shared/components/templates"
import { Post, PostTypes } from "shared/types"
import Image from "next/image"

import { Comment, Like, Tag, Views } from "shared/components/atoms"
import { Comments } from "shared/components/templates"

import { ARTICLE, NEWS, QUESTION } from "services/api"

interface PostViewProps {
  type: PostTypes
  post: Post
}

export const PostView = ({ type, post: targetPost }: PostViewProps) => {
  const [post, setPost] = useState(targetPost)

  const onCommentPosted = () => {
    setPost((prev) => ({ ...prev, comments_count: prev.comments_count + 1 }))
  }

  const handleLikeToggle = () => {
    const toggleLikeEvent = {
      ARTICLE,
      NEWS,
      QUESTION
    }[type].LIKES.toggle

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
    <Page title={post?.title as string}>
      <main className={"flex-1 rounded-[20px]"}>
        {post && (
          <section className={"bg-white py-[20px] rounded-[20px]"}>
            <section className={"px-[20px] flex flex-col border-b pb-4"}>
              <h1 className={"text-[20px] font-semibold mb-6"}>{post.title}</h1>

              {post.tags.length > 0 && (
                <section className={"flex gap-2 mt-4 mb-[40px]"}>
                  {post.tags.map((tag) => (
                    <Tag key={tag.id} {...tag} />
                  ))}
                </section>
              )}

              {post.image && (
                <section
                  className={
                    "max-w-full h-[500px] my-[20px] rounded-[10px] overflow-hidden relative"
                  }>
                  <Image
                    className={"max-w-full h-full object-cover"}
                    src={`https://api.smartcities.uz${post.image}`}
                    layout={"fill"}
                  />
                </section>
              )}

              <p className={"text-[18px]"}>{post.description}</p>
            </section>

            <section className={"p-[20px] pb-0 flex gap-5"}>
              <Like
                toggleLike={handleLikeToggle}
                like_count={post.like_count}
                is_liked={post.is_liked}
              />
              <Views views_count={post.view_count} />
              <Comment comments_count={post.comments_count} />
            </section>
          </section>
        )}

        {post && (
          <Comments
            commentPostedCallback={onCommentPosted}
            comments_count={post.comments_count}
            type={type}
            id={post.id}
          />
        )}

        <section className={"mt-32"}></section>
      </main>
    </Page>
  )
}
