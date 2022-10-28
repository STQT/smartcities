import type { NextPage } from "next"
import { RegisterPage } from "modules/Register"
import { useEffect } from "react"
import { useRouter } from "next/router"

const Register: NextPage = () => {
  const router = useRouter()

  useEffect(() => {
    router.replace({
      query: { ...router.query, lang: localStorage.getItem("lang") }
    })
  }, [])

  return <RegisterPage />
}

export default Register
