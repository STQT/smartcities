import cn from "classnames"
import Image from "next/image"

interface AvatarProps {
  src?: string
  className?: string
  size: number
  onClick?: () => void
}

export const Avatar = ({ src, size, onClick }: AvatarProps) => {
  const classes = cn(
    "rounded-full bg-gray-100 border-none outline-none flex items-center select-none justify-center overflow-hidden",
    {
      "w-[50px] h-[50px]": size === 50,
      "w-[40px] h-[40px]": size === 40,
      "cursor-pointer": onClick
    }
  )

  return src ? (
    <Image
      onClick={onClick}
      className={classes}
      src={src}
      width={size}
      height={size}
    />
  ) : (
    <div onClick={onClick} className={classes}>
      <Image
        src={"/svg/icons/user-icon.svg"}
        className={"pointer-events-none"}
        width={20}
        height={20}
      />
    </div>
  )
}
