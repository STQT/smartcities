import { ChangeEvent, useState } from "react"
import { useRouter } from "next/router"
import { useLanguageQuery, useTranslation } from "next-export-i18n"

import { toast } from "react-toastify"

import { Input, Password, Button, Logo } from "shared/components/atoms"
import { Page, SignInWith } from "shared/components/templates"
import { login } from "services/api/config"
import { USER } from "services/api"

import { useAppDispatch } from "store"
import { setLoggedIn } from "store/slices/main"

export const AuthPage = () => {
  const router = useRouter()
  const { t } = useTranslation()
  const [languageQuery] = useLanguageQuery()

  const [formState, setFormState] = useState({
    username: "",
    password: ""
  })

  const dispatch = useAppDispatch()

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormState({ ...formState, [e.target.name]: e.target.value })
  }

  const handleRegisterClick = () =>
    router.push({
      pathname: "/register",
      query: {
        lang: languageQuery?.lang
      }
    })

  const handleLoginClick = () => {
    login(formState.username, formState.password, {
      successCb: () => {
        USER.getCurrent().then(() => {
          dispatch(setLoggedIn())
          router.push({
            pathname: "/feed",
            query: {
              lang: languageQuery?.lang
            }
          })
        })
      },

      failureCb: () => {
        toast(t("wrong_password_or_login"), {
          type: "error"
        })
      }
    })
  }

  return (
    <Page withMenu={false} withAside={false} title={"Вход SmartCity"}>
      <main className={"flex w-full flex-col justify-center flex-1"}>
        <section
          className={
            "bg-white border max-w-[400px] w-full mx-auto md:mt-12 py-[40px] px-[30px] rounded-[10px]"
          }>
          <div
            className={
              "w-full flex flex-col justify-center gap-[30px] mb-[30px]"
            }>
            <Logo type={"sm"} />
            <h2 className={"font-semibold text-[24px] text-center"}>
              {t("login_0")} SmartCity
            </h2>
          </div>

          <div className={"flex gap-[20px] w-full flex-col mb-[40px]"}>
            <Input
              onChange={handleInputChange}
              name={"username"}
              placeholder={t("login_1")}
              className={"w-full"}
              size={"sm"}
            />

            <Password
              onChange={handleInputChange}
              name={"password"}
              placeholder={t("password")}
            />

            <button
              className={"font-semibold self-start text-[14px] text-blue"}>
              {t("forgot_password")}
            </button>

            <Button onClick={handleLoginClick} size={"sm"} theme={"blue"}>
              {t("login_0")}
            </Button>
          </div>

          <div className={"flex flex-col gap-[20px]"}>
            <h2 className={"text-[14px] font-semibold"}>
              {t("or_sign_in_with_other_services")}
            </h2>

            <SignInWith />
          </div>
        </section>

        <section
          className={
            "bg-white border mb-[40px] rounded-[10px] mx-auto max-w-[400px] p-[30px] mt-[20px] flex flex-col gap-[10px]"
          }>
          <Button onClick={handleRegisterClick} size={"sm"} theme={"green"}>
            {t("register")}
          </Button>

          <p className={"text-gray-300 text-[14px] text-center"}>
            {t("access_to_all_features_after_login")}
          </p>
        </section>
      </main>
    </Page>
  )
}
