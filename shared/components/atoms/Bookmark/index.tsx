import { BookmarkIcon } from "@heroicons/react/24/solid"
import cn from "classnames"

interface BookmarkProps {
  is_saved: boolean
  saves_count: number

  isClickable?: boolean
  toggleSave: () => void
}

export const Bookmark = ({
  is_saved,
  saves_count,
  isClickable = true,

  toggleSave
}: BookmarkProps) => {
  const classes = cn("flex transition-all gap-1 items-center text-[14px]", {
    "text-blue": is_saved,
    "text-gray-300": !is_saved
  })

  return (
    <button onClick={isClickable ? toggleSave : () => {}} className={classes}>
      <BookmarkIcon className={"w-[20px] h-[20px]"} />
      <span className={"select-none"}>{saves_count}</span>
    </button>
  )
}
