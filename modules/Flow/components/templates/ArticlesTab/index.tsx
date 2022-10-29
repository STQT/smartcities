import { useEffect, useMemo, useState } from "react"
import { useRouter } from "next/router"

import { AxiosListResponse } from "services/api/config"
import { ARTICLE, NEWS } from "services/api"

import { EmptyState, PostLoading } from "shared/components/molecules"
import { Post } from "shared/components/templates"
import type { Post as TPost } from "shared/types"
import { Button } from "../../../../../shared/components/atoms"
import { useTranslation } from "next-export-i18n"

export const ArticlesTab = () => {
  const [articles, setArticles] = useState<TPost[]>([])
  const [isLoading, setLoading] = useState(true)
  const { t } = useTranslation()

  const [articlesCount, setArticlesCount] = useState(0)
  const [page, setPage] = useState(1)

  const router = useRouter()

  const isEmpty = useMemo(() => articles.length === 0, [articles])

  const handleLoadMore = () => {
    setPage((prev) => prev + 1)
  }

  useEffect(() => {
    if (router.query.id) {
      ARTICLE.getListByThemeId(Number(router.query.id)).then(
        (res: AxiosListResponse<TPost>) => {
          setArticles(res.data.results)
          setArticlesCount(res.data.count)
          setLoading(false)
        }
      )
    }
  }, [router.query.id])

  useEffect(() => {
    if (router.query.id) {
      ARTICLE.getListByThemeId(Number(router.query.id), page).then(
        (res: AxiosListResponse<TPost>) => {
          setArticles((prev) => [...prev, ...res.data.results])
        }
      )
    }
  }, [page])

  return (
    <main>
      <section className={"h-6 rounded-b-[20px] bg-white"}></section>

      <PostLoading className={"mt-6"} isLoading={isLoading} />
      {!isLoading && (
        <EmptyState
          caption={t("articles_not_found")}
          className={"mt-6"}
          isEmpty={isEmpty}
        />
      )}

      {!isLoading && articles.length > 0 && (
        <section className={"flex flex-col gap-5 mt-5"}>
          {articles.map((article) => (
            <Post key={article.id} targetPost={article} />
          ))}
        </section>
      )}

      {articles.length < articlesCount && (
        <Button onClick={handleLoadMore}>{t("load_more")}</Button>
      )}
    </main>
  )
}
