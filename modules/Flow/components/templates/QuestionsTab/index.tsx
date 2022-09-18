import { useEffect, useMemo, useState } from "react"
import type { Question as TQuestion } from "shared/types"
import { getQuestionsByThemeId } from "services/api"
import { AxiosListResponse } from "services/api/config"
import { Question } from "shared/components/templates"
import { EmptyState, PostLoading } from "shared/components/molecules"
import { useRouter } from "next/router"

export const QuestionsTab = () => {
  const [questions, setQuestions] = useState<TQuestion[]>([])
  const [isLoading, setLoading] = useState(true)

  const router = useRouter()

  const isEmpty = useMemo(() => questions.length === 0, [questions])

  useEffect(() => {
    if (router.query.id) {
      getQuestionsByThemeId(Number(router.query.id)).then(
        (res: AxiosListResponse<TQuestion>) => {
          const { results } = res.data
          setQuestions(results)
          setLoading(false)
        }
      )
    }
  }, [router.query.id])

  return (
    <main>
      <section className={"h-12 rounded-b-[20px] bg-white"}></section>

      <PostLoading className={"mt-6"} isLoading={isLoading} />
      {!isLoading && (
        <EmptyState
          caption={"Нету вопросов"}
          className={"mt-6"}
          isEmpty={isEmpty}
        />
      )}

      {!isLoading && questions.length > 0 && (
        <section className={"flex flex-col gap-5 mt-5"}>
          {questions.map((question) => (
            <Question key={question.id} question={question} />
          ))}
        </section>
      )}
    </main>
  )
}
