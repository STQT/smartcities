import Image from "next/image"
import { Article as TArticle } from "shared/types"
import { Comment, Like, Tag, Views } from "../../atoms"
import { useMemo } from "react"
import { addBaseURL } from "../../../utils"
import { useRouter } from "next/router"

interface ArticleProps {
  article: TArticle
}

export const Article = ({ article }: ArticleProps) => {
  const router = useRouter()

  const imageURL = useMemo(
    () => article && addBaseURL(article.image),
    [article]
  )

  const handleReadMore = () => {
    router.push({
      pathname: "/article/[id]",
      query: {
        id: article.id
      }
    })
  }

  return (
    <article className={"rounded-[20px] bg-white px-[20px] py-[32px]"}>
      <section className={"flex flex-col"}>
        <h1 className={"text-blue text-[18px]"}>{article.title}</h1>
        {article.image && (
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
        <p className={"text-[16px] mb-[20px]"}>{article.description}</p>

        {article.tags.length > 0 && (
          <section className={"mt-[10px] flex gap-2"}>
            {article.tags.map((tag) => (
              <Tag key={tag.id} {...tag} />
            ))}
          </section>
        )}

        <section className={"mt-auto flex w-full items-end justify-between"}>
          <section className={"flex items-center gap-[40px]"}>
            <Like is_liked={article.is_liked} like_count={article.like_count} />
            <Views views_count={article.view_count} />
            <Comment comments_count={article.comments_count} />
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
