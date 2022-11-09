import { ChangeEvent, useMemo, useState } from "react"
import { useRouter } from "next/router"

import { toast } from "react-toastify"
import { AxiosError, AxiosResponse } from "axios"
import { User } from "shared/types"

import {
  Button,
  CountrySelect,
  GenderRadio,
  Input,
  Logo,
  Password,
  PhoneInput
} from "shared/components/atoms"
import { Page, SignInWith } from "shared/components/templates"
import { Dialog } from "shared/components/molecules"
import { USER } from "services/api"

import { setLoggedIn } from "store/slices/main"
import { useAppDispatch } from "store"
import cn from "classnames"
import { PencilIcon } from "@heroicons/react/24/solid"
import FormData from "form-data"
import { useLanguageQuery, useTranslation } from "next-export-i18n"
import { setAuthTokens } from "axios-jwt"

export const RegisterPage = () => {
  const router = useRouter()
  const [isDialogOpen, setDialogOpen] = useState(false)
  const [code, setCode] = useState("")

  const [image, setImage] = useState<{ file: File; preview: string } | null>(
    null
  )

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target && e.target.files && e.target.files[0]) {
      setImage({
        file: e.target.files[0],
        preview: URL.createObjectURL(e.target.files[0])
      })
    }
  }

  const dispatch = useAppDispatch()

  const [isRulesChecked, setRulesChecked] = useState(false)
  const [formState, setFormState] = useState({
    username: "",
    first_name: "",
    last_name: "",
    email: "",
    gender: true,
    organization_name: "",
    phone: "",
    work_name: "",
    image: "",
    country_code: "",
    country: "",
    birthday_date: "",
    password: ""
  })

  const [repeatPassword, setRepeatPassword] = useState("")

  const [userData, setUserData] = useState<User | null>(null)

  const { t } = useTranslation()
  const [languageQuery] = useLanguageQuery()

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormState({ ...formState, [e.target.name]: e.target.value })
  }

  const handleLoginClick = () => {
    router.push({
      pathname: "/auth",
      query: {
        lang: languageQuery?.lang
      }
    })
  }

  const handleRegisterClick = () => {
    USER.register({
      first_name: formState.first_name,
      last_name: formState.last_name,
      email: formState.email,
      username: formState.username,
      password: formState.password
    })
      .then((res: AxiosResponse<User>) => {
        setUserData(res.data)
        setDialogOpen(true)
      })
      .catch((e: AxiosError) => {
        /* @ts-ignore*/
        const { email, username } = e.response?.data

        if (email?.[0] === "Enter a valid email address.") {
          toast(t("invalid_email_address"), {
            type: "error"
          })
        }

        if (email?.[0] === "user with this email address already exists.") {
          toast(t("user_with_this_email_address_already_exists"), {
            type: "error"
          })
        }

        if (username?.[0] === "A user with that username already exists.") {
          toast(t("a_user_with_that_username_already_exists"), {
            type: "error"
          })
        }
      })
  }

  const handleVerifyClick = () => {
    const userFormData = new FormData()

    userFormData.append("username", formState.username)
    userFormData.append("email", formState.email)
    userFormData.append("work_name", formState.work_name)
    userFormData.append("country_code", formState.country_code)
    userFormData.append("organization_name", formState.organization_name)
    userFormData.append("phone", formState.phone)
    userFormData.append("birthday_date", formState.birthday_date)
    userFormData.append("gender", formState.gender)

    if (image?.file) {
      userFormData.append("image", image!.file)
    }

    if (userData) {
      USER.verify(code, userData.id)
        .then((res) => {
          const { access, refresh } = res.data.token

          window.localStorage.setItem("accessToken", access)
          window.localStorage.setItem("refreshToken", refresh)

          setAuthTokens({
            accessToken: access,
            refreshToken: refresh
          })
        })
        .then(() => {
          USER.updateInfo(userData.username, userFormData)
        })
        .then(() => {
          dispatch(setLoggedIn())
          router.push({
            pathname: "/feed",
            query: {
              lang: languageQuery?.lang
            }
          })
        })
        .catch(() => {
          toast(t("wrong_code"), {
            type: "error"
          })
        })
    }
  }

  const isRegisterButtonAvailable = useMemo(() => {
    return (
      formState.username &&
      formState.first_name &&
      formState.last_name &&
      formState.email &&
      formState.organization_name &&
      formState.phone &&
      formState.work_name &&
      image &&
      image.preview &&
      image.file &&
      formState.country_code &&
      formState.birthday_date &&
      formState.password &&
      formState.password === repeatPassword &&
      isRulesChecked
    )
  }, [formState, isRulesChecked, repeatPassword, image])

  const profileImage = useMemo(() => {
    if (!Boolean(image?.preview)) {
      return "/svg/icons/user-placeholder.svg"
    }

    if (Boolean(image?.preview)) {
      return image?.preview
    }
  }, [image])

  return (
    <>
      <Page withAside={false} withMenu={false} title={"Регистрация"}>
        <main className={"flex w-full flex-col flex-1"}>
          <section
            className={
              "max-w-[862px] border w-full bg-white rounded-[10px] md:mt-[80px] py-[30px] md:py-[60px] px-[24px] md:px-[62px] mx-auto"
            }>
            <h1 className={"text-blue text-[24px] font-semibold mb-[60px]"}>
              {t("register")}
            </h1>

            <section className={"flex mb-[40px] items-center gap-[40px]"}>
              <div
                className={
                  "w-[120px] h-[120px] bg-[#F5F6FA] flex items-center justify-center border border-[#D9DCE5] rounded-full relative"
                }>
                <img
                  src={profileImage}
                  alt={"image"}
                  className={cn("rounded-full object-cover", {
                    "w-[120px] h-[120px]":
                      formState?.image || Boolean(image?.preview),
                    "w-[40px] h-[40px]": !Boolean(image?.preview)
                  })}
                />

                <input
                  onChange={handleImageChange}
                  accept="image/png, image/jpeg"
                  id={"preview_profile"}
                  className={"hidden"}
                  type={"file"}
                />

                <label
                  htmlFor={"preview_profile"}
                  className={
                    "absolute hover:opacity-90 transition-all w-[30px] shadow-md h-[30px] bg-blue flex justify-center items-center rounded-full top-0 right-0"
                  }>
                  <PencilIcon className={"w-[15px] h-[15px] text-white"} />
                </label>
              </div>

              <div className={"flex flex-col gap-1"}>
                <h3 className={"text-[18px] font-bold"}>
                  {formState.first_name} {formState.last_name}
                </h3>

                {formState.work_name && formState.organization_name && (
                  <div
                    className={"text-[16px] font-semibold items-center flex"}>
                    <span>{formState.work_name}</span>
                    <div
                      className={
                        "w-[5px] h-[5px] mx-[10px] bg-[#4D85CF] rounded-full"
                      }
                    />
                    <span>{formState.organization_name}</span>
                  </div>
                )}
              </div>
            </section>

            <section
              className={
                "grid grid-cols-1 lg:grid-cols-2 gap-x-[40px] gap-y-[20px] mb-[60px]"
              }>
              <Input
                validate={(e) => {
                  if (e.target.value === "") return t("this_field_is_required")
                }}
                onChange={handleInputChange}
                value={formState.first_name}
                name={"first_name"}
                size={"md"}
                placeholder={t("name")}
                hint={t("name")}
              />

              <Input
                validate={(e) => {
                  if (e.target.value === "") return t("this_field_is_required")
                }}
                onChange={handleInputChange}
                value={formState.last_name}
                name={"last_name"}
                size={"md"}
                placeholder={t("surname")}
                hint={t("surname")}
              />

              <GenderRadio
                hint={t("gender")}
                isMale={Boolean(formState.gender)}
                onChange={(isMale) => {
                  setFormState({
                    ...formState,
                    gender: isMale === "true"
                  })
                }}
              />

              <Input
                validate={(e) => {
                  if (e.target.value === "") return t("this_field_is_required")
                }}
                max={new Date().toLocaleDateString("en-ca")}
                onChange={handleInputChange}
                value={formState.birthday_date}
                name={"birthday_date"}
                type={"date"}
                size={"md"}
                placeholder={t("birth_date")}
                hint={t("birth_date")}
              />

              <Input
                validate={(e) => {
                  if (e.target.value === "") return t("this_field_is_required")
                }}
                onChange={handleInputChange}
                value={formState.organization_name}
                name={"organization_name"}
                size={"md"}
                placeholder={t("work_place")}
                hint={t("work_place")}
              />

              <Input
                validate={(e) => {
                  if (e.target.value === "") return t("this_field_is_required")
                }}
                onChange={handleInputChange}
                value={formState.work_name}
                name={"work_name"}
                size={"md"}
                placeholder={t("job_position")}
                hint={t("job_position")}
              />

              <CountrySelect
                hint={t("country")}
                onChange={(code) =>
                  setFormState({ ...formState, country_code: code })
                }
                selected={formState.country_code as string}
              />

              <Input
                validate={(e) => {
                  if (e.target.value === "") return t("this_field_is_required")
                }}
                onChange={handleInputChange}
                value={formState.email}
                name={"email"}
                size={"md"}
                placeholder={t("email")}
                hint={t("email")}
              />

              <PhoneInput
                onChange={(value) =>
                  setFormState({ ...formState, phone: value })
                }
                value={formState.phone ?? ""}
                name={"phone"}
                hint={"Phone"}
              />

              <Input
                validate={(e) => {
                  if (e.target.value === "") return t("this_field_is_required")
                }}
                onChange={handleInputChange}
                value={formState.username}
                name={"username"}
                size={"md"}
                placeholder={t("username")}
                hint={t("username")}
              />

              <Password
                validate={(e) => {
                  if (e.target.value === "") return t("this_field_is_required")
                  if (e.target.value.length <= 6)
                    return t("minimum_length_is_6_symbols")
                }}
                onChange={handleInputChange}
                name={"password"}
                size={"md"}
                placeholder={t("password")}
                hint={t("password")}
              />

              <Password
                validate={(e) => {
                  if (e.target.value !== formState.password)
                    return t("passwords_not_match")
                }}
                onChange={(e) => setRepeatPassword(e.target.value)}
                size={"md"}
                placeholder={t("repeat_password")}
                hint={t("repeat_password")}
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
                  {t("i_agree_with")}{" "}
                  <a href={"#"} className={"text-blue"}>
                    {t("terms_of_service")}
                  </a>
                </span>
              </div>

              <Button
                disabled={!isRegisterButtonAvailable}
                onClick={handleRegisterClick}
                size={"md"}>
                {t("register")}
              </Button>

              <div className={"flex flex-col gap-[20px]"}>
                <h3 className={"font-semibold text-[16px]"}>
                  {t("or_sign_in_with_other_services")}
                </h3>

                <SignInWith isRegister={true} />
              </div>
            </section>
          </section>

          <section
            className={
              "max-w-[862px] border w-full bg-white rounded-[10px] my-[40px] flex items-center justify-center py-[33px] mx-auto"
            }>
            <p className={"text-[16px] md:text-[18px]"}>
              {t("already_registered?")}{" "}
              <button className={"text-blue"} onClick={handleLoginClick}>
                {t("login_0")}
              </button>
            </p>
          </section>
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
            {t("enter_code")}
          </h2>

          <p
            className={
              "text-[14px] text-gray-300 max-w-[280px] text-center mt-2"
            }>
            {t("use_login_to_enter")}
          </p>

          <Input
            onChange={(e) => setCode(e.target.value)}
            maxLength={6}
            placeholder={"_ _ _ _ _ _"}
            className={"mt-6 text-center"}
          />

          <Button onClick={handleVerifyClick} className={"w-full mt-16"}>
            {t("continue")}
          </Button>
        </section>
      </Dialog>
    </>
  )
}
