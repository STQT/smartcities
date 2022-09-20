import { Page } from "shared/components/templates"
import { useEffect, useState } from "react"

import { PostLoading } from "shared/components/molecules"
import { Post } from "shared/components/templates"
import type { Post as TPost } from "shared/types"

import { AxiosListResponse } from "services/api/config"
import { NEWS } from "services/api"

export const FeedPage = () => {
  const [news, setNews] = useState<TPost[]>([])
  const [isLoading, setLoading] = useState(true)

  const handleAfterLoad = () => {
    setLoading(false)
  }

  useEffect(() => {
    NEWS.getList().then((res: AxiosListResponse<TPost>) => {
      setNews(res.data.results)
      handleAfterLoad()
    })
  }, [])

  return (
    <Page withAside={true} title={"Лента"}>
      <main className={"flex-1 flex flex-col gap-[20px]"}>
        <PostLoading isLoading={isLoading} />
        {!isLoading &&
          news.map((news) => (
            <Post key={news.id} targetPost={news} type={"NEWS"} />
          ))}
      </main>
    </Page>
  )
}
