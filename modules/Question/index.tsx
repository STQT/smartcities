import { Page } from "shared/components/templates"
import { Question } from "shared/types"
import { useEffect, useState } from "react"
import { getFullQuestion, likeQuestion, unlikeQuestion } from "services/api"
import { AxiosResponse } from "axios"
import Image from "next/image"
import { CommentsSection, PostLoading } from "shared/components/molecules"
import { Comment, Like, Tag, Views } from "shared/components/atoms"
import { useAppSelector } from "../../store"

interface QuestionPageProps {
  id: string
}

export const QuestionPage = ({ id }: QuestionPageProps) => {
  const { user } = useAppSelector((state) => state.main)
  const [question, setQuestion] = useState<Question>()
  const [isLoading, setLoading] = useState(true)

  const handleAfterLoad = () => {
    setLoading(false)
  }

  useEffect(() => {
    if (id) {
      getFullQuestion(id).then((res: AxiosResponse<Question>) => {
        setQuestion(res.data)
        handleAfterLoad()
      })
    }
  }, [id])

  const updateCommentsCount = () => {
    setQuestion((prev) => {
      if (prev) {
        return {
          ...prev,
          comments_count: prev.comments_count + 1
        }
      }
    })
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
    <Page title={question?.title as string}>
      <main className={"flex-1 flex-col rounded-[20px]"}>
        <PostLoading isLoading={isLoading} />

        {!isLoading && question && (
          <section className={"bg-white py-[20px] rounded-[20px]"}>
            <section className={"px-[20px] flex flex-col border-b pb-4"}>
              <h1 className={"text-[20px] font-semibold mb-6"}>
                {question.title}
              </h1>

              {question.tags.length > 0 && (
                <section className={"flex gap-2 mt-4 mb-[40px]"}>
                  {question?.tags.map((tag) => (
                    <Tag key={tag.id} {...tag} />
                  ))}
                </section>
              )}

              {question.image && (
                <section
                  className={
                    "max-w-full h-[500px] my-[20px] rounded-[10px] overflow-hidden relative"
                  }>
                  <Image
                    className={"max-w-full h-full object-cover"}
                    src={`https://api.smartcities.uz${question.image}`}
                    layout={"fill"}
                  />
                </section>
              )}

              <p className={"text-[18px]"}>{question.description}</p>
            </section>

            <section className={"p-[20px] pb-0 flex gap-5"}>
              <Like
                is_liked={question.is_liked}
                like_count={question.like_count}
                onUnlike={onUnlikeQuestion}
                onLike={onQuestionLike}
              />
              <Views views_count={question.view_count} />
              <Comment comments_count={question.comments_count} />
            </section>
          </section>
        )}

        {question && (
          <CommentsSection
            commentPostedCallback={updateCommentsCount}
            comments_count={question.comments_count}
            type={"QUESTION"}
            id={question.id}
          />
        )}

        <section className={"mt-32"}></section>
      </main>
    </Page>
  )
}
