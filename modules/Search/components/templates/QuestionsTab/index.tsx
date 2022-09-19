import { useEffect, useMemo, useState } from "react"
import type { Question as TQuestion } from "shared/types"
import { getQuestions, searchQuestions } from "services/api"
import { AxiosListResponse } from "services/api/config"
import { Question } from "shared/components/templates"
import { EmptyState, PostLoading } from "shared/components/molecules"
import { Article as TArticle } from "shared/types"

export const QuestionsTab = ({ query }: { query: string }) => {
  const [questions, setQuestions] = useState<TQuestion[]>([])
  const [isLoading, setLoading] = useState(true)
  const isEmpty = useMemo(() => questions.length === 0, [questions])

  useEffect(() => {
    if (query) {
      searchQuestions(query).then((res: AxiosListResponse<TArticle>) => {
        setQuestions(res.data.results)
        setLoading(false)
      })
    }
  }, [query])

  useEffect(() => {
    getQuestions().then((res: AxiosListResponse<TQuestion>) => {
      setQuestions(res.data.results)
      setLoading(false)
    })
  }, [])

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
