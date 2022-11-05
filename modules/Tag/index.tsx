import { Page } from "shared/components/templates"
import { PublicationsSection } from "./Sections"
import { useEffect, useState } from "react"
import { Tag } from "shared/types"
import { TAGS } from "../../services/api"

interface TagPageProps {
  tag_id: string
}

export const TagPage = ({ tag_id }: TagPageProps) => {
  const [tag, setTag] = useState<Tag>()

  useEffect(() => {
    TAGS.get(tag_id).then((res) => {
      setTag(res.data)
    })
  }, [tag_id])

  return (
    <Page title={tag?.name ?? "Tag"}>
      <main className={"flex-1 flex flex-col overflow-hidden rounded-t-[20px]"}>
        <section
          className={
            "rounded-t-[20px] border-t border-l border-r bg-white p-6 overflow-hidden"
          }>
          <h2 className={"text-4xl font-bold"}>{tag?.name}</h2>
        </section>

        <section>
          <PublicationsSection tag_id={tag_id} />
        </section>
      </main>
    </Page>
  )
}
