import { Comment, Like, Views } from "../../atoms"
import { Article as TArticle } from "../../../types"
import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "store"
import { fetchReadingNow } from "store/slices/main"
import Link from "next/link"

interface ArticleProps {
  article: TArticle
}

const Article = ({ article }: ArticleProps) => {
  return (
    <article
      className={
        "mt-[20px] flex flex-col gap-[20px] pb-[12px] border-b-[0.5px] border-gray-300/30"
      }>
      <Link href={{ pathname: "/article/[id]", query: { id: article.id } }}>
        <span
          className={
            "text-[16px] cursor-pointer transition-all hover:text-blue"
          }>
          {article.title}
        </span>
      </Link>

      <div className={"flex items-center gap-6 text-gray-300"}>
        <Like is_liked={article.is_liked} like_count={article.like_count} />
        <Views views_count={article.view_count} />
        <Comment comments_count={article.comments_count} />
      </div>
    </article>
  )
}

export const ReadingNow = () => {
  const { readingNow } = useAppSelector((state) => state.main)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchReadingNow())
  }, [])

  return (
    <section className={"bg-white rounded-[20px] w-full"}>
      <div className={"py-[20px] border-b-[0.5px] border-gray-300/30"}>
        <h2 className={"text-blue text-[18px] ml-[20px] font-semibold"}>
          Читают сейчас
        </h2>
      </div>

      <div className={"flex flex-col px-[20px]"}>
        {readingNow.length > 0 &&
          readingNow.map((article) => (
            <Article key={article.id} article={article} />
          ))}
      </div>
    </section>
  )
}
