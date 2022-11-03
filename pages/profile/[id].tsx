import { useRouter } from "next/router"
import type { NextPage } from "next"
import { ProfilePage } from "../../modules/Profile"

const Profile: NextPage = () => {
  const router = useRouter()
  const { id } = router.query

  return <ProfilePage username={id as string} />
}

export default Profile
