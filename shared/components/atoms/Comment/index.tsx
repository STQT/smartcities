import { ChatBubbleLeftIcon } from "@heroicons/react/24/solid"

interface CommentProps {
  comments_count: number
}

export const Comment = ({ comments_count }: CommentProps) => {
  return (
    <div className={"flex gap-1 items-center text-gray-300 text-[14px]"}>
      <ChatBubbleLeftIcon className={"w-[20px] h-[20px]"} />
      <span>{comments_count}</span>
    </div>
  )
}
