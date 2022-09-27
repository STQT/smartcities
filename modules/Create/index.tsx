import { ChangeEvent, useEffect, useState } from "react"

import { Button, Input, Select } from "shared/components/atoms"
import { Page } from "shared/components/templates"
import { Dialog } from "shared/components/molecules"
import { XMarkIcon } from "@heroicons/react/24/outline"

import { useAppDispatch, useAppSelector } from "store"
import { fetchFlows, fetchTags } from "store/slices/main"
import { PostTypes, Theme } from "shared/types"
import { ARTICLE, BASE } from "services/api"

import { useQuill } from "react-quilljs"

import { TagsSelect, ThemesSection } from "./components/templates"

const PostTypeOptions: { label: string; value: PostTypes }[] = [
  { label: "Вопрос", value: "QUESTION" },
  { label: "Статья", value: "ARTICLE" },
  { label: "Новость", value: "NEWS" }
]

export const CreatePage = () => {
  const { flows, tags } = useAppSelector((state) => state.main)
  const dispatch = useAppDispatch()

  const { quill, quillRef } = useQuill()

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
  const [formValues, setFormValues] = useState({
    title: "",
    tags_ids: []
  })

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (e.target.name) {
      setFormValues((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }
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

  const handlePublish = () => {
    if (quill) {
      ARTICLE.create({
        title: formValues.title,
        description: quill?.root.innerHTML,
        theme: selectedTheme?.id,
        tags_ids: formValues.tags_ids
      }).then((res) => {
        console.log(res)
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

        <section className={"flex flex mt-[30px] gap-[10px] w-[1200px]"}>
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

          <section className={"w-full"}>
            <section className={"w-full"} ref={quillRef} />
          </section>

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

            <Button className={"px-5"} onClick={handlePublish}>
              Опубликовать
            </Button>
          </section>
        </section>
      </Page>
    </>
  )
}
