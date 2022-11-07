import cn from "classnames"
import Image from "next/image"
import { addBaseURL } from "../../../utils"
import { useMemo } from "react"

interface AvatarProps {
  src?: string
  className?: string
  size: number
  onClick?: () => void
}

export const Avatar = ({ src, size, onClick }: AvatarProps) => {
  const classes = cn(
    "rounded-full bg-gray-100 object-cover border-none outline-none flex items-center select-none justify-center overflow-hidden",
    {
      "w-[50px] h-[50px]": size === 50,
      "w-[40px] h-[40px]": size === 40,
      "w-[150px] h-[150px]": size === 150,
      "w-[120px] h-[120px]": size === 120,
      "cursor-pointer": onClick
    }
  )

  const image = useMemo(() => {
    return src?.startsWith("/") ? (addBaseURL(src) as string) : src
  }, [src])

  return image ? (
    <Image
      onClick={onClick}
      className={classes}
      src={image}
      width={size}
      height={size}
    />
  ) : (
    <div onClick={onClick} className={classes}>
      <Image
        src={"/svg/icons/user-placeholder.svg"}
        className={"pointer-events-none"}
        width={size / 2}
        height={size / 2}
      />
    </div>
  )
}
