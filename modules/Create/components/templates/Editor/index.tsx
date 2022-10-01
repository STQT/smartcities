import dynamic from "next/dynamic"
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false })
import { formats, modules } from "./constants/config"

interface EditorProps {
  onChange: (value: string) => void
}

export const Editor = ({ onChange }: EditorProps) => {
  const handleChange = (value: string) => {
    onChange(value)
  }

  return (
    <ReactQuill
      onChange={handleChange}
      theme={"snow"}
      modules={modules}
      formats={formats}
    />
  )
}
