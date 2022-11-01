import { useEffect, useMemo, useState } from "react"

import type { Post as TPost } from "shared/types"
import { QUESTION } from "services/api"

import { EmptyState, PostLoading } from "shared/components/molecules"
import { Post } from "shared/components/templates"
import { useTranslation } from "next-export-i18n"
import { User } from "./components/User"

export const UsersTab = ({ query }: { query: string }) => {
  const [users, setUsers] = useState<TPost[]>([])
  const [isLoading, setLoading] = useState(true)
  const { t } = useTranslation()

  const isEmpty = useMemo(() => {
    return users.length === 0
  }, [users])

  useEffect(() => {
    if (query) {
      QUESTION.search(query).then((res) => {
        setUsers(res.data.results)
        setLoading(false)
      })
    }
  }, [query])

  useEffect(() => {
    QUESTION.getList().then((res) => {
      setUsers(res.data.results)
      setLoading(false)
    })
  }, [])

  return (
    <main>
      <section className={"h-12 rounded-b-[20px] bg-white"}></section>

      <PostLoading className={"mt-6"} isLoading={isLoading} />
      {!isLoading && (
        <EmptyState
          caption={t("questions_not_found")}
          className={"mt-6"}
          isEmpty={isEmpty}
        />
      )}

      {!isLoading && users.length > 0 && (
        <section className={"grid grid-cols-2 gap-3 mt-5 pb-2"}>
          {users.map((user) => (
            <User key={user.id} />
          ))}
        </section>
      )}
    </main>
  )
}
