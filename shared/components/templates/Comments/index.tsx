import { Fragment, useEffect, useState } from "react"
import moment from "moment"

import { Avatar, Button } from "shared/components/atoms"
import type { Comment as TComment, PostTypes } from "shared/types"
import { useAppSelector } from "store"

import { ARTICLE, NEWS, QUESTION } from "services/api"

// @ts-ignore
import Editor from "react-medium-editor"
import "medium-editor/dist/css/medium-editor.css"
import "medium-editor/dist/css/themes/default.css"

const Comment = ({ user, comment, created_at }: TComment) => {
  return (
    <article className={"flex flex-col"}>
      <div className={"flex gap-2 items-center mb-[20px]"}>
        <Avatar size={40} />

        <div className={"flex text-blue text-[18px] items-center"}>
          {user.first_name} {user.last_name}
          <span className={"ml-2 text-[14px] font-normal text-gray-400"}>
            {moment(created_at).calendar()}
          </span>
        </div>
      </div>

      <div
        className={"text-[14px]"}
        dangerouslySetInnerHTML={{ __html: comment }}
      />
    </article>
  )
}

interface CommentsProps {
  comments_count: number
  type: PostTypes
  id: number

  commentPostedCallback?: () => void
}
export const Comments = ({
  commentPostedCallback,
  comments_count,
  type,
  id
}: CommentsProps) => {
  const { user, isLoggedIn } = useAppSelector((state) => state.main)
  const [comments, setComments] = useState<TComment[]>([])
  const [myComment, setMyComment] = useState("")

  useEffect(() => {
    switch (type) {
      case "ARTICLE":
        fetchAndSetArticleComments(id)
        break

      case "NEWS":
        fetchAndSetNewsComments(id)
        break

      case "QUESTION":
        fetchAndSetQuestionComments(id)
        break
    }
  }, [type, id])

  const fetchAndSetArticleComments = (id: number) => {
    if (type === "ARTICLE") {
      ARTICLE.COMMENTS.getCommentsList(id).then((res) => {
        setComments(res.data.results)
      })
    }
  }

  const fetchAndSetNewsComments = (id: number) => {
    if (type === "NEWS") {
      NEWS.COMMENTS.getCommentsList(id).then((res) => {
        setComments(res.data.results)
      })
    }
  }

  const fetchAndSetQuestionComments = (id: number) => {
    if (type === "QUESTION") {
      QUESTION.COMMENTS.getCommentsList(id).then((res) => {
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
      ARTICLE.COMMENTS.postComment({
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
      NEWS.COMMENTS.postComment({
        ...payload,
        created_at: new Date().toString(),
        news: id
      }).then(() => {
        fetchAndSetNewsComments(id)
        setMyComment("")

        commentPostedCallback?.()
      })
    }

    if (type === "QUESTION") {
      QUESTION.COMMENTS.postComment({
        ...payload,
        created_at: new Date().toString(),
        question: id
      }).then(() => {
        fetchAndSetQuestionComments(id)
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
          className={
            "p-[20px] border-t relative gap-[10px] bg-white flex items-center"
          }>
          <Avatar size={40} />

          <Editor
            spellCheck={false}
            text={myComment}
            className={"flex-1 flex items-center outline-none text-[16px]"}
            options={{
              toolbar: { buttons: ["bold", "italic", "underline"] },
              spellcheck: false,
              placeholder: {
                text: "Написать комментарий..."
              }
            }}
            onChange={(e: string) => {
              setMyComment(e)
            }}
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
