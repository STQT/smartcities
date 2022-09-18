import { Switch as HeadlessSwitch } from "@headlessui/react"
import cn from "classnames"
import { Dispatch, SetStateAction } from "react"

interface SwitchProps {
  value: boolean
  setValue: Dispatch<SetStateAction<boolean>>
}

export const Switch = ({ value, setValue }: SwitchProps) => {
  const switchClasses = cn(
    "relative flex h-[40px] w-[72px] shrink-0 cursor-pointer rounded-full transition-all p-[4px]",
    {
      "bg-gray-300": !value,
      "bg-green": value
    }
  )

  const toggleClasses = cn(
    "w-[32px] h-[32px] rounded-full bg-white transform transition-all",
    {
      "translate-x-0": !value,
      "translate-x-[32px]": value
    }
  )

  return (
    <HeadlessSwitch
      checked={value}
      onChange={setValue}
      className={switchClasses}>
      <span aria-hidden="true" className={toggleClasses} />
    </HeadlessSwitch>
  )
}
