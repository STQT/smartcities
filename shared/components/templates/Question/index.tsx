import type { Question as TQuestion } from "shared/types"
import { Comment, Like, Tag, Views } from "../../atoms"
import { useMemo } from "react"
import Image from "next/image"
import { addBaseURL } from "shared/utils"
import { useRouter } from "next/router"
import { useAppSelector } from "store"
import { likeQuestion, unlikeQuestion } from "services/api"

interface QuestionProps {
  question: TQuestion
}

export const Question = ({ question }: QuestionProps) => {
  const { user } = useAppSelector((state) => state.main)
  const router = useRouter()

  const imageURL = useMemo(
    () => question && addBaseURL(question.image),
    [question]
  )

  const handleReadMore = () => {
    router.push({ pathname: "/question/[id]", query: { id: question.id } })
  }

  const onQuestionLike = () => {
    if (user && question) {
      likeQuestion(user.id, question.id).then(() => {})
    }
  }

  const onUnlikeQuestion = () => {
    if (user && question) {
      unlikeQuestion(user.id, question.id).then(() => {})
    }
  }

  return (
    <article className={"rounded-[20px] bg-white px-[20px] py-[32px]"}>
      <section className={"flex flex-col"}>
        <h1
          onClick={handleReadMore}
          className={"text-blue mb-4 font-semibold text-[20px]"}>
          {question.title}
        </h1>
        {question && question.image && (
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
        <p className={"text-[16px] mb-[20px]"}>{question.description}</p>

        {question.tags.length > 0 && (
          <section className={"mt-[10px] flex gap-2"}>
            {question.tags.map((tag) => (
              <Tag key={tag.id} {...tag} />
            ))}
          </section>
        )}

        <section className={"mt-auto flex w-full items-end justify-between"}>
          <section className={"flex items-center gap-[40px]"}>
            <Like
              like_count={question.like_count}
              is_liked={question.is_liked}
              onUnlike={onUnlikeQuestion}
              onLike={onQuestionLike}
            />
            <Views views_count={question.view_count} />
            <Comment comments_count={question.comments_count} />
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
