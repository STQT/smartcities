import type { NextPage } from "next"
import { FeedPage } from "modules/Feed"
import { useRouter } from "next/router"
import { useEffect } from "react"

const Feed: NextPage = () => {
  const router = useRouter()

  useEffect(() => {
    router.replace({
      query: { ...router.query, lang: localStorage.getItem("lang") }
    })
  }, [])

  return <FeedPage />
}

export default Feed
