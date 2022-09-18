import type { NextPage } from "next"
import { NewsPage } from "modules/News"
import { useRouter } from "next/router"

const News: NextPage = () => {
  const router = useRouter()
  const { id } = router.query

  return <NewsPage id={id as string} />
}

export default News
