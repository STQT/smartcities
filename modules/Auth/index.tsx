import { ChangeEvent, useState } from "react"
import { useRouter } from "next/router"
import { AxiosResponse } from "axios"

import { toast } from "react-toastify"
import { User } from "shared/types"

import { Input, Password, Button, Logo } from "shared/components/atoms"
import { Page } from "shared/components/templates"
import { login } from "services/api/config"
import { USER } from "services/api"

import { setLoggedIn } from "store/slices/main"
import { useAppDispatch } from "store"

export const AuthPage = () => {
  const router = useRouter()

  const [formState, setFormState] = useState({
    username: "",
    password: ""
  })

  const dispatch = useAppDispatch()

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormState({ ...formState, [e.target.name]: e.target.value })
  }

  const handleRegisterClick = () => {
    router.push("/register")
  }

  const handleLoginClick = () => {
    login(formState.username, formState.password, {
      successCb: () => {
        USER.getCurrent().then((res: AxiosResponse<User>) => {
          dispatch(setLoggedIn(res.data))
          router.push("/feed")
        })
      },

      failureCb: () => {
        toast("Неправильный пароль или логин", {
          type: "error"
        })
      }
    })
  }

  return (
    <Page withMenu={false} withAside={false} title={"Вход SmartCity"}>
      <main className={"flex flex-col justify-center flex-1"}>
        <section
          className={
            "bg-white max-w-[400px] w-full mx-auto mt-12 py-[40px] px-[30px] rounded-[10px]"
          }>
          <div
            className={
              "w-full flex flex-col justify-center gap-[30px] mb-[30px]"
            }>
            <Logo type={"sm"} />
            <h2 className={"font-semibold text-[24px] text-center"}>
              Вход SmartCity
            </h2>
          </div>

          <div className={"flex gap-[20px] w-full flex-col mb-[40px]"}>
            <Input
              onChange={handleInputChange}
              name={"username"}
              placeholder={"Телефон или электронная почта"}
              className={"w-full"}
              size={"sm"}
            />

            <Password
              onChange={handleInputChange}
              name={"password"}
              placeholder={"Пароль"}
            />

            <button
              className={"font-semibold self-start text-[14px] text-blue"}>
              Забыли пароль?
            </button>

            <Button onClick={handleLoginClick} size={"sm"} theme={"blue"}>
              Войти
            </Button>
          </div>

          <div className={"flex flex-col gap-[20px]"}>
            <h2 className={"text-[14px] font-semibold"}>
              Или войдите с помощью других сервисов
            </h2>
          </div>
        </section>

        <section
          className={
            "bg-white mb-[40px] rounded-[10px] mx-auto max-w-[400px] p-[30px] mt-[20px] flex flex-col gap-[10px]"
          }>
          <Button onClick={handleRegisterClick} size={"sm"} theme={"green"}>
            Зарегистрироваться
          </Button>

          <p className={"text-gray-200 text-[14px] text-center"}>
            После регистрации вы получите доступ ко всем возможностям SmartCity
          </p>

          <button className={"self-center text-[14px]"}>Узнать больше</button>
        </section>

        <footer
          className={
            "flex gap-[40px] text-gray-400 text-[16px] list-none mx-auto justify-center mb-[40px]"
          }>
          <li>Русский</li>
          <li>О сервисе</li>
          <li>Обратная связь</li>
          <li>Соглашение</li>
        </footer>
      </main>
    </Page>
  )
}
