import IntlTelInput from "react-intl-tel-input"
import "react-intl-tel-input/dist/main.css"
import cn from "classnames"

interface PhoneInputProps {
  hint: string
  name?: string
  onChange?: (value: string) => void
  value?: string
}

export const PhoneInput = ({
  hint,
  name,
  onChange,
  value
}: PhoneInputProps) => {
  return (
    <div className={"flex flex-col"}>
      {hint && (
        <span
          className={"ml-4 mb-[4px] text-[16px] text-gray-400 font-semibold"}>
          {hint}
        </span>
      )}
      <div
        className={cn(
          "h-[62px] border-gray-200 focus:bg-blue-pale focus:border-blue bg-[#F5F6FA] flex items-center pl-[15px] outline-none rounded-[10px] w-full border"
        )}>
        <IntlTelInput
          formatOnInit={true}
          format={true}
          value={value}
          defaultCountry={"uz"}
          useMobileFullscreenDropdown={true}
          onPhoneNumberChange={(isValid, value, d, fullNumber) => {
            onChange?.(fullNumber)
          }}
          fieldName={name}
          inputClassName={"bg-[#F5F6FA] outline-none h-full"}
        />
      </div>
    </div>
  )
}
