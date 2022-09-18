import { useEffect, useMemo, useState } from "react"
import type { News as TNews } from "shared/types"
import { getNewsByThemeId } from "services/api"
import { AxiosListResponse } from "services/api/config"
import { News } from "shared/components/templates"
import { EmptyState, PostLoading } from "shared/components/molecules"
import { useRouter } from "next/router"

export const NewsTab = () => {
  const [news, setNews] = useState<TNews[]>([])
  const [isLoading, setLoading] = useState(true)

  const router = useRouter()

  const isEmpty = useMemo(() => news.length === 0, [news])

  useEffect(() => {
    if (router.query.id) {
      getNewsByThemeId(Number(router.query.id)).then(
        (res: AxiosListResponse<TNews>) => {
          const { results } = res.data
          setNews(results)
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
