import { useEffect, useMemo, useState } from "react"
import type { Article as TArticle } from "shared/types"
import { getArticles, searchArticles } from "services/api"
import { AxiosListResponse } from "services/api/config"
import { Article } from "shared/components/templates"
import { EmptyState, PostLoading } from "shared/components/molecules"

export const ArticlesTab = ({ query }: { query: string }) => {
  const [articles, setArticles] = useState<TArticle[]>([])
  const [isLoading, setLoading] = useState(true)

  const isEmpty = useMemo(() => {
    return articles.length === 0
  }, [articles])

  useEffect(() => {
    if (query) {
      searchArticles(query).then((res: AxiosListResponse<TArticle>) => {
        const { results } = res.data
        setArticles(results)
        setLoading(false)
      })
    }
  }, [query])

  useEffect(() => {
    getArticles().then((res: AxiosListResponse<TArticle>) => {
      setArticles(res.data.results)
      setLoading(false)
    })
  }, [])

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
            <Article key={article.id} article={article} />
          ))}
        </section>
      )}
    </main>
  )
}
