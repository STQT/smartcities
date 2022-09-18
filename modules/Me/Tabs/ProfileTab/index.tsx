import { Button, Input, Password } from "shared/components/atoms"
import { useAppSelector } from "store"
import { ChangeEvent, useMemo, useState } from "react"

export const ProfileTab = () => {
  const { user } = useAppSelector((state) => state.main)

  const [formState, setFormState] = useState({
    ...user
  })

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormState({ ...formState, [e.target.name]: e.target.value })
  }

  const isChangeButtonAvailable = useMemo(() => {
    return JSON.stringify(formState) === JSON.stringify(user)
  }, [formState, user])

  return (
    <section className={"flex flex-col px-[40px] bg-white"}>
      <section
        className={"grid grid-cols-2 gap-x-[40px] gap-y-[20px] mb-[60px]"}>
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

        <Password hint={"Пароль"} placeholder={"Пароль"} size={"md"} />

        <Password
          hint={"Повторите пароль"}
          placeholder={"Пароль"}
          size={"md"}
        />
      </section>

      <section className={"mt-[100px] mb-[40px]"}>
        <div className={"flex items-center justify-between"}>
          <a href={"#"} className={"text-[18px] font-semibold text-blue"}>
            Как стать автором?
          </a>

          <div className={"flex gap-2"}>
            <Button theme={"gray"} size={"md"} className={"w-[200px]"}>
              Выход
            </Button>

            <Button
              disabled={isChangeButtonAvailable}
              theme={"blue"}
              size={"md"}
              className={"w-[200px]"}>
              Изменить
            </Button>
          </div>
        </div>
      </section>
    </section>
  )
}
