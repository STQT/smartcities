import type { NextPage } from "next"
import { ProfilePage } from "modules/Me"
import { useRouter } from "next/router"
import { useEffect } from "react"

const Profile: NextPage = () => {
  const router = useRouter()

  useEffect(() => {
    router.replace({
      query: { ...router.query, lang: localStorage.getItem("lang") }
    })
  }, [])

  return <ProfilePage />
}

export default Profile
