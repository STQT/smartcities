import type { NextPage } from "next"
import { useEffect } from "react"
import { useRouter } from "next/router"
import { useLanguageQuery } from "next-export-i18n"

const Home: NextPage = () => {
  const router = useRouter()
  const [languageQuery] = useLanguageQuery()

  useEffect(() => {
    router.push({ pathname: "/feed", query: languageQuery })
  }, [router])

  return <main className={"text-3xl"}></main>
}

export default Home
