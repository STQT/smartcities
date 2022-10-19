import { Notification as TNotification } from "shared/types"

export const Notification = ({ title, description }: TNotification) => {
  return (
    <article
      className={"px-[40px] py-[20px] border-b-[0.5px] border-gray-300/30"}>
      <section className={"flex items-center justify-between"}>
        <section className={"flex gap-[20px] items-center"}>
          <div className={"w-[10px] h-[10px] bg-blue rounded-full"} />

          <div className={"flex flex-col"}>
            <h2
              className={"text-[18px]"}
              dangerouslySetInnerHTML={{ __html: title }}
            />
            <span
              className={"text-gray-400"}
              dangerouslySetInnerHTML={{ __html: description }}
            />
          </div>
        </section>
      </section>
    </article>
  )
}
