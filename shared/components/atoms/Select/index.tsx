import { Fragment } from "react"
import { Listbox, Transition } from "@headlessui/react"
import { ChevronDownIcon } from "@heroicons/react/20/solid"
import cn from "classnames"

interface Option {
  label: string
  value: string | number
}
interface SelectProps {
  options: Option[]
  selected?: Option
  placeholder?: string
  hint?: string

  size?: "sm" | "md"
  selectPosition?: "top" | "bottom"
}

export const Select = ({
  selected,
  options,
  placeholder,
  size = "md",
  hint,
  selectPosition = "bottom"
}: SelectProps) => {
  const classes = cn(
    "relative bg-gray-100 w-full px-[20px] border border-gray-200 rounded-[10px] outline-none text-left",
    "transition-all focus:bg-blue-pale focus:border-blue",
    {
      "py-[13px] text-[14px]": size === "sm",
      "py-[18px] text-[16px]": size === "md"
    }
  )

  const optionsClasses = cn(
    "absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm",
    { "bottom-14": selectPosition === "top" }
  )

  return (
    <div className={"flex flex-col"}>
      {hint && (
        <span
          className={"ml-4 mb-[4px] text-[16px] text-gray-400 font-semibold"}>
          {hint}
        </span>
      )}
      <Listbox value={selected} onChange={() => {}}>
        <div className="relative">
          <Listbox.Button className={classes}>
            {selected?.value && (
              <span className="block truncate">{selected.value}</span>
            )}

            {placeholder && (
              <span className={"text-gray-400 pr-3"}>{placeholder}</span>
            )}
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronDownIcon
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0">
            <Listbox.Options className={optionsClasses}>
              {options.map((option) => (
                <Listbox.Option
                  key={option.value}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-4 pr-4 ${
                      active ? "bg-amber-100 text-amber-900" : "text-gray-900"
                    }`
                  }
                  value={option}>
                  {({ selected }) => (
                    <span
                      className={`block truncate ${
                        selected ? "font-medium" : "font-normal text-gray-400"
                      }`}>
                      {option.label}
                    </span>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  )
}
