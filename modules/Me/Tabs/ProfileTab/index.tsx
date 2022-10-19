import { ChangeEvent, useMemo, useState } from "react"
import { useAppDispatch, useAppSelector } from "store"

import { Button, Input, Password } from "shared/components/atoms"
import { logOut, setUser } from "../../../../store/slices/main"
import { useRouter } from "next/router"
import { USER } from "../../../../services/api"
import { toast } from "react-toastify"

export const ProfileTab = () => {
  const { user } = useAppSelector((state) => state.main)
  const dispatch = useAppDispatch()
  const router = useRouter()

  const [formState, setFormState] = useState({
    ...user
  })

  const [password, setPassword] = useState("")
  const [repeatPassword, setRepeatPassword] = useState("")

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormState({ ...formState, [e.target.name]: e.target.value })
  }

  const handleLogout = () => {
    dispatch(logOut())
    router.push("/auth")
  }

  const isChangeButtonAvailable = useMemo(() => {
    return JSON.stringify(formState) === JSON.stringify(user)
  }, [formState, user, password, repeatPassword])

  const handleUpdateInfo = () => {
    if (user) {
      USER.updateInfo(user.username, formState).then(() => {
        USER.getCurrent().then((res) => {
          dispatch(setUser(res.data))

          toast("Вы успешно изменили информацию", {
            type: "success"
          })
        })
      })
    }
  }

  return (
    <section className={"flex flex-col px-[20px] md:px-[40px] bg-white"}>
      <section
        className={
          "grid grid-cols-1 lg:grid-cols-2 gap-x-[40px] gap-y-[20px] mb-[60px]"
        }>
        <Input
          onChange={handleInputChange}
          value={formState.first_name}
          name={"first_name"}
          size={"md"}
          placeholder={"Имя"}
          hint={"Имя"}
        />
        <Input
          onChange={handleInputChange}
          name={"last_name"}
          value={formState.last_name}
          size={"md"}
          placeholder={"Фамилия"}
          hint={"Фамилия"}
        />

        <Input
          onChange={handleInputChange}
          name={"username"}
          value={formState.username}
          size={"md"}
          placeholder={"Имя пользователя"}
          hint={"Имя пользователя"}
        />

        <Input
          onChange={handleInputChange}
          name={"email"}
          value={formState.email}
          placeholder={"Электронная почта"}
          hint={"Электронная почта"}
          size={"md"}
        />

        <Password
          onChange={(e) => setPassword(e.target.value)}
          placeholder={"Пароль"}
          hint={"Пароль"}
          size={"md"}
        />

        <Password
          onChange={(e) => setRepeatPassword(e.target.value)}
          placeholder={"Повторите пароль"}
          hint={"Повторите пароль"}
          size={"md"}
        />
      </section>

      <section className={"lg:mt-[100px] mb-[40px]"}>
        <div
          className={"flex flex-col lg:flex-row items-center justify-between"}>
          <a href={"#"} className={"text-[18px] font-semibold text-blue"}>
            Как стать автором?
          </a>

          <div
            className={
              "flex flex-col mt-5 lg:mt-0 lg:flex-row w-full lg:w-auto gap-2"
            }>
            <Button
              onClick={handleLogout}
              theme={"gray"}
              size={"md"}
              className={"w-full lg:w-[200px]"}>
              Выход
            </Button>

            <Button
              onClick={handleUpdateInfo}
              disabled={isChangeButtonAvailable}
              theme={"blue"}
              size={"md"}
              className={"w-full lg:w-[200px]"}>
              Изменить
            </Button>
          </div>
        </div>
      </section>
    </section>
  )
}
