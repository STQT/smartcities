import Select from "react-select/creatable"
import { Tag } from "shared/types"
import { useMemo } from "react"

interface TagsSelectProps {
  options: Tag[]
  onChange: (value: any) => void
}

export const TagsSelect = ({ options, onChange }: TagsSelectProps) => {
  const reducedOptions = useMemo(
    () => options.map((option) => ({ value: option.id, label: option.name })),
    [options]
  )

  return (
    <Select
      placeholder={"Выберите теги"}
      onChange={onChange}
      isMulti={true}
      isClearable={true}
      options={reducedOptions}
    />
  )
}
