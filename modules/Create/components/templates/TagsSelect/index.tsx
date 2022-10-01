import Select from "react-select/creatable"
import { Tag } from "shared/types"
import { useMemo } from "react"
import { TAGS } from "../../../../../services/api"
import { useAppDispatch, useAppSelector } from "../../../../../store"
import { fetchTags } from "../../../../../store/slices/main"
import { toast } from "react-toastify"

interface TagsSelectProps {
  options: Tag[]
  onChange: (value: any) => void
}

export const TagsSelect = ({ options, onChange }: TagsSelectProps) => {
  const dispatch = useAppDispatch()
  const { tags } = useAppSelector((state) => state.main)

  const reducedOptions = useMemo(
    () => options.map((option) => ({ value: option.id, label: option.name })),
    [options]
  )

  const handleCreate = (name: string) => {
    TAGS.create(name).then((res) => {
      toast(`Тег "${name}" был отправлен на модерацию`, {
        type: "success"
      })
    })
  }

  return (
    <section className={"flex flex-col"}>
      <span className={"ml-4 mb-[4px] text-[16px] text-gray-400 font-semibold"}>
        Теги
      </span>

      <Select
        onCreateOption={handleCreate}
        placeholder={"Выберите теги"}
        formatCreateLabel={(value) => `Создать тег "${value}"`}
        onChange={onChange}
        isMulti={true}
        isClearable={true}
        options={reducedOptions}
      />
    </section>
  )
}
