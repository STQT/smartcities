import { useRouter } from "next/router"
import { Avatar, Button, Logo } from "../../atoms"
import {
  ArrowUturnRightIcon,
  Bars3Icon,
  BellIcon,
  Cog6ToothIcon,
  PlusIcon,
  QuestionMarkCircleIcon
} from "@heroicons/react/24/outline"
import { MenuItem } from "../Menu"
import { logOut } from "store/slices/main"
import { useAppDispatch, useAppSelector } from "store"
import { MainFlows } from "../../molecules"
import { Fragment } from "react"
import { Transition } from "@headlessui/react"
import { useTranslation } from "next-export-i18n"
import cn from "classnames"

interface MobileMenuProps {
  closeMenu: () => void
  isMenuOpened: boolean
}

export const MobileMenu = ({ closeMenu, isMenuOpened }: MobileMenuProps) => {
  const { isLoggedIn, user } = useAppSelector((state) => state.main)
  const dispatch = useAppDispatch()
  const { t } = useTranslation()

  const router = useRouter()

  const handleLogout = () => {
    dispatch(logOut())
    router.push("/auth")
    closeMenu()
  }

  const handleMoveToNotifications = () => {
    router.push("/me?tab=notifications")
    closeMenu()
  }

  const handleMoveToSearch = () => {
    router.push("/search")
    closeMenu()
  }

  const handleMoveToProfile = () => {
    router.push("/me?tab=profile")
    closeMenu()
  }

  const handleMoveToCreate = () => {
    router.push("/create")
    closeMenu()
  }

  return (
    <Transition appear show={isMenuOpened} as={Fragment}>
      <Transition.Child
        as={Fragment}
        enter="ease-out duration-300"
        enterFrom="opacity-0 scale-125"
        enterTo="opacity-100 scale-100"
        leave="ease-in duration-200"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-125">
        <section
          className={
            "fixed top-0 left-0 w-full h-full z-[500] backdrop-blur-sm bg-blue/30"
          }>
          <aside
            className={
              "w-[70%] pt-[40px] h-full overflow-y-auto bg-white rounded-r-3xl"
            }>
            <section
              className={cn("px-[20px] border-b-[0.5px] border-gray-300/30", {
                "pb-[30px]": isLoggedIn,
                "pb-[0px]": !isLoggedIn
              })}>
              <section className={"flex gap-4"}>
                <button onClick={closeMenu} className={"block md:hidden"}>
                  <Bars3Icon className={"w-[30px] text-blue h-[30px]"} />
                </button>

                <Logo
                  onClick={() => {
                    router.push("/feed")
                    closeMenu()
                  }}
                />
              </section>

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
              <MainFlows
                onItemClick={() => {
                  closeMenu()
                }}
              />

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
                  Icon={
                    <QuestionMarkCircleIcon className={"w-[20px] h-[20px]"} />
                  }
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
                  <Avatar size={50} />
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
        </section>
      </Transition.Child>
    </Transition>
  )
}
