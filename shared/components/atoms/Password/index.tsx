import { ChangeEvent, useState } from "react"
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline"
import cn from "classnames"

interface PasswordProps {
  className?: string
  name?: string
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void
  validate?: (e: ChangeEvent<HTMLInputElement>) => string | undefined
  placeholder?: string
  hint?: string
  size?: "sm" | "md"
}

export const Password = ({
  className,
  name,
  onChange,
  size = "sm",
  placeholder,
  validate,
  hint
}: PasswordProps) => {
  const [type, setType] = useState<"password" | "text">("password")
  const [error, setError] = useState("")

  const classes = cn(
    "bg-gray-100 px-[20px] border rounded-[10px] outline-none",
    "transition-all",
    {
      "py-[13px] text-[14px]": size === "sm",
      "py-[20px] text-[16px]": size === "md",

      "border-gray-200 focus:bg-blue-pale focus:border-blue": !error,
      "border-[#E74D4D] bg-[#FFF2F2]": error
    },
    className
  )

  const buttonClasses = cn(
    "w-[20px] h-[20px] absolute top-[50%] -translate-y-[50%] right-[20px] text-gray-400 cursor-pointer"
  )

  const handleShowClick = () => {
    if (type === "password") {
      setType("text")
    }

    if (type === "text") {
      setType("password")
    }
  }

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

      <div className={"relative flex flex-col"}>
        <input
          spellCheck={false}
          type={type}
          placeholder={placeholder}
          className={classes}
          name={name}
          onChange={handleChange}
        />
        <button onClick={handleShowClick} className={buttonClasses}>
          {type === "text" && <EyeSlashIcon />}
          {type === "password" && <EyeIcon />}
        </button>
      </div>

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
