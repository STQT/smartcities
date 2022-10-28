import type { NextPage } from "next"
import { FlowPage } from "modules/Flow"
import { useRouter } from "next/router"
import { useEffect } from "react"

const Flow: NextPage = () => {
  const router = useRouter()

  useEffect(() => {
    router.replace({
      query: { ...router.query, lang: localStorage.getItem("lang") }
    })
  }, [])

  return <FlowPage />
}

export default Flow
