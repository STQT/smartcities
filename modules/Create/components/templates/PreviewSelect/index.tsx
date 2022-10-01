import { PhotoIcon } from "@heroicons/react/24/outline"
import { ChangeEvent, useEffect, useState } from "react"

interface PreviewSelectProps {
  onChange: (file: File) => void
}

export const PreviewSelect = ({ onChange }: PreviewSelectProps) => {
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

  useEffect(() => {
    if (image && image.file) {
      onChange(image.file)
    }
  }, [image])

  return (
    <section className={"flex flex-col"}>
      <span className={"ml-4 mb-[4px] text-[16px] text-gray-400 font-semibold"}>
        Превью
      </span>
      <div
        className={
          "w-full p-8 bg-gray-100 border border-gray-200 overflow-hidden relative rounded-[20px] flex flex-col justify-center items-center"
        }>
        {!image && <PhotoIcon className={"w-32 h-32 text-gray-300"} />}

        {image && <img alt={"preview"} src={image.preview} />}

        <form className={"mt-6"}>
          <input
            onChange={handleImageChange}
            accept="image/png, image/jpeg"
            id={"preview"}
            className={"hidden"}
            type={"file"}
          />
          <label
            htmlFor={"preview"}
            className={"px-3 py-3 bg-blue text-white rounded-[10px]"}>
            Кликните чтобы выбрать изображение
          </label>
        </form>
      </div>
    </section>
  )
}
