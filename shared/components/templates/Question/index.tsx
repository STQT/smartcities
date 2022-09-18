import Image from "next/image"
import {
  HeartIcon,
  ChatBubbleLeftIcon,
  EyeIcon
} from "@heroicons/react/24/solid"
import type { Question as TQuestion } from "shared/types"
import { Tag } from "../../atoms"
import { useState } from "react"
import { Dialog } from "../../molecules"

interface QuestionProps {
  question: TQuestion
}

export const Question = ({ question }: QuestionProps) => {
  const [isDialogOpen, setDialogOpen] = useState(false)
  const [isLiked, setLike] = useState(false)

  return (
    <>
      <article className={"rounded-[20px] bg-white px-[20px] py-[32px]"}>
        <section className={"flex flex-col"}>
          <h1 className={"text-blue text-[18px]"}>{question.title}</h1>
          <div
            className={
              "max-w-full h-[350px] w-full relative overflow-hidden rounded-[10px] my-[20px]"
            }></div>
          <p className={"text-[16px] mb-[20px]"}>{question.description}</p>

          {question.tags.length > 0 && (
            <section className={"mt-[10px] flex gap-2"}>
              {question.tags.map((tag) => (
                <Tag key={tag.id} {...tag} />
              ))}
            </section>
          )}

          <section className={"mt-auto flex w-full items-end justify-between"}>
            <section
              className={
                "flex items-center gap-[40px] text-[14px] text-gray-300"
              }>
              <button className={"flex gap-1 items-center"}>
                <HeartIcon className={"w-[20px] h-[20px]"} />
                <span>{5}</span>
              </button>

              <button className={"flex gap-1 items-center"}>
                <EyeIcon className={"w-[20px] h-[20px]"} />
                <span>{question.view_count}</span>
              </button>

              <button
                onClick={() => setDialogOpen(true)}
                className={"flex gap-1 items-center"}>
                <ChatBubbleLeftIcon className={"w-[20px] h-[20px]"} />
                <span>5k</span>
              </button>
            </section>

            <button
              className={
                "px-[20px] py-[16px] text-blue border border-blue rounded-[10px] transition-all hover:bg-blue hover:text-white"
              }>
              Читать далее
            </button>
          </section>
        </section>
      </article>

      <Dialog
        isOpen={isDialogOpen}
        setOpen={setDialogOpen}
        title={"Комментарии"}>
        <h1>H</h1>
      </Dialog>
    </>
  )
}
