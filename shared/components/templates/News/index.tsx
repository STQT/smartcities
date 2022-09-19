import Image from "next/image"
import type { News as TNews } from "shared/types"
import { Comment, Like, Tag, Views } from "../../atoms"
import { useRouter } from "next/router"
import { addBaseURL } from "shared/utils"
import { useMemo } from "react"
import { likeNews, unlikeNews } from "services/api"
import { useAppSelector } from "store"

interface NewsProps {
  news: TNews
}

export const News = ({ news }: NewsProps) => {
  const { user } = useAppSelector((state) => state.main)
  const router = useRouter()

  const handleReadMore = () => {
    router.push({ pathname: "/news/[id]", query: { id: news.id } })
  }

  const imageURL = useMemo(() => news && addBaseURL(news.image), [news])

  const onNewsLike = () => {
    if (user && news) {
      likeNews(user.id, news.id).then(() => {})
    }
  }

  const onUnlikeNews = () => {
    if (user && news) {
      unlikeNews(user.id, news.id).then(() => {})
    }
  }

  return (
    <article className={"rounded-[20px] bg-white px-[20px] py-[32px]"}>
      <section className={"flex flex-col"}>
        <h1
          onClick={handleReadMore}
          className={"text-blue mb-4 font-semibold text-[20px]"}>
          {news.title}
        </h1>
        {news && news.image && (
          <div
            className={
              "max-w-full h-[350px] w-full relative overflow-hidden rounded-[10px] my-[20px]"
            }>
            <Image
              src={imageURL as string}
              layout={"fill"}
              className={"max-w-full h-full object-cover"}
            />
          </div>
        )}
        <p className={"text-[16px] mb-[20px]"}>{news.description}</p>

        {news.tags.length > 0 && (
          <section className={"mt-[10px] flex gap-2"}>
            {news.tags.map((tag) => (
              <Tag key={tag.id} {...tag} />
            ))}
          </section>
        )}

        <section className={"mt-auto flex w-full items-end justify-between"}>
          <section className={"flex items-center gap-[40px]"}>
            <Like
              like_count={news.like_count}
              is_liked={news.is_liked}
              onUnlike={onUnlikeNews}
              onLike={onNewsLike}
            />
            <Views views_count={news.view_count} />
            <Comment comments_count={news.comments_count} />
          </section>

          <button
            onClick={handleReadMore}
            className={
              "px-[20px] py-[16px] text-blue border border-blue rounded-[10px] transition-all hover:bg-blue hover:text-white"
            }>
            Читать далее
          </button>
        </section>
      </section>
    </article>
  )
}
