import { useEffect, useMemo, useState } from "react"
import { useRouter } from "next/router"

import { AxiosListResponse } from "services/api/config"
import { NEWS } from "services/api"

import { EmptyState, PostLoading } from "shared/components/molecules"
import { Post } from "shared/components/templates"
import type { Post as TPost } from "shared/types"

export const NewsTab = () => {
  const [news, setNews] = useState<TPost[]>([])
  const [isLoading, setLoading] = useState(true)

  const router = useRouter()

  const isEmpty = useMemo(() => news.length === 0, [news])

  useEffect(() => {
    if (router.query.id) {
      NEWS.getListByThemeId(Number(router.query.id)).then(
        (res: AxiosListResponse<TPost>) => {
          setNews(res.data.results)
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
            <Post key={news.id} targetPost={news} />
          ))}
        </section>
      )}
    </main>
  )
}
