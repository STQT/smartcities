import { Fragment } from "react"
import { Theme } from "shared/types"
import cn from "classnames"
import { Transition } from "@headlessui/react"

export const ThemesSection = ({
  themes,
  handleThemeSelect,
  selectedTheme
}: {
  themes?: Theme[]
  handleThemeSelect: (theme: Theme) => void
  selectedTheme?: Theme
}) => {
  const buttonClasses = (id: number) =>
    cn(
      "w-full text-left px-5 bg-gray-100 border-b last:border-none h-16 transition-all hover:bg-gray-200",
      {
        "bg-gray-200": id === (selectedTheme && selectedTheme.id)
      }
    )

  return (
    <Transition
      as={Fragment}
      show={themes && themes.length > 0}
      enter="transition-all transform-gpu duration-[200ms]"
      enterFrom="opacity-0 translate-x-1/2"
      enterTo="opacity-100 translate-x-0"
      leave="transition-all transform-gpu duration-[200ms]"
      leaveFrom="opacity-100 translate-x-0"
      leaveTo="opacity-0 translate-x-1/2">
      <section
        className={
          "w-full h-[450px] overflow-y-scroll flex-col border-r-2 border-blue pr-3 last:border-none last:pr-0"
        }>
        {themes &&
          themes.map((theme) => (
            <button
              key={theme.id}
              onClick={() => handleThemeSelect(theme)}
              className={buttonClasses(theme.id)}>
              {theme.name}
            </button>
          ))}
      </section>
    </Transition>
  )
}
