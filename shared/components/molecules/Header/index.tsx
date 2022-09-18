import { useEffect, useMemo, useRef, useState } from "react"
import cn from "classnames"
import { Avatar, Logo } from "../../atoms"
import { useAppSelector } from "store"
import { useRouter } from "next/router"

export const Header = () => {
  const headerRef = useRef<HTMLElement>(null)
  const [hasScrolled, setScrolled] = useState(false)

  const router = useRouter()

  const { isLoggedIn, user } = useAppSelector((state) => state.main)

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

  const LoggedInState = useMemo(() => {
    return (
      <>
        <h1 className={"text-[24px] font-semibold"}>
          Добро пожаловать, {user?.first_name}
        </h1>

        <Avatar size={50} onClick={() => router.push("/me")} />
      </>
    )
  }, [user, isLoggedIn])

  const NotLoggedInState = useMemo(() => {
    const router = useRouter()

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
  }, [isLoggedIn])

  return (
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
        className={"w-full h-full flex justify-between px-[30px] items-center"}>
        {isLoggedIn && LoggedInState}
        {!isLoggedIn && NotLoggedInState}
      </section>
    </header>
  )
}
