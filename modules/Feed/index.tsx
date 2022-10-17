import { Page } from "shared/components/templates"
import { useEffect, useState } from "react"

import { PostLoading } from "shared/components/molecules"
import { Post } from "shared/components/templates"
import type { Post as TPost } from "shared/types"

import { AxiosListResponse } from "services/api/config"
import { NEWS } from "services/api"
import { Button } from "../../shared/components/atoms"

export const FeedPage = () => {
  const [news, setNews] = useState<TPost[]>([])
  const [isLoading, setLoading] = useState(true)

  const [newsCount, setNewsCount] = useState(0)
  const [page, setPage] = useState(1)

  const handleAfterLoad = () => {
    setLoading(false)
  }

  const handleLoadMore = () => {
    setPage((prev) => prev + 1)
  }

  useEffect(() => {
    NEWS.getList().then((res: AxiosListResponse<TPost>) => {
      setNews(res.data.results)
      setNewsCount(res.data.count)
      handleAfterLoad()
    })
  }, [])

  useEffect(() => {
    NEWS.getList(page).then((res: AxiosListResponse<TPost>) => {
      setNews((prev) => [...prev, ...res.data.results])
    })
  }, [page])

  return (
    <Page withAside={true} title={"Лента"}>
      <main className={"flex-1 flex flex-col gap-[20px]"}>
        <PostLoading isLoading={isLoading} />
        {!isLoading &&
          news.map((news) => <Post key={news.id} targetPost={news} />)}
        {news.length < newsCount && (
          <Button onClick={handleLoadMore}>Загрузить еще</Button>
        )}
      </main>
    </Page>
  )
}
