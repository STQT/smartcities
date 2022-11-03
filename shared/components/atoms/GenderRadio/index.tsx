import { useTranslation } from "next-export-i18n"

interface GenderRadioProps {
  hint: string
  isMale: boolean
  onChange?: (isMale: "true" | "false") => void
}

export const GenderRadio = ({ hint, isMale, onChange }: GenderRadioProps) => {
  const { t } = useTranslation()

  return (
    <div className={"flex flex-col"}>
      {hint && (
        <span
          className={"ml-4 mb-[4px] text-[16px] text-gray-400 font-semibold"}>
          {hint}
        </span>
      )}
      <div
        className={"ml-4 flex text-[#858585] mt-[25px] items-center gap-[40px]"}
        onChange={(e) => {
          /* @ts-ignore */
          onChange(e.target.value)
        }}>
        <div className={"flex gap-2"}>
          <input
            value={"true"}
            checked={isMale}
            id={"male"}
            name={"gender"}
            type={"radio"}
          />
          <label htmlFor={"male"}>{t("male")}</label>
        </div>

        <div className={"flex gap-2"}>
          <input
            value={"false"}
            checked={!isMale}
            id={"female"}
            name={"gender"}
            type={"radio"}
          />
          <label htmlFor={"female"}>{t("female")}</label>
        </div>
      </div>
    </div>
  )
}
