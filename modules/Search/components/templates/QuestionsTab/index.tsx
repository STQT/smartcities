import { useEffect, useMemo, useState } from "react"

import { AxiosListResponse } from "services/api/config"
import type { Post as TPost } from "shared/types"
import { QUESTION } from "services/api"

import { EmptyState, PostLoading } from "shared/components/molecules"
import { Post } from "shared/components/templates"

export const QuestionsTab = ({ query }: { query: string }) => {
  const [questions, setQuestions] = useState<TPost[]>([])
  const [isLoading, setLoading] = useState(true)

  const isEmpty = useMemo(() => {
    return questions.length === 0
  }, [questions])

  useEffect(() => {
    if (query) {
      QUESTION.search(query).then((res: AxiosListResponse<TPost>) => {
        setQuestions(res.data.results)
        setLoading(false)
      })
    }
  }, [query])

  useEffect(() => {
    QUESTION.getList().then((res: AxiosListResponse<TPost>) => {
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
            <Post key={question.id} targetPost={question} />
          ))}
        </section>
      )}
    </main>
  )
}
