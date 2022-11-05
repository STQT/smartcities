import { useRouter } from "next/router"
import type { NextPage } from "next"
import { TagPage } from "../../modules/Tag"

const Tag: NextPage = () => {
  const router = useRouter()
  const { id } = router.query

  return <TagPage tag_id={id as string} />
}

export default Tag
