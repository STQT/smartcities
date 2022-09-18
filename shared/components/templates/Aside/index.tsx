import { ReadingNow } from "../../molecules"

export const Aside = () => {
  return (
    <aside
      className={
        "w-[20%] max-w-[250px] sticky top-24  self-start rounded-[20px] overflow-hidden"
      }>
      <ReadingNow />
    </aside>
  )
}
