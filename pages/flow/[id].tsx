import type { NextPage } from "next"
import { FlowPage } from "modules/Flow"
import { useRouter } from "next/router"
import { useEffect } from "react"

const Flow: NextPage = () => {
  const router = useRouter()

  return <FlowPage />
}

export default Flow
