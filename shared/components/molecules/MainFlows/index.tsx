import { useRouter } from "next/router"
import cn from "classnames"

import { fetchFlows } from "store/slices/main"
import { useAppDispatch, useAppSelector } from "store"
import { useCallback, useEffect } from "react"
import { useTranslation, useSelectedLanguage } from "next-export-i18n"
import { Language, Theme } from "../../../types"
import { addBaseURL } from "../../../utils"

interface MainFlowsProps {
  onItemClick?: () => void
}

export const MainFlows = ({ onItemClick }: MainFlowsProps) => {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const { t } = useTranslation()
  const { lang } = useSelectedLanguage()
  const { flows } = useAppSelector((state) => state.main)

  const handleItemClick = (id: number) => {
    router.push({
      pathname: "/flow/[id]/",
      query: { id }
    })

    onItemClick?.()
  }

  const itemClasses = (id: number) =>
    cn(
      "transition-all text-gray-400 hover:text-gray-500 p-[10px] hover:bg-gray-100 flex items-center gap-[10px] rounded-[5px]",
      {
        "text-gray-500 bg-gray-100 cursor-default":
          Number(router.query.id) === id
      }
    )

  useEffect(() => {
    dispatch(fetchFlows())
  }, [])

  const caption = useCallback(
    (flow: Theme) =>
      lang === "us"
        ? flow.name
        : flow[`name_${lang as Exclude<Language, "en">}`],
    [lang]
  )

  return (
    <section className={"mb-[28px] px-[20px]"}>
      <span className={"text-[18px] text-blue font-semibold"}>
        {t("all_threads")}
      </span>
      <div className={"mt-[8px] flex flex-col gap-1"}>
        {flows &&
          flows.length > 0 &&
          flows.map((flow) => (
            <button
              onClick={() => handleItemClick(flow.id)}
              className={itemClasses(flow.id)}
              key={flow.id}>
              <img alt={flow.name} src={addBaseURL(flow.icon)} />
              <p className={"self-start text-left"}>{caption(flow)}</p>
            </button>
          ))}
      </div>
    </section>
  )
}
