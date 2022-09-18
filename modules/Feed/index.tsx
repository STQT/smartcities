import { News, Page } from "shared/components/templates"
import { useEffect, useState } from "react"
import { getNews } from "services/api"
import { News as TNews } from "shared/types"
import { AxiosListResponse } from "services/api/config"
import { PostLoading } from "shared/components/molecules"

export const FeedPage = () => {
  const [news, setNews] = useState<TNews[]>([])
  const [isLoading, setLoading] = useState(true)

  const handleAfterLoad = () => {
    setLoading(false)
  }

  useEffect(() => {
    getNews().then((res: AxiosListResponse<TNews>) => {
      setNews(res.data.results)
      handleAfterLoad()
    })
  }, [])

  return (
    <Page withAside={true} title={"Лента"}>
      <main className={"flex-1 flex flex-col gap-[20px]"}>
        <PostLoading isLoading={isLoading} />
        {!isLoading && news.map((news) => <News key={news.id} news={news} />)}
      </main>
    </Page>
  )
}
