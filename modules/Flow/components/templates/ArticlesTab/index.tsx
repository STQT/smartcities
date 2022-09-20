import { useEffect, useMemo, useState } from "react"
import { useRouter } from "next/router"

import { AxiosListResponse } from "services/api/config"
import { ARTICLE } from "services/api"

import { EmptyState, PostLoading } from "shared/components/molecules"
import { Post } from "shared/components/templates"
import type { Post as TPost } from "shared/types"

export const ArticlesTab = () => {
  const [articles, setArticles] = useState<TPost[]>([])
  const [isLoading, setLoading] = useState(true)

  const router = useRouter()

  const isEmpty = useMemo(() => articles.length === 0, [articles])

  useEffect(() => {
    if (router.query.id) {
      ARTICLE.getListByThemeId(Number(router.query.id)).then(
        (res: AxiosListResponse<TPost>) => {
          setArticles(res.data.results)
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
          caption={"Нету статей"}
          className={"mt-6"}
          isEmpty={isEmpty}
        />
      )}

      {!isLoading && articles.length > 0 && (
        <section className={"flex flex-col gap-5 mt-5"}>
          {articles.map((article) => (
            <Post type={"ARTICLE"} key={article.id} targetPost={article} />
          ))}
        </section>
      )}
    </main>
  )
}
