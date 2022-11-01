import { Avatar } from "shared/components/atoms"

export const User = () => {
  return (
    <article
      className={
        "w-full h-24 hover:bg-gray-200 transition-all cursor-pointer flex items-center gap-4 p-4 bg-white rounded-xl border"
      }>
      <Avatar
        size={50}
        src={"https://api.smartcities.uz/media/Users/Avatar.jpeg"}
      />

      <section className={"flex flex-col"}>
        <h4 className={"text-xl font-semibold"}>Kamran Rakhimov</h4>

        <div className={"text-[16px] items-center flex"}>
          <span>Software Engineer</span>
          <div
            className={"w-[5px] h-[5px] mx-[10px] bg-[#4D85CF] rounded-full"}
          />
          <span>Google</span>
        </div>
      </section>
    </article>
  )
}
