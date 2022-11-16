import { useEffect, useMemo, useState } from "react"

import type { User as IUser } from "shared/types"
import { USER } from "services/api"

import { EmptyState } from "shared/components/molecules"
import { useTranslation } from "next-export-i18n"
import { User } from "./components/User"

export const UsersTab = ({ query }: { query: string }) => {
  const [users, setUsers] = useState<IUser[]>([])
  const [isLoading, setLoading] = useState(true)
  const { t } = useTranslation()

  const isEmpty = useMemo(() => {
    return users.length === 0
  }, [users])

  useEffect(() => {
    if (query) {
      USER.search(query).then((res) => {
        setUsers(res.data.results)
        setLoading(false)
      })
    } else {
      setUsers([])
    }
  }, [query])

  return (
    <main>
      <EmptyState
        caption={t("users_not_found")}
        className={"mt-6"}
        isEmpty={isEmpty}
      />

      {!isLoading && users.length > 0 && (
        <section className={"grid grid-cols-2 gap-3 mt-5 pb-2"}>
          {users.map((user) => (
            <User user={user} key={user.id} />
          ))}
        </section>
      )}
    </main>
  )
}
