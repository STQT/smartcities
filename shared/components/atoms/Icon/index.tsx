import Image from "next/image"

interface IconProps {
  className?: string
}
export const BellIcon = ({ className }: IconProps) => {
  return (
    <Image
      className={className}
      src={"/svg/icons/bell-icon.svg"}
      width={"20px"}
      height={"20px"}
    />
  )
}

export const SettingsIcon = ({ className }: IconProps) => {
  return (
    <Image
      className={className}
      src={"/svg/icons/settings-icon.svg"}
      width={"20px"}
      height={"20px"}
    />
  )
}

export const QuestionIcon = ({ className }: IconProps) => {
  return (
    <Image
      className={className}
      src={"/svg/icons/question-icon.svg"}
      width={"20px"}
      height={"20px"}
    />
  )
}
