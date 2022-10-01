import { useEffect, useMemo, useRef, useState } from "react"
import { useRouter } from "next/router"
import cn from "classnames"

import { Avatar, Logo } from "shared/components/atoms"
import { useAppSelector } from "store"
import { Bars3Icon } from "@heroicons/react/24/outline"
import { MobileMenu } from "../MobileMenu"
import { useScrollBlock } from "../../../hooks"

export const Header = () => {
  const headerRef = useRef<HTMLElement>(null)
  const [hasScrolled, setScrolled] = useState(false)
  const [isMenuOpened, setMenuOpen] = useState(false)

  const [blockScroll, allowScroll] = useScrollBlock()

  const router = useRouter()

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

  const LoggedInState = useMemo(() => {
    const handleMenuOpen = () => {
      setMenuOpen(true)
    }

    return (
      <>
        <h1 className={"hidden md:block text-[24px] font-semibold"}>
          Добро пожаловать, {user?.first_name}
        </h1>

        <button onClick={handleMenuOpen} className={"block md:hidden"}>
          <Bars3Icon className={"w-[30px] text-blue h-[30px]"} />
        </button>

        <Avatar size={50} onClick={() => router.push("/me")} />
      </>
    )
  }, [user])

  const NotLoggedInState = useMemo(() => {
    return (
      <section className={"flex items-center w-full justify-between"}>
        <Logo onClick={() => router.push("/feed")} />

        <button
          onClick={() => router.push("/auth")}
          className={"text-[18px] text-blue font-semibold"}>
          Войти
        </button>
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
          "w-full sticky top-0 z-50 h-[80px] bg-white mt-[40px] mb-[20px] duration-300 transition-all shadow-gray-300/20",
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
