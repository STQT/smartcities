import { EyeIcon } from "@heroicons/react/24/solid"

interface ViewsProps {
  views_count: number
}

export const Views = ({ views_count }: ViewsProps) => {
  return (
    <div className={"flex gap-1 items-center text-gray-300 text-[14px]"}>
      <EyeIcon className={"w-[20px] h-[20px]"} />
      <span className={"select-none"}>{views_count}</span>
    </div>
  )
}
