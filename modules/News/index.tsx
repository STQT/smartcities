import { Page } from "shared/components/templates"
import { News } from "shared/types"
import { useEffect, useState } from "react"
import { getFullNews } from "services/api"
import { AxiosResponse } from "axios"
import Image from "next/image"
import { CommentsSection, PostLoading } from "shared/components/molecules"
import { Comment, Like, Tag, Views } from "shared/components/atoms"

interface NewsPageProps {
  id: string
}

export const NewsPage = ({ id }: NewsPageProps) => {
  const [news, setNews] = useState<News>()
  const [isLoading, setLoading] = useState(true)

  const handleAfterLoad = () => {
    setLoading(false)
  }

  useEffect(() => {
    if (id) {
      getFullNews(id).then((res: AxiosResponse<News>) => {
        setNews(res.data)
        handleAfterLoad()
      })
    }
  }, [id])

  const updateCommentsCount = () => {
    setNews((prev) => {
      if (prev) {
        return {
          ...prev,
          comments_count: prev.comments_count + 1
        }
      }
    })
  }

  return (
    <Page title={news?.title as string}>
      <main className={"flex-1 rounded-[20px]"}>
        <PostLoading isLoading={isLoading} />

        {!isLoading && news && (
          <section className={"bg-white py-[20px] rounded-[20px]"}>
            <section className={"px-[20px] flex flex-col border-b pb-4"}>
              <h1 className={"text-[18px] font-semibold"}>{news.title}</h1>

              {news.tags.length > 0 && (
                <section className={"flex gap-2 mt-4 mb-[40px]"}>
                  {news?.tags.map((tag) => (
                    <Tag key={tag.id} {...tag} />
                  ))}
                </section>
              )}

              {news.image && (
                <section
                  className={
                    "max-w-full h-[500px] my-[20px] rounded-[10px] overflow-hidden relative"
                  }>
                  <Image
                    className={"max-w-full h-full object-cover"}
                    src={`https://api.smartcities.uz${news.image}`}
                    layout={"fill"}
                  />
                </section>
              )}

              <p className={"text-[18px]"}>{news.description}</p>
            </section>

            <section className={"p-[20px] pb-0 flex gap-5"}>
              <Like is_liked={news.is_liked} like_count={news.like_count} />
              <Views views_count={news.view_count} />
              <Comment comments_count={news.comments_count} />
            </section>
          </section>
        )}

        {news && (
          <CommentsSection
            commentPostedCallback={updateCommentsCount}
            comments_count={news.comments_count}
            type={"NEWS"}
            id={news.id}
          />
        )}
      </main>
    </Page>
  )
}
