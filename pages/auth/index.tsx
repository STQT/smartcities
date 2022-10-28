import type { NextPage } from "next"
import { AuthPage } from "modules/Auth"
import { useEffect } from "react"
import { useRouter } from "next/router"

const Auth: NextPage = () => {
  const router = useRouter()

  useEffect(() => {
    router.replace({
      query: { ...router.query, lang: localStorage.getItem("lang") }
    })
  }, [])

  return <AuthPage />
}

export default Auth
