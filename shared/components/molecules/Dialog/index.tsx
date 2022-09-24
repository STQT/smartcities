import { Dispatch, Fragment, ReactNode, SetStateAction, useState } from "react"
import { Dialog as HDialog, Transition } from "@headlessui/react"
import cn from "classnames"

interface DialogProps {
  isOpen: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
  children: ReactNode
  title?: string
  closeOnOverlayClick?: boolean
  width?: string
}

export const Dialog = ({
  isOpen,
  setOpen,
  title,
  children,
  closeOnOverlayClick = true,
  width
}: DialogProps) => {
  function closeModal() {
    setOpen(false)
  }

  const panelClasses = cn(
    "w-full transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all",
    width ? width : "max-w-md"
  )

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <HDialog
        as="div"
        className="relative z-50"
        onClose={closeOnOverlayClick ? closeModal : () => {}}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0">
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95">
              <HDialog.Panel className={panelClasses}>
                {title && (
                  <HDialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900">
                    {title}
                  </HDialog.Title>
                )}
                {children}
              </HDialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </HDialog>
    </Transition>
  )
}
