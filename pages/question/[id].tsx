import type { NextPage } from "next"
import { QuestionPage } from "modules/Question"
import { useRouter } from "next/router"

const Question: NextPage = () => {
  const router = useRouter()
  const { id } = router.query

  return <QuestionPage id={id as string} />
}

export default Question
