import { HeartIcon } from "@heroicons/react/24/solid"
import cn from "classnames"

interface LikeProps {
  is_liked: boolean
  like_count: number

  isClickable?: boolean
  toggleLike: () => void
}

export const Like = ({
  is_liked,
  like_count,
  isClickable = true,

  toggleLike
}: LikeProps) => {
  const classes = cn("flex transition-all gap-1 items-center text-[14px]", {
    "text-blue": is_liked,
    "text-gray-300": !is_liked
  })

  return (
    <button onClick={isClickable ? toggleLike : () => {}} className={classes}>
      <HeartIcon className={"w-[20px] h-[20px]"} />
      <span className={"select-none"}>{like_count}</span>
    </button>
  )
}
