import { Fragment } from "react"
import { Transition } from "@headlessui/react"
import cn from "classnames"

interface PostLoadingProps {
  isLoading: boolean
  className?: string
}

export const PostLoading = ({ isLoading, className }: PostLoadingProps) => {
  const classes = cn(
    "h-32 border rounded-[20px] bg-white flex items-center justify-center",
    className
  )

  return isLoading ? (
    <Transition appear show={true} as={Fragment}>
      <Transition.Child
        as={Fragment}
        enter="ease-out duration-300"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="ease-in duration-200"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95">
        <section className={classes}>
          <div className="dot-falling" />
        </section>
      </Transition.Child>
    </Transition>
  ) : null
}
