import { Theme } from "shared/types"
import cn from "classnames"

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
      "w-full rounded-[10px] text-left px-5 bg-gray-100 h-16 transition-all hover:bg-gray-200",
      {
        "bg-gray-200": id === (selectedTheme && selectedTheme.id)
      }
    )

  return themes && themes.length > 0 ? (
    <section
      className={
        "w-full flex flex-col gap-[10px] border-r-2 border-blue pr-3 last:border-none last:pr-0"
      }>
      {themes.map((theme) => (
        <button
          onClick={() => handleThemeSelect(theme)}
          className={buttonClasses(theme.id)}>
          {theme.name}
        </button>
      ))}
    </section>
  ) : null
}
