import { useEffect, useMemo, useState } from "react"

import type { Post as TPost } from "shared/types"
import { NEWS } from "services/api"

import { EmptyState, PostLoading } from "shared/components/molecules"
import { Post } from "shared/components/templates"
import { useTranslation } from "next-export-i18n"

export const NewsTab = ({ query }: { query: string }) => {
  const [news, setNews] = useState<TPost[]>([])
  const [isLoading, setLoading] = useState(true)
  const { t } = useTranslation()

  const isEmpty = useMemo(() => {
    return news.length === 0
  }, [news])

  useEffect(() => {
    if (query) {
      NEWS.search(query).then((res) => {
        setNews(res.data.results)
        setLoading(false)
      })
    } else {
      setLoading(false)
      setNews([])
    }
  }, [query])

  return (
    <main>
      <PostLoading className={"mt-6"} isLoading={isLoading} />
      {!isLoading && (
        <EmptyState
          caption={t("news_not_found")}
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
