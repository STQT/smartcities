import { ChangeEvent, useEffect, useMemo, useState } from "react"

import { Button, Input, Select } from "shared/components/atoms"
import { Page } from "shared/components/templates"
import { Dialog } from "shared/components/molecules"
import { XMarkIcon } from "@heroicons/react/24/outline"

import { useAppDispatch, useAppSelector } from "store"
import { fetchFlows, fetchTags } from "store/slices/main"
import { PostTypes, Theme } from "shared/types"
import { ARTICLE, BASE, NEWS, QUESTION } from "services/api"

import {
  PreviewSelect,
  TagsSelect,
  ThemesSection,
  Editor
} from "./components/templates"
import { toast } from "react-toastify"
import { useRouter } from "next/router"

const PostTypeOptions: { label: string; value: PostTypes }[] = [
  { label: "Вопрос", value: "QUESTION" },
  { label: "Статья", value: "ARTICLE" },
  { label: "Новость", value: "NEWS" }
]

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
}

export const CreatePage = () => {
  const { flows, tags } = useAppSelector((state) => state.main)
  const dispatch = useAppDispatch()
  const router = useRouter()

  const [isThemeDialogOpen, setThemeDialogOpen] = useState(false)
  const [selectedFlow, setSelectedFlow] = useState<Theme>()

  // Current Selected Theme
  const [selectedTheme, setSelectedTheme] = useState<Theme>()

  // Themes by Level
  const [firstLevelThemes, setFirstLevelThemes] = useState<Theme[]>()
  const [secondLevelThemes, setSecondLevelThemes] = useState<Theme[]>()
  const [thirdLevelThemes, setThirdLevelThemes] = useState<Theme[]>()

  const [selectedPostType, setSelectedPostType] = useState<{
    label: string
    value: PostTypes
  }>()

  const [formValues, setFormValues] = useState<FormValues>({
    title: "",
    tags_ids: [],
    description: "",
    image: null
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

  const clearThemes = () => {
    setFirstLevelThemes([])
    setSecondLevelThemes([])
    setThirdLevelThemes([])

    setSelectedTheme(undefined)
  }

  useEffect(() => {
    if (selectedFlow) {
      BASE.getThemeByTreeId(selectedFlow.id).then((res) => {
        setFirstLevelThemes(res.data)
        setSelectedTheme(selectedFlow)
      })
    }

    clearThemes()
  }, [selectedFlow])

  const handleFlowSelect = (flow: Theme) => {
    setSelectedFlow(flow)
  }

  const handleFirstLevelThemeSelect = (theme: Theme) => {
    setSelectedTheme(theme)

    BASE.getThemeByTreeId(theme.id).then((res) => {
      setSecondLevelThemes(res.data)
    })
  }

  const handleSecondLevelThemeSelect = (theme: Theme) => {
    setSelectedTheme(theme)

    BASE.getThemeByTreeId(theme.id).then((res) => {
      setThirdLevelThemes(res.data)
    })
  }

  const handleThirdLevelThemeSelect = (theme: Theme) => {
    setSelectedTheme(theme)
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
      (selectedTheme || selectedFlow)
    )
  }, [formValues, selectedPostType])

  const handlePublish = () => {
    if (selectedPostType) {
      const publicationFormData = new FormData()

      publicationFormData.append("title", formValues.title)
      publicationFormData.append("description", formValues.description)
      publicationFormData.append("theme", String(selectedTheme?.id))
      publicationFormData.append("image", formValues.image as File)
      publicationFormData.append("tags_ids", formValues.tags_ids.join(","))

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
        className={"h-[586px]"}
        width={"max-w-7xl"}
        isOpen={isThemeDialogOpen}
        setOpen={setThemeDialogOpen}>
        <section className={"flex items-center justify-between"}>
          <h1 className={"text-xl font-semibold"}>Выберите тему</h1>
          <button
            className={"w-[32px] outline-none h-[32px] text-gray-400"}
            onClick={() => setThemeDialogOpen(false)}>
            <XMarkIcon />
          </button>
        </section>

        <section className={"flex mt-[30px] gap-[10px] w-full"}>
          <ThemesSection
            themes={flows}
            handleThemeSelect={handleFlowSelect}
            selectedTheme={selectedFlow}
          />

          <ThemesSection
            themes={firstLevelThemes}
            handleThemeSelect={handleFirstLevelThemeSelect}
            selectedTheme={selectedTheme}
          />

          <ThemesSection
            themes={secondLevelThemes}
            handleThemeSelect={handleSecondLevelThemeSelect}
            selectedTheme={selectedTheme}
          />

          <ThemesSection
            themes={thirdLevelThemes}
            handleThemeSelect={handleThirdLevelThemeSelect}
            selectedTheme={selectedTheme}
          />
        </section>
      </Dialog>

      <Page withMenu={false} title={"Создать пост"}>
        <section
          className={
            "w-full p-[40px] rounded-[20px] bg-white flex flex-col gap-[30px]"
          }>
          <Input
            onClick={() => setThemeDialogOpen(true)}
            readOnly={true}
            hint={"Тема"}
            placeholder={"Тема"}
            value={selectedTheme?.name ?? ""}
          />
          <Input
            name={"title"}
            onChange={handleInputChange}
            hint={"Заголовок"}
            placeholder={"Заголовок"}
          />
          {tags && <TagsSelect onChange={handleTagSelect} options={tags} />}

          <PreviewSelect
            onChange={(imageFile) => {
              setFormValues((prev) => ({ ...prev, image: imageFile }))
            }}
          />
          {/*<section className={"w-full"}>*/}
          {/*  <section className={"w-full"} ref={quillRef} />*/}
          {/*</section>*/}

          <Editor onChange={handleEditorChange} />

          <section className={"flex items-center mt-12 justify-between"}>
            <Select
              placeholder={"Тип поста"}
              selectPosition={"top"}
              size={"sm"}
              selected={selectedPostType}
              onChange={(option) => {
                /* @ts-ignore */
                setSelectedPostType(option)
              }}
              options={PostTypeOptions}
            />

            <Button
              disabled={!isSubmitAvailable}
              className={"px-5"}
              onClick={handlePublish}>
              Опубликовать
            </Button>
          </section>
        </section>
      </Page>
    </>
  )
}
