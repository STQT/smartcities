import type { NextPage } from "next"
import { ArticlePage } from "modules/Article"
import { useRouter } from "next/router"

const Article: NextPage = () => {
  const router = useRouter()
  const { id } = router.query

  return <ArticlePage id={id as string} />
}

export default Article
