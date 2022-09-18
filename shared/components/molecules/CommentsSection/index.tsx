import { Avatar, Button } from "../../atoms"
import type { Comment as TComment } from "../../../types"
import { useEffect, useState } from "react"
import {
  getArticleComments,
  getNewsComments,
  postArticleComment,
  postNewsComment
} from "../../../../services/api"
import { AxiosListResponse } from "../../../../services/api/config"
import { useAppSelector } from "../../../../store"
import { EmptyState } from "../EmptyState"

const Comment = ({ user, comment }: TComment) => {
  return (
    <article className={"flex flex-col"}>
      <div className={"flex gap-2 items-center mb-[20px]"}>
        <Avatar size={40} />

        <div className={"flex text-blue"}>
          {user.first_name} {user.last_name}
        </div>
      </div>

      <div className={"text-[14px]"}>{comment}</div>
    </article>
  )
}

interface CommentsSectionProps {
  comments_count: number
  type: "NEWS" | "ARTICLE" | "QUESTION"
  id: number

  commentPostedCallback?: () => void
}
export const CommentsSection = ({
  comments_count,
  id,
  type,
  commentPostedCallback
}: CommentsSectionProps) => {
  const { user, isLoggedIn } = useAppSelector((state) => state.main)
  const [comments, setComments] = useState<TComment[]>()
  const [myComment, setMyComment] = useState("")

  useEffect(() => {
    if (type === "ARTICLE") {
      fetchAndSetArticleComments(id)
    }

    if (type === "NEWS") {
      fetchAndSetNewsComments(id)
    }
  }, [type, id])

  const fetchAndSetArticleComments = (id: number) => {
    if (type === "ARTICLE") {
      getArticleComments(id).then((res: AxiosListResponse<TComment>) => {
        setComments(res.data.results)
      })
    }
  }

  const fetchAndSetNewsComments = (id: number) => {
    if (type === "NEWS") {
      getNewsComments(id).then((res: AxiosListResponse<TComment>) => {
        setComments(res.data.results)
      })
    }
  }

  const publishComment = () => {
    const payload = {
      user: user?.id,
      comment: myComment
    }

    if (type === "ARTICLE") {
      postArticleComment({
        ...payload,
        created_at: new Date().toString(),
        article: id
      }).then(() => {
        fetchAndSetArticleComments(id)
        setMyComment("")

        commentPostedCallback?.()
      })
    }

    if (type === "NEWS") {
      postNewsComment({
        ...payload,
        created_at: new Date().toString(),
        news: id
      }).then(() => {
        fetchAndSetNewsComments(id)
        setMyComment("")

        commentPostedCallback?.()
      })
    }
  }

  return (
    <section
      className={
        "flex flex-col overflow-hidden max-h-96 bg-white rounded-[20px] mt-4"
      }>
      <section className={"p-[20px]"}>
        <h2 className={"text-blue text-[18px]"}>
          Комментарии {comments_count}
        </h2>
      </section>

      <div
        className={
          "flex-1 p-[20px] h-full overflow-y-scroll flex flex-col gap-[40px]"
        }>
        {comments &&
          comments.map((comment) => <Comment key={comment.id} {...comment} />)}

        {comments?.length === 0 && (
          <div className={"flex py-6 items-center justify-center"}>
            <p className={"text-[20px] font-semibold"}>
              Комментарии не найдены
            </p>
          </div>
        )}
      </div>

      {isLoggedIn && (
        <section
          className={"p-[20px] border-t gap-[10px] bg-white flex items-center"}>
          <Avatar size={40} />
          <input
            value={myComment}
            onChange={(e) => setMyComment(e.target.value)}
            className={
              "outline-none text-[16px] flex items-center flex-1 bg-none"
            }
            placeholder={"Написать комментарий..."}
          />

          <Button
            onClick={publishComment}
            disabled={!Boolean(myComment)}
            className={"px-[20px]"}>
            Опубликовать
          </Button>
        </section>
      )}
    </section>
  )
}
