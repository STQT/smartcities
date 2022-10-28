import { ChangeEvent, useEffect, useMemo, useState } from "react"
import { useAppDispatch, useAppSelector } from "store"

import {
  Button,
  CountrySelect,
  GenderRadio,
  Input,
  PhoneInput
} from "shared/components/atoms"
import { setUser } from "store/slices/main"
import { USER } from "services/api"
import { toast } from "react-toastify"
import { useTranslation } from "next-export-i18n"
import { PencilIcon } from "@heroicons/react/24/solid"
import cn from "classnames"
import FormData from "form-data"

export const ProfileTab = () => {
  const { user } = useAppSelector((state) => state.main)
  const { t } = useTranslation()
  const dispatch = useAppDispatch()

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

  const [formState, setFormState] = useState({
    ...user
  })

  useEffect(() => {
    setFormState({ ...user })
  }, [user])

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormState({ ...formState, [e.target.name]: e.target.value })
  }

  const handleUpdateInfo = () => {
    if (user) {
      const userFormData = new FormData()

      userFormData.append("first_name", formState.first_name)
      userFormData.append("last_name", formState.last_name)
      userFormData.append("organization_name", formState.organization_name)
      userFormData.append("work_name", formState.work_name)
      userFormData.append("country_code", formState.country_code)
      userFormData.append("email", formState.email)
      userFormData.append("phone", formState.phone)
      userFormData.append("username", formState.username)
      userFormData.append("birthday_date", "2002-10-07")
      userFormData.append("gender", formState.gender)

      if (image?.file) {
        userFormData.append("image", image!.file)
      }

      USER.updateInfo(user.username, userFormData).then(() => {
        USER.getCurrent().then((res) => {
          dispatch(setUser(res.data))

          toast("Вы успешно изменили информацию", {
            type: "success"
          })
        })
      })
    }
  }

  const profileImage = useMemo(() => {
    if (!formState.image && !Boolean(image?.preview)) {
      return "/svg/icons/user-placeholder.svg"
    }

    if (!formState.image && Boolean(image?.preview)) {
      return image?.preview
    }

    if (formState.image && !Boolean(image?.preview)) {
      return formState.image
    }
  }, [formState.image])

  return (
    <section
      className={"flex flex-col px-[20px] outline-none md:px-[40px] bg-white"}>
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
            <div className={"text-[16px] font-semibold items-center flex"}>
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
          onChange={handleInputChange}
          value={formState.first_name}
          name={"first_name"}
          size={"md"}
          placeholder={t("name")}
          hint={t("name")}
        />

        <Input
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
          onChange={handleInputChange}
          value={formState.organization_name}
          name={"organization_name"}
          size={"md"}
          placeholder={t("work_place")}
          hint={t("work_place")}
        />

        <Input
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
          onChange={handleInputChange}
          value={formState.email}
          name={"email"}
          size={"md"}
          placeholder={t("email")}
          hint={t("email")}
        />

        <PhoneInput
          onChange={(value) => setFormState({ ...formState, phone: value })}
          value={formState.phone ?? ""}
          name={"phone"}
          hint={"Phone"}
        />

        <Input
          onChange={handleInputChange}
          value={formState.username}
          name={"username"}
          size={"md"}
          placeholder={t("username")}
          hint={t("username")}
        />

        <div />
        <div />
        <button
          className={"text-[18px] justify-self-start text-blue font-semibold"}>
          {t("how_to_become_author")}
        </button>
        <Button onClick={handleUpdateInfo}>{t("save")}</Button>
      </section>
    </section>
  )
}
