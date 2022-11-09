import { useEffect, useMemo, useState } from "react"
import { useRouter } from "next/router"

import { AxiosListResponse } from "services/api/config"
import { NEWS, QUESTION } from "services/api"

import { EmptyState, PostLoading } from "shared/components/molecules"
import { Post } from "shared/components/templates"
import type { Post as TPost } from "shared/types"
import { Button } from "../../../../../shared/components/atoms"
import { useTranslation } from "next-export-i18n"

export const QuestionsTab = () => {
  const [questions, setQuestions] = useState<TPost[]>([])
  const [isLoading, setLoading] = useState(true)
  const { t } = useTranslation()

  const [questionsCount, setQuestionsCount] = useState(0)
  const [page, setPage] = useState(1)

  const router = useRouter()

  const isEmpty = useMemo(() => questions.length === 0, [questions])

  const handleLoadMore = () => {
    setPage((prev) => prev + 1)
  }

  useEffect(() => {
    if (router.query.id) {
      setQuestions([])
      setLoading(true)

      QUESTION.getListByThemeId(Number(router.query.id)).then(
        (res: AxiosListResponse<TPost>) => {
          setQuestions(res.data.results)
          setQuestionsCount(res.data.count)
          setLoading(false)
        }
      )
    }
  }, [router.query])

  useEffect(() => {
    if (router.query.id) {
      QUESTION.getListByThemeId(Number(router.query.id), page).then(
        (res: AxiosListResponse<TPost>) => {
          setQuestions((prev) => [...prev, ...res.data.results])
        }
      )
    }
  }, [page])

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

      {!isLoading && questions.length < questionsCount && (
        <Button onClick={handleLoadMore}>{t("load_more")}</Button>
      )}
    </main>
  )
}
