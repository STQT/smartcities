import { useEffect, useMemo, useRef, useState } from "react"
import { useRouter } from "next/router"
import cn from "classnames"

import { Avatar, Logo, Select } from "shared/components/atoms"
import { useAppDispatch, useAppSelector } from "store"
import {
  ArrowRightOnRectangleIcon,
  Bars3Icon,
  MagnifyingGlassIcon
} from "@heroicons/react/24/outline"
import { MobileMenu } from "../MobileMenu"
import { useScrollBlock } from "../../../hooks"
import {
  useLanguageQuery,
  useSelectedLanguage,
  useTranslation
} from "next-export-i18n"
import { setSearchTerm } from "store/slices/main"

const languages = [
  {
    label: "EN",
    value: "GB"
  },

  {
    label: "UZ",
    value: "UZ"
  },

  {
    label: "TR",
    value: "TR"
  },

  {
    label: "AZ",
    value: "AZ"
  },

  {
    label: "KZ",
    value: "KZ"
  },

  {
    label: "KG",
    value: "KG"
  }
]

export const Header = () => {
  const { lang } = useSelectedLanguage()
  const headerRef = useRef<HTMLElement>(null)
  const [hasScrolled, setScrolled] = useState(false)
  const [isMenuOpened, setMenuOpen] = useState(false)
  const dispatch = useAppDispatch()
  const [languageQuery] = useLanguageQuery()

  const [blockScroll, allowScroll] = useScrollBlock()

  const router = useRouter()
  const { t } = useTranslation()

  const { isLoggedIn, user } = useAppSelector((state) => state.main)

  const closeMenu = () => {
    setMenuOpen(false)
  }

  useEffect(() => {
    window.addEventListener("resize", () => {
      setMenuOpen(false)
    })
  }, [])

  useEffect(() => {
    const headerScrollListener = () => {
      if (headerRef.current) {
        window.scrollY >= 55 ? setScrolled(true) : setScrolled(false)
      }
    }

    headerScrollListener()

    window.addEventListener("scroll", headerScrollListener)

    return () => {
      window.removeEventListener("scroll", headerScrollListener)
    }
  }, [])

  useEffect(() => {
    isMenuOpened ? blockScroll() : allowScroll()
  }, [isMenuOpened])

  const selectedLanguage = useMemo(
    () => languages.find((l) => l.value === lang.toUpperCase()),
    [lang, languages]
  )

  useEffect(() => {
    localStorage.setItem("lang", lang)
  }, [lang])

  const handleMenuOpen = () => {
    setMenuOpen(true)
  }

  const LoggedInState = useMemo(() => {
    return (
      <>
        <section className={"hidden md:flex gap-[20px] items-center"}>
          <Logo
            type={"xs"}
            onClick={() =>
              router.push({ pathname: "/feed", query: languageQuery })
            }
          />
          <h1 className={"text-[18px] lg:text-[24px] font-semibold"}>
            {t("welcome")}, {user?.first_name}
          </h1>
        </section>

        <button onClick={handleMenuOpen} className={"block md:hidden"}>
          <Bars3Icon className={"w-[30px] text-blue h-[30px]"} />
        </button>

        <section className={"flex gap-[30px] items-center"}>
          <div
            className={
              "w-full md:w-[360px] ml-4 h-[40px] rounded-[100px] bg-[#F5F6FA] overflow-hidden pl-[17px] flex items-center"
            }>
            <MagnifyingGlassIcon
              className={"w-[20px] h-[20px] text-[#858585] mr-2"}
            />
            <input
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  router.push({ pathname: "/search", query: languageQuery })
                }
              }}
              onChange={(e) => dispatch(setSearchTerm(e.target.value))}
              placeholder={t("search")}
              spellCheck={false}
              className={"w-full h-full outline-none bg-[#F5F6FA]"}
            />
          </div>

          <Select
            isLanguageSwitcher={true}
            size={"xs"}
            isCountrySelect={true}
            selected={selectedLanguage}
            options={languages}
          />

          <Avatar
            size={50}
            src={user?.image}
            onClick={() =>
              router.push({ pathname: "/me", query: languageQuery })
            }
          />
        </section>
      </>
    )
  }, [user, lang, t])

  const NotLoggedInState = useMemo(() => {
    return (
      <section className={"flex items-center w-full justify-between"}>
        <div className={"hidden md:flex h-full items-center"}>
          <Logo type={"xs"} onClick={() => router.push("/feed")} />
        </div>

        <button onClick={handleMenuOpen} className={"block md:hidden"}>
          <Bars3Icon className={"w-[30px] text-blue h-[30px]"} />
        </button>

        <section className={"flex items-center gap-5"}>
          <div
            className={
              "w-full md:w-[360px] ml-4 h-[40px] rounded-[100px] bg-[#F5F6FA] overflow-hidden pl-[17px] flex items-center"
            }>
            <MagnifyingGlassIcon
              className={"w-[20px] h-[20px] text-[#858585] mr-2"}
            />
            <input
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  router.push({ pathname: "/search", query: languageQuery })
                }
              }}
              onChange={(e) => dispatch(setSearchTerm(e.target.value))}
              placeholder={t("search")}
              spellCheck={false}
              className={"w-full h-full outline-none bg-[#F5F6FA]"}
            />
          </div>

          <Select
            isLanguageSwitcher={true}
            size={"xs"}
            isCountrySelect={true}
            selected={selectedLanguage}
            options={languages}
          />

          <button
            onClick={() =>
              router.push({ pathname: "/auth", query: languageQuery })
            }
            className={
              "text-[18px] flex gap-2 items-center text-blue font-semibold"
            }>
            <ArrowRightOnRectangleIcon width={24} />
            {t("login_0")}
          </button>
        </section>
      </section>
    )
  }, [])

  return (
    <>
      <MobileMenu isMenuOpened={isMenuOpened} closeMenu={closeMenu} />

      <header
        ref={headerRef}
        style={{
          borderRadius: hasScrolled ? "0 0 30px 30px" : "100px"
        }}
        className={cn(
          "w-full sticky border top-0 z-50 h-[80px] bg-white mt-[40px] mb-[20px] duration-300 transition-all shadow-gray-300/20",
          hasScrolled ? "shadow-lg" : "shadow-none"
        )}>
        <section
          className={
            "w-full h-full flex justify-between px-[30px] items-center"
          }>
          {isLoggedIn && LoggedInState}
          {!isLoggedIn && NotLoggedInState}
        </section>
      </header>
    </>
  )
}
