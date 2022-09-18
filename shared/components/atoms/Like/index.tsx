import { HeartIcon } from "@heroicons/react/24/solid"
import { useState } from "react"
import cn from "classnames"

interface LikeProps {
  is_liked: boolean
  like_count: number

  isClickable?: boolean
  onLike?: () => void
  onUnlike?: () => void
}

export const Like = ({
  is_liked,
  like_count,
  isClickable = true,

  onLike,
  onUnlike
}: LikeProps) => {
  const [isLiked, setLiked] = useState(is_liked)
  const [likeCount, setLikeCount] = useState(like_count)

  const classes = cn("flex transition-all gap-1 items-center text-[14px]", {
    "text-blue": isLiked,
    "text-gray-300": !isLiked
  })

  const handleLikeClick = () => {
    if (isLiked) {
      setLikeCount((prev) => prev - 1)
      setLiked(false)

      onUnlike?.()
    } else {
      setLikeCount((prev) => prev + 1)
      setLiked(true)

      onLike?.()
    }
  }

  return (
    <button
      onClick={isClickable ? handleLikeClick : () => {}}
      className={classes}>
      <HeartIcon className={"w-[20px] h-[20px]"} />
      <span>{likeCount}</span>
    </button>
  )
}
