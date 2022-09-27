import { useEffect, useMemo, useState } from "react"
import type { Post as TPost } from "shared/types"
import { ARTICLE } from "services/api"

import { EmptyState, PostLoading } from "shared/components/molecules"
import { Post } from "shared/components/templates"

export const ArticlesTab = ({ query }: { query: string }) => {
  const [articles, setArticles] = useState<TPost[]>([])
  const [isLoading, setLoading] = useState(true)

  const isEmpty = useMemo(() => {
    return articles.length === 0
  }, [articles])

  useEffect(() => {
    if (query) {
      ARTICLE.search(query).then((res) => {
        setArticles(res.data.results)
        setLoading(false)
      })
    }
  }, [query])

  useEffect(() => {
    ARTICLE.getList().then((res) => {
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
            <Post key={article.id} targetPost={article} />
          ))}
        </section>
      )}
    </main>
  )
}
