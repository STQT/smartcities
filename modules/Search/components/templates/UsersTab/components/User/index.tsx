import { Avatar } from "shared/components/atoms"
import { User as IUser } from "shared/types"
import { useLanguageQuery } from "next-export-i18n"
import { useRouter } from "next/router"

export const User = ({ user }: { user: IUser }) => {
  const [languageQuery] = useLanguageQuery()
  const router = useRouter()

  const handleMoveToProfile = () => {
    router.push({
      pathname: "/profile/[id]",
      query: {
        lang: languageQuery?.lang,
        id: user.username
      }
    })
  }

  return (
    <article
      onClick={handleMoveToProfile}
      className={
        "w-full h-24 hover:bg-gray-200 transition-all cursor-pointer flex items-center gap-4 p-4 bg-white rounded-xl border"
      }>
      <Avatar size={50} src={user.image} />

      <section className={"flex flex-col"}>
        <h4 className={"text-xl font-semibold"}>
          {user.first_name} {user.last_name}
        </h4>

        <div className={"text-[16px] items-center flex"}>
          <span>{user.work_name}</span>
          <div
            className={"w-[5px] h-[5px] mx-[10px] bg-[#4D85CF] rounded-full"}
          />
          <span>{user.organization_name}</span>
        </div>
      </section>
    </article>
  )
}
