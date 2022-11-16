import { useEffect, useMemo, useState } from "react"
import type { Post as TPost } from "shared/types"
import { ARTICLE } from "services/api"

import { EmptyState, PostLoading } from "shared/components/molecules"
import { Post } from "shared/components/templates"
import { useTranslation } from "next-export-i18n"

export const ArticlesTab = ({ query }: { query: string }) => {
  const [articles, setArticles] = useState<TPost[]>([])
  const [isLoading, setLoading] = useState(true)
  const { t } = useTranslation()

  const isEmpty = useMemo(() => {
    return articles.length === 0
  }, [articles])

  useEffect(() => {
    if (query) {
      ARTICLE.search(query).then((res) => {
        setArticles(res.data.results)
        setLoading(false)
      })
    } else {
      setLoading(false)
      setArticles([])
    }
  }, [query])

  return (
    <main>
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
    </main>
  )
}
