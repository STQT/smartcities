import { ChangeEvent, useEffect, useState } from "react"

import { Button, Input, Select, TextArea } from "shared/components/atoms"
import { Page } from "shared/components/templates"
import { Dialog } from "shared/components/molecules"
import { XMarkIcon } from "@heroicons/react/24/outline"

import { useAppDispatch, useAppSelector } from "store"
import { fetchFlows } from "store/slices/main"
import { Theme } from "shared/types"
import { ARTICLE, BASE } from "services/api"

import { ThemesSection } from "./components/templates"

export const CreatePage = () => {
  const { flows } = useAppSelector((state) => state.main)
  const dispatch = useAppDispatch()

  const [isFlowDialogOpen, setFlowDialogOpen] = useState(false)
  const [isThemeDialogOpen, setThemeDialogOpen] = useState(false)

  const [selectedFlow, setSelectedFlow] = useState<Theme>()

  // Current Selected Theme
  const [selectedTheme, setSelectedTheme] = useState<Theme>()

  // Themes by Level
  const [firstLevelThemes, setFirstLevelThemes] = useState<Theme[]>()
  const [secondLevelThemes, setSecondLevelThemes] = useState<Theme[]>()
  const [thirdLevelThemes, setThirdLevelThemes] = useState<Theme[]>()

  const [formValues, setFormValues] = useState({
    title: "",
    subtitle: "",
    description: ""
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
      })
    }

    clearThemes()
  }, [selectedFlow])

  const handleFlowSelect = (flow: Theme) => {
    setSelectedFlow(flow)
    setFlowDialogOpen(false)
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

  const handlePublish = () => {
    ARTICLE.create({
      title: formValues.title,
      description: formValues.description,
      theme: selectedTheme?.id,
      tags_ids: [1, 3]
    }).then((res) => {
      console.log(res)
    })
  }

  useEffect(() => {
    dispatch(fetchFlows())
  }, [])

  return (
    <>
      <Dialog isOpen={isFlowDialogOpen} setOpen={setFlowDialogOpen}>
        <section className={"flex items-center justify-between"}>
          <h1 className={"text-xl font-semibold"}>Выберите поток</h1>
          <button
            className={"w-[32px] outline-none h-[32px] text-gray-400"}
            onClick={() => setFlowDialogOpen(false)}>
            <XMarkIcon />
          </button>
        </section>

        <section className={"flex flex-col mt-[30px] gap-[10px]"}>
          {flows &&
            flows.map((flow) => (
              <button
                onClick={() => handleFlowSelect(flow)}
                className={
                  "w-full rounded-[10px] text-left px-5 bg-gray-100 h-16 transition-all hover:bg-gray-200"
                }>
                {flow.name}
              </button>
            ))}
        </section>
      </Dialog>

      <Dialog
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
            onClick={() => setFlowDialogOpen(true)}
            hint={"Поток"}
            readOnly={true}
            placeholder={"Поток"}
            value={selectedFlow?.name}
          />

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

          <Input
            name={"subtitle"}
            onChange={handleInputChange}
            hint={"Подзаголовок (необязательное поле)"}
            placeholder={"Подзаголовок"}
          />

          <TextArea
            name={"description"}
            onChange={handleInputChange}
            hint={"Контент"}
            placeholder={"Напишите что нибудь..."}
          />

          <section className={"flex items-center justify-between"}>
            <Select
              placeholder={"Тип поста"}
              selectPosition={"top"}
              size={"sm"}
              options={[
                { label: "Вопрос", value: "QUESTION" },
                { label: "Статья", value: "ARTICLE" },
                { label: "Новость", value: "NEWS" }
              ]}
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
