import { ReactNode } from "react"
import cn from "classnames"

interface ButtonProps {
  children: ReactNode
  size?: "sm" | "md"
  theme?: "green" | "blue" | "gray"
  className?: string
  disabled?: boolean
  onClick?: () => void
}

export const Button = ({
  children,
  className,
  size = "sm",
  theme = "blue",
  disabled,
  onClick
}: ButtonProps) => {
  const classes = cn(
    "text-white transition-all flex items-center justify-center rounded-[10px] font-semibold",
    {
      "py-[14px] text-[14px]": size === "sm",
      "py-[18px] text-[18px]": size === "md"
    },
    {
      "bg-[#D4D4D4] cursor-normal": disabled,
      "cursor-pointer": !disabled
    },
    !disabled && {
      "bg-green hover:bg-[#57C857]": theme === "green",
      "bg-blue hover:bg-[#639BE6]": theme === "blue",
      "bg-[#858585] hover:bg-[#6F6F6F]": theme === "gray"
    },
    className
  )

  return (
    <button
      type={"button"}
      disabled={disabled}
      className={classes}
      onClick={onClick}>
      {children}
    </button>
  )
}
