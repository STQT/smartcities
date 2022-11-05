import { useEffect, useState } from "react"
import { Post as TPost } from "shared/types"
import { NEWS } from "services/api"
import { AxiosListResponse } from "services/api/config"
import { Button } from "shared/components/atoms"
import { useTranslation } from "next-export-i18n"
import { PostLoading } from "shared/components/atoms/PostLoading"
import { Post } from "shared/components/templates"

export const NewsTab = () => {
  const { t } = useTranslation()

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
    <section className={"flex flex-col gap-4"}>
      <PostLoading isLoading={isLoading} />

      {!isLoading &&
        news.map((news) => <Post key={news.id} targetPost={news} />)}

      {news.length < newsCount && (
        <Button className={"w-full mt-4"} onClick={handleLoadMore}>
          {t("load_more")}
        </Button>
      )}
    </section>
  )
}
