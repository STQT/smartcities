import { Avatar, Button, Logo } from "../../atoms"
import { MainFlows } from "../../molecules"
import { useAppDispatch, useAppSelector } from "store"
import { useRouter } from "next/router"
import {
  ArrowUturnRightIcon,
  BellIcon,
  Cog6ToothIcon,
  PlusIcon,
  QuestionMarkCircleIcon
} from "@heroicons/react/24/outline"
import { logOut } from "store/slices/main"
import cn from "classnames"
import { useLanguageQuery, useTranslation } from "next-export-i18n"

interface MenuItemProps {
  Icon: JSX.Element
  label: string
  onClick?: () => void
  isActive?: boolean
}
export const MenuItem = ({
  label,
  onClick,
  Icon,
  isActive = false
}: MenuItemProps) => {
  const classes = cn(
    "flex items-center gap-[10px] transition-all text-gray-400 text-[16px] hover:text-blue",
    {
      "text-blue cursor-default": isActive
    }
  )

  return (
    <button onClick={onClick} className={classes}>
      {Icon} {label}
    </button>
  )
}

export const Menu = () => {
  const { isLoggedIn, user } = useAppSelector((state) => state.main)
  const dispatch = useAppDispatch()
  const { t } = useTranslation()

  const [languageQuery] = useLanguageQuery()

  const router = useRouter()

  const handleLogout = () => {
    dispatch(logOut())
    router.push({ pathname: "/auth", query: languageQuery })
  }

  const handleMoveToNotifications = () => {
    router.push({
      pathname: "/me",
      query: {
        ...languageQuery,
        tab: "notifications"
      }
    })
  }

  const handleMoveToProfile = () => {
    router.push({
      pathname: "/me",
      query: {
        ...languageQuery,
        tab: "profile"
      }
    })
  }

  const handleMoveToCreate = () => {
    router.push({
      pathname: "/create",
      query: languageQuery
    })
  }

  return (
    <aside
      className={
        "hidden border block md:block md:w-[30%] max-w-[250px] bg-white self-start pt-[40px] rounded-[20px] overflow-hidden"
      }>
      <section
        className={cn("px-[20px] border-b-[0.5px] border-gray-300/30", {
          "pb-[30px]": isLoggedIn,
          "pb-[0px]": !isLoggedIn
        })}>
        <Logo
          onClick={() =>
            router.push({ pathname: "/feed", query: languageQuery })
          }
        />

        <div className={"mt-[30px] flex flex-col gap-4"}>
          {isLoggedIn && (
            <Button onClick={handleMoveToCreate}>
              <span className={"mr-2"}>{t("create_post")}</span>{" "}
              <PlusIcon className={"w-[20px] h-[20px]"} />
            </Button>
          )}

          {isLoggedIn && (
            <MenuItem
              isActive={router.asPath.includes("?tab=notifications")}
              Icon={<BellIcon className={"w-[20px] h-[20px]"} />}
              onClick={handleMoveToNotifications}
              label={t("notifications")}
            />
          )}
        </div>
      </section>

      <section className={"mt-[28px]"}>
        <MainFlows />

        <section
          className={
            "mt-[60px] px-[20px] flex flex-col gap-[20px] pb-[20px] border-b-[0.5px] border-gray-300/30"
          }>
          {isLoggedIn && (
            <MenuItem
              Icon={<Cog6ToothIcon className={"w-[20px] h-[20px]"} />}
              isActive={router.asPath.includes("?tab=profile")}
              onClick={handleMoveToProfile}
              label={t("settings")}
            />
          )}
          <MenuItem
            Icon={<QuestionMarkCircleIcon className={"w-[20px] h-[20px]"} />}
            label={t("rules")}
            onClick={() => {}}
          />
        </section>
      </section>

      {isLoggedIn && (
        <section className={"p-[20px] flex justify-between items-center"}>
          <div
            onClick={handleMoveToProfile}
            className={"flex cursor-pointer gap-[15px] items-center"}>
            <Avatar src={user?.image} size={50} />
            <div className={"flex flex-col"}>
              <span className={"text-[12px] font-semibold text-black"}>
                {user?.first_name}
              </span>
              <span className={"text-[12px] text-gray-400"}>
                {user?.last_name}
              </span>
            </div>
          </div>

          <ArrowUturnRightIcon
            onClick={handleLogout}
            className={
              "w-[20px] cursor-pointer transition-all hover:text-blue text-gray-300 h-[20px]"
            }
          />
        </section>
      )}
    </aside>
  )
}
