import { useEffect, useMemo, useState } from "react"

import type { Post as TPost } from "shared/types"
import { QUESTION } from "services/api"

import { EmptyState, PostLoading } from "shared/components/molecules"
import { Post } from "shared/components/templates"
import { useTranslation } from "next-export-i18n"

export const QuestionsTab = ({ query }: { query: string }) => {
  const [questions, setQuestions] = useState<TPost[]>([])
  const [isLoading, setLoading] = useState(true)
  const { t } = useTranslation()

  const isEmpty = useMemo(() => {
    return questions.length === 0
  }, [questions])

  useEffect(() => {
    if (query) {
      QUESTION.search(query).then((res) => {
        setQuestions(res.data.results)
        setLoading(false)
      })
    }
  }, [query])

  useEffect(() => {
    QUESTION.getList().then((res) => {
      setQuestions(res.data.results)
      setLoading(false)
    })
  }, [])

  return (
    <main>
      <PostLoading className={"mt-6"} isLoading={isLoading} />
      {!isLoading && (
        <EmptyState
          caption={t("questions_not_found")}
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
