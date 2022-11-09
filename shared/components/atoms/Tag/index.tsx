import type { Tag as ITag } from "shared/types"
import { useRouter } from "next/router"
import { useLanguageQuery } from "next-export-i18n"

export const Tag = ({ name, id }: ITag) => {
  const router = useRouter()
  const [languageQuery] = useLanguageQuery()

  const handleTagClick = () => {
    router.push({
      pathname: "/tag/[id]",
      query: {
        lang: languageQuery?.lang,
        id
      }
    })
  }

  return (
    <button
      onClick={handleTagClick}
      className={
        "py-[10px] px-[20px] hover:bg-gray-200 transition-all w-auto rounded-full flex items-center justify-center text-[16px] bg-gray-100"
      }>
      #{name.toLowerCase()}
    </button>
  )
}
