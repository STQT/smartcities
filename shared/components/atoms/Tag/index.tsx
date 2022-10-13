import type { Tag as ITag } from "shared/types"

export const Tag = ({ name, id }: ITag) => {
  const handleTagClick = () => {}

  return (
    <button
      onClick={handleTagClick}
      className={
        "py-[10px] px-[20px] hover:bg-gray-200 transition-all w-auto rounded-full flex items-center justify-center text-[16px] bg-gray-100"
      }>
      {name}
    </button>
  )
}
