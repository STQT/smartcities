import { Page } from "shared/components/templates"
import { Article } from "shared/types"
import { useEffect, useState } from "react"
import { getFullArticle, likeArticle } from "services/api"
import { AxiosResponse } from "axios"
import Image from "next/image"
import { CommentsSection, PostLoading } from "shared/components/molecules"
import { Comment, Like, Tag, Views } from "shared/components/atoms"
import { useAppSelector } from "../../store"

interface ArticlePageProps {
  id: string
}

export const ArticlePage = ({ id }: ArticlePageProps) => {
  const { user } = useAppSelector((state) => state.main)
  const [article, setArticle] = useState<Article>()
  const [isLoading, setLoading] = useState(true)

  const handleAfterLoad = () => {
    setLoading(false)
  }

  useEffect(() => {
    if (id) {
      getFullArticle(id).then((res: AxiosResponse<Article>) => {
        setArticle(res.data)
        handleAfterLoad()
      })
    }
  }, [id])

  const updateCommentsCount = () => {
    setArticle((prev) => {
      if (prev) {
        return {
          ...prev,
          comments_count: prev.comments_count + 1
        }
      }
    })
  }

  const onArticleLike = () => {
    if (user && article) {
      likeArticle(user.id, article.id).then((res) => {})
    }
  }

  return (
    <Page title={article?.title as string}>
      <main className={"flex-1 flex-col rounded-[20px]"}>
        <PostLoading isLoading={isLoading} />

        {!isLoading && article && (
          <section className={"bg-white py-[20px] rounded-[20px]"}>
            <section className={"px-[20px] flex flex-col border-b pb-4"}>
              <h1 className={"text-[18px] font-semibold"}>{article.title}</h1>

              {article.tags.length > 0 && (
                <section className={"flex gap-2 mt-4 mb-[40px]"}>
                  {article?.tags.map((tag) => (
                    <Tag key={tag.id} {...tag} />
                  ))}
                </section>
              )}

              <section
                className={
                  "max-w-full h-[500px] my-[20px] rounded-[10px] overflow-hidden relative"
                }>
                <Image
                  className={"max-w-full h-full object-cover"}
                  src={`https://api.smartcities.uz${article.image}`}
                  layout={"fill"}
                />
              </section>

              <p className={"text-[18px]"}>{article.description}</p>
            </section>

            <section className={"p-[20px] pb-0 flex gap-5"}>
              <Like
                onLike={onArticleLike}
                is_liked={article.is_liked}
                like_count={article.like_count}
              />
              <Views views_count={article.view_count} />
              <Comment comments_count={article.comments_count} />
            </section>
          </section>
        )}

        {article && (
          <CommentsSection
            commentPostedCallback={updateCommentsCount}
            comments_count={article.comments_count}
            type={"ARTICLE"}
            id={article.id}
          />
        )}

        <section className={"mt-32"}></section>
      </main>
    </Page>
  )
}
