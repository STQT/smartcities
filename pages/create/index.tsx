import type { NextPage } from "next"
import { CreatePage } from "modules/Create"
import { useRouter } from "next/router"
import { useEffect } from "react"

const Create: NextPage = () => {
  const router = useRouter()

  useEffect(() => {
    router.replace({
      query: { ...router.query, lang: localStorage.getItem("lang") }
    })
  }, [])

  return <CreatePage />
}

export default Create
