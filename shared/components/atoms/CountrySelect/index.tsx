import { Select } from "../Select"
import Countries from "countries-list"
import { useMemo } from "react"
import { useTranslation } from "next-export-i18n"

interface CountrySelectProps {
  selected: string
  hint: string
  onChange: (code: string) => void
}

export const CountrySelect = ({
  selected,
  onChange,
  hint
}: CountrySelectProps) => {
  const { t } = useTranslation()

  const countries = useMemo(() => {
    return Object.entries(Countries.countries).map(([key, value]) => ({
      value: key,
      label: value.name
    }))
  }, [])

  return (
    <Select
      onChange={(option) => onChange(option.value as string)}
      selectPosition={"top"}
      hint={hint}
      isCountrySelect={true}
      selected={countries.find((country) => country.value === selected)}
      placeholder={t("choose_country")}
      options={countries}
    />
  )
}
