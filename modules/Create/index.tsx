import { ChangeEvent, useCallback, useEffect, useMemo, useState } from "react"

import { Button, Input, Select, TextArea } from "shared/components/atoms"
import { Page } from "shared/components/templates"
import { Dialog } from "shared/components/molecules"
import { XMarkIcon } from "@heroicons/react/24/outline"

import { useAppDispatch, useAppSelector } from "store"
import { fetchFlows, fetchTags } from "store/slices/main"
import { Language, PostTypes, Theme } from "shared/types"
import { ARTICLE, NEWS, QUESTION } from "services/api"

import { PreviewSelect, TagsSelect, Editor } from "./components/templates"
import { toast } from "react-toastify"
import { useRouter } from "next/router"
import { isLoggedIn } from "axios-jwt"
import { useSelectedLanguage, useTranslation } from "next-export-i18n"
import { addBaseURL } from "../../shared/utils"

const generateSuccessCreateToast = (type: string) => {
  return toast(
    `Вы успешно создали ${type}, она появится после проверки модераторами.`,
    {
      type: "success"
    }
  )
}

interface FormValues {
  title: string
  tags_ids: number[]
  image: null | File
  description: string
  subtitle: string
}

export const CreatePage = () => {
  const { flows, tags } = useAppSelector((state) => state.main)
  const { t } = useTranslation()

  const { lang } = useSelectedLanguage()

  const PostTypeOptions: { label: string; value: PostTypes }[] = [
    { label: t("question"), value: "QUESTION" },
    { label: t("article"), value: "ARTICLE" },
    { label: t("news"), value: "NEWS" }
  ]

  const dispatch = useAppDispatch()
  const router = useRouter()

  const [isThemeDialogOpen, setThemeDialogOpen] = useState(false)
  const [selectedFlow, setSelectedFlow] = useState<Theme>()

  const [selectedPostType, setSelectedPostType] = useState<{
    label: string
    value: PostTypes
  }>()

  const [formValues, setFormValues] = useState<FormValues>({
    title: "",
    tags_ids: [],
    description: "",
    image: null,
    subtitle: ""
  })

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (e.target.name) {
      setFormValues((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }
  }

  const handleEditorChange = (value: string) => {
    setFormValues((prev) => ({ ...prev, description: value }))
  }

  const caption = useCallback(
    (flow?: Theme) => {
      if (flow) {
        return lang === "gb"
          ? flow.name
          : flow[`name_${lang as Exclude<Language, "gb">}`]
      }

      return ""
    },
    [lang]
  )

  useEffect(() => {
    if (!isLoggedIn) {
      router.push("/auth")
    }
  }, [])

  const handleFlowSelect = (flow: Theme) => {
    setSelectedFlow(flow)
    setThemeDialogOpen(false)
  }

  const handleTagSelect = (value: any) => {
    setFormValues((prev) => ({
      ...prev,
      tags_ids: value.map((v: any) => v.value)
    }))
  }

  const isSubmitAvailable = useMemo(() => {
    return (
      formValues.title &&
      formValues.tags_ids.length > 0 &&
      formValues.image &&
      formValues.description &&
      selectedPostType &&
      selectedPostType.value &&
      selectedFlow
    )
  }, [formValues, selectedPostType])

  const handlePublish = () => {
    if (selectedPostType) {
      const publicationFormData = new FormData()

      publicationFormData.append("title", formValues.title)
      publicationFormData.append("description", formValues.description)
      publicationFormData.append("theme", String(selectedFlow?.id))
      publicationFormData.append("image", formValues.image as File)
      publicationFormData.append("tags_ids", formValues.tags_ids.join(","))
      publicationFormData.append("subtitle", formValues.subtitle)

      const POST_TYPE = {
        ARTICLE,
        NEWS,
        QUESTION
      }[selectedPostType.value]

      POST_TYPE.create(publicationFormData)
        .then(() => {
          switch (selectedPostType.value) {
            case "ARTICLE":
              generateSuccessCreateToast("статью")
              break

            case "NEWS":
              generateSuccessCreateToast("новость")
              break

            case "QUESTION":
              generateSuccessCreateToast("вопрос")
          }

          router.push("/me?tab=posts")
        })
        .catch(() => {
          toast("Что-то пошло не так, попробуйте позже", { type: "error" })
        })
    }
  }

  useEffect(() => {
    dispatch(fetchFlows())
    dispatch(fetchTags())
  }, [])

  return (
    <>
      <Dialog
        width={"max-w-7xl"}
        isOpen={isThemeDialogOpen}
        setOpen={setThemeDialogOpen}>
        <section className={"flex flex-col"}>
          <h1 className={"text-xl font-semibold mb-[30px]"}>
            {t("choose_thread")}
          </h1>

          <section
            className={"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3"}>
            {flows.map((flow, idx) => (
              <button
                onClick={() => handleFlowSelect(flow)}
                key={idx}
                className={
                  "h-[100px] px-[20px] bg-[#F0F4FD] opacity-80 transition-all hover:opacity-100 text-[16px] flex gap-[20px] items-center rounded-[10px]"
                }>
                <img alt={""} src={addBaseURL(flow.preview_icon)} />
                {caption(flow)}
              </button>
            ))}
          </section>
        </section>
      </Dialog>

      <Page withMenu={false} title={t("create_post")}>
        <section
          className={
            "w-full p-[20px] md:p-[40px] rounded-[20px] bg-white flex flex-col gap-[30px]"
          }>
          <Input
            onClick={() => setThemeDialogOpen(true)}
            readOnly={true}
            hint={t("thread")}
            placeholder={t("thread")}
            value={caption(selectedFlow) ?? ""}
          />
          <Input
            name={"title"}
            onChange={handleInputChange}
            hint={t("title")}
            placeholder={t("title")}
          />
          <TextArea
            name={"subtitle"}
            onChange={handleInputChange}
            hint={t("subtitle")}
            placeholder={t("subtitle")}
          />
          {tags && <TagsSelect onChange={handleTagSelect} options={tags} />}

          <PreviewSelect
            onChange={(imageFile) => {
              setFormValues((prev) => ({ ...prev, image: imageFile }))
            }}
          />

          <Editor onChange={handleEditorChange} />

          <section
            className={"flex items-center mt-24 md:mt-12 justify-between"}>
            <Select
              placeholder={t("post_type")}
              selectPosition={"top"}
              size={"sm"}
              selected={selectedPostType}
              onChange={(option) => {
                /* @ts-ignore */
                setSelectedPostType(option)
              }}
              options={PostTypeOptions}
            />

            <section className={"flex gap-4"}>
              <Button
                theme={"gray"}
                className={"px-5"}
                onClick={() => {
                  router.push("/")
                }}>
                {t("back")}
              </Button>

              <Button
                disabled={!isSubmitAvailable}
                className={"px-5"}
                onClick={handlePublish}>
                {t("publish")}
              </Button>
            </section>
          </section>
        </section>
      </Page>
    </>
  )
}
