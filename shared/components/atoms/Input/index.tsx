import { ChangeEvent, useState } from "react"
import cn from "classnames"

interface InputProps {
  className?: string
  name?: string
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void
  validate?: (e: ChangeEvent<HTMLInputElement>) => string | undefined
  placeholder?: string

  size?: "sm" | "md"
  hint?: string
  maxLength?: number
  type?: "text" | "email" | "number" | "date"
  value?: string
  onClick?: () => void
  readOnly?: boolean
  isShowcase?: boolean
  max?: string
}

export const Input = ({
  value,
  className,
  name,
  onChange,
  size = "sm",
  placeholder,
  hint,
  max,
  maxLength,
  type = "text",
  readOnly = false,
  validate,
  isShowcase = false,
  onClick
}: InputProps) => {
  const [error, setError] = useState("")

  const classes = cn(
    "px-[20px] outline-none",
    "transition-all",
    {
      "py-[13px] text-[14px]": size === "sm",
      "py-[18px] text-[16px]": size === "md",
      "cursor-pointer": readOnly && !isShowcase,
      "bg-white focus:bg-white focus:border-none cursor-normal": isShowcase,
      "bg-gray-100  border rounded-[10px]": !isShowcase,
      "border-gray-200 focus:bg-blue-pale focus:border-blue": !error,
      "border-[#E74D4D] bg-[#FFF2F2]": error
    },
    className
  )

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const validateResult = validate?.(e) ?? ""
    onChange?.(e)
    setError(validateResult)
  }

  return (
    <div className={"flex flex-col"}>
      {hint && (
        <span
          className={"ml-4 mb-[4px] text-[16px] text-gray-400 font-semibold"}>
          {hint}
        </span>
      )}
      <input
        max={max}
        readOnly={readOnly}
        onClick={onClick}
        value={value}
        type={type}
        maxLength={maxLength}
        spellCheck={false}
        placeholder={placeholder}
        className={classes}
        name={name}
        onChange={handleChange}
      />

      <span
        className={cn("text-sm transition-all mt-1 h-2 text-[#E74D4D]", {
          "opacity-100": error,
          "opacity-0": !error
        })}>
        {error}
      </span>
    </div>
  )
}
