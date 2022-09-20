import { useEffect, useMemo, useState } from "react"

import { AxiosListResponse } from "services/api/config"
import type { Post as TPost } from "shared/types"
import { NEWS } from "services/api"

import { EmptyState, PostLoading } from "shared/components/molecules"
import { Post } from "shared/components/templates"

export const NewsTab = ({ query }: { query: string }) => {
  const [news, setNews] = useState<TPost[]>([])
  const [isLoading, setLoading] = useState(true)

  const isEmpty = useMemo(() => {
    return news.length === 0
  }, [news])

  useEffect(() => {
    if (query) {
      NEWS.search(query).then((res: AxiosListResponse<TPost>) => {
        setNews(res.data.results)
        setLoading(false)
      })
    }
  }, [query])

  useEffect(() => {
    NEWS.getList().then((res: AxiosListResponse<TPost>) => {
      setNews(res.data.results)
      setLoading(false)
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
            <Post type={"NEWS"} key={news.id} targetPost={news} />
          ))}
        </section>
      )}
    </main>
  )
}
