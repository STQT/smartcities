import type { NextPage } from "next"
import { SearchPage } from "modules/Search"
import { useRouter } from "next/router"
import { useEffect } from "react"

const Search: NextPage = () => {
  const router = useRouter()

  useEffect(() => {
    router.replace({
      query: { ...router.query, lang: localStorage.getItem("lang") }
    })
  }, [])

  return <SearchPage />
}

export default Search
