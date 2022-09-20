import { ChangeEvent, useMemo, useState } from "react"
import { useRouter } from "next/router"

import { toast } from "react-toastify"
import { AxiosResponse } from "axios"
import { User } from "shared/types"

import { Button, Input, Logo, Password } from "shared/components/atoms"
import { Page } from "shared/components/templates"
import { Dialog } from "shared/components/molecules"
import { USER } from "services/api"

import { setLoggedIn } from "store/slices/main"
import { useAppDispatch } from "store"

export const RegisterPage = () => {
  const router = useRouter()

  const [isDialogOpen, setDialogOpen] = useState(false)
  const [code, setCode] = useState("")

  const dispatch = useAppDispatch()

  const [isRulesChecked, setRulesChecked] = useState(false)
  const [formState, setFormState] = useState({
    first_name: "",
    last_name: "",
    username: "",
    password: "",
    email: ""
  })

  const [userData, setUserData] = useState<User | null>(null)

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormState({ ...formState, [e.target.name]: e.target.value })
  }

  const handleLoginClick = () => {
    router.push("/auth")
  }

  const handleRegisterClick = () => {
    USER.register(formState).then((res: AxiosResponse<User>) => {
      setUserData(res.data)
      setDialogOpen(true)
    })
  }

  const handleVerifyClick = () => {
    if (userData) {
      USER.verify(code, userData.id)
        .then((res) => {
          const { access, refresh } = res.data.token

          window.localStorage.setItem("accessToken", access)
          window.localStorage.setItem("refreshToken", refresh)

          dispatch(setLoggedIn(userData))

          router.push("/feed")
        })
        .catch(() => {
          toast("Вы ввели неправильный код", {
            type: "error"
          })
        })
    }
  }

  const isRegisterButtonAvailable = useMemo(() => {
    return (
      formState.first_name &&
      formState.last_name &&
      formState.username &&
      formState.password &&
      formState.email &&
      isRulesChecked
    )
  }, [formState, isRulesChecked])

  return (
    <>
      <Page withAside={false} withMenu={false} title={"Регистрация"}>
        <main className={"flex flex-col flex-1"}>
          <section
            className={
              "max-w-[862px] w-full bg-white rounded-[10px] mt-[80px] py-[60px] px-[62px] mx-auto"
            }>
            <h1 className={"text-blue text-[24px] font-semibold mb-[60px]"}>
              Регистрация
            </h1>

            <section
              className={
                "grid grid-cols-2 gap-x-[40px] gap-y-[20px] mb-[60px]"
              }>
              <Input
                onChange={handleInputChange}
                size={"md"}
                name={"first_name"}
                placeholder={"Имя"}
                hint={"Имя"}
              />
              <Input
                onChange={handleInputChange}
                size={"md"}
                name={"last_name"}
                placeholder={"Фамилия"}
                hint={"Фамилия"}
              />

              <Input
                onChange={handleInputChange}
                name={"username"}
                size={"md"}
                placeholder={"Имя пользователя"}
                hint={"Имя пользователя"}
              />

              <Input
                onChange={handleInputChange}
                name={"email"}
                type={"email"}
                placeholder={"Электронная почта"}
                hint={"Электронная почта"}
                size={"md"}
              />

              <Password
                onChange={handleInputChange}
                name={"password"}
                hint={"Пароль"}
                placeholder={"Пароль"}
                size={"md"}
              />

              <Password
                hint={"Повторите пароль"}
                placeholder={"Пароль"}
                size={"md"}
              />
            </section>

            <section className={"flex flex-col gap-[40px]"}>
              <div className={"flex gap-2"}>
                <input
                  onChange={() => setRulesChecked((prev) => !prev)}
                  checked={isRulesChecked}
                  type={"checkbox"}
                />
                <span className={"text-[16px]"}>
                  Я принимаю условия{" "}
                  <a href={"#"} className={"text-blue"}>
                    Пользовательского соглашения
                  </a>
                </span>
              </div>

              <Button
                disabled={!isRegisterButtonAvailable}
                onClick={handleRegisterClick}
                size={"md"}>
                Зарегистрироваться
              </Button>

              <div className={"flex flex-col gap-[20px]"}>
                <h3 className={"font-semibold text-[16px]"}>
                  Или войдите с помощью других сервисов
                </h3>
              </div>
            </section>
          </section>

          <section
            className={
              "max-w-[862px] w-full bg-white rounded-[10px] my-[40px] flex items-center justify-center py-[33px] mx-auto"
            }>
            <p className={"text-[18px]"}>
              Уже зарегистрированы?{" "}
              <button className={"text-blue"} onClick={handleLoginClick}>
                Войдите
              </button>
            </p>
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

      <Dialog
        isOpen={isDialogOpen}
        closeOnOverlayClick={false}
        setOpen={setDialogOpen}>
        <section className={"flex flex-col items-center"}>
          <div className={"flex justify-center mt-12"}>
            <Logo type={"sm"} />
          </div>

          <h2 className={"text-[24px] font-semibold text-center mt-[30px]"}>
            Введите код
          </h2>

          <p
            className={
              "text-[14px] text-gray-300 max-w-[280px] text-center mt-2"
            }>
            Ваш номер телефона будет использоваться для входа в аккаунт
          </p>

          <Input
            onChange={(e) => setCode(e.target.value)}
            maxLength={6}
            placeholder={"_ _ _ _ _ _"}
            className={"mt-6 text-center"}
          />

          <Button onClick={handleVerifyClick} className={"w-full mt-16"}>
            Продолжать
          </Button>

          <p
            className={
              "text-[14px] w-full text-gray-300 text-center mt-[20px]"
            }>
            Нажимая «Продолжить», вы принимаете пользовательское соглашение и
            политику конфиденциальности
          </p>
        </section>
      </Dialog>
    </>
  )
}
