import { useEffect, useMemo, useState } from "react"
import type { News as TNews } from "shared/types"
import { getNews, searchNews } from "services/api"
import { AxiosListResponse } from "services/api/config"
import { News } from "shared/components/templates"
import { EmptyState, PostLoading } from "shared/components/molecules"
import { Article as TArticle } from "shared/types"

export const NewsTab = ({ query }: { query: string }) => {
  const [news, setNews] = useState<TNews[]>([])
  const [isLoading, setLoading] = useState(true)
  const isEmpty = useMemo(() => news.length === 0, [news])

  useEffect(() => {
    if (query) {
      searchNews(query).then((res: AxiosListResponse<TArticle>) => {
        setNews(res.data.results)
        setLoading(false)
      })
    }
  }, [query])

  useEffect(() => {
    getNews().then((res: AxiosListResponse<TNews>) => {
      setLoading(false)
      setNews(res.data.results)
    })
  }, [])

  return (
    <main>
      <section className={"h-12 rounded-b-[20px] bg-white"}></section>

      <PostLoading className={"mt-6"} isLoading={isLoading} />
      {!isLoading && (
        <EmptyState
          caption={"Нету новостей"}
          className={"mt-6"}
          isEmpty={isEmpty}
        />
      )}

      {!isLoading && news.length > 0 && (
        <section className={"flex flex-col gap-5 mt-5"}>
          {news.map((news) => (
            <News key={news.id} news={news} />
          ))}
        </section>
      )}
    </main>
  )
}
