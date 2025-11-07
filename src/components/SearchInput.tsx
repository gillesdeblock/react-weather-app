import { FocusEventHandler, type RefObject } from 'react'
import { twMerge } from 'tailwind-merge'

type SearchInputProps = {
  value: string
  name?: string
  placeholder?: string
  className?: string
  onInput: (newValue: string) => void
  onFocus: FocusEventHandler<HTMLInputElement>
  onEnter: (value: string) => void
  ref?: RefObject<any>
}

function SearchInput({
  value,
  name,
  placeholder = '',
  className = '',
  onInput,
  onFocus,
  onEnter,
  ref,
}: SearchInputProps) {
  const onKeyDown = (key: string) => {
    if (key === 'Enter') {
      onEnter(value)
    }
  }

  return (
    <input
      ref={ref}
      className={twMerge('border px-2 py-1 outline-none focus:bg-sky-50/20', className)}
      name={name}
      value={value}
      placeholder={placeholder}
      onInput={(e) => onInput(e.currentTarget.value)}
      onFocus={onFocus}
      onKeyDown={(e) => onKeyDown(e.key)}
      type="text"
    ></input>
  )
}

export default SearchInput
