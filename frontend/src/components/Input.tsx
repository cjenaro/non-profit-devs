import { ChangeEvent } from 'react'

interface InputProps {
  placeholder?: string
  label?: string
  name?: string
  id?: string
  type?: string
  inverted?: boolean
  className?: string
  value?: string
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void
}

export function Input({
  placeholder,
  label,
  name,
  id,
  type = 'text',
  inverted = false,
  className = '',
}: InputProps) {
  const beforeColor = inverted ? 'before:bg-ember' : 'before:bg-lavender'
  const inputBorder = inverted ? 'border-lavender' : 'border-ember'
  const inputBg = inverted ? 'bg-ember' : 'bg-lavender'
  const inputText = inverted ? 'text-lavender' : 'text-ember'

  return (
    <label
      className={`text-base uppercase w-full block relative before:content-[''] before:w-1.25 before:h-full before:absolute before:top-0 before:-left-4 before:scale-x-0 before:origin-right before:transition-transform before:duration-200 focus-within:before:scale-x-100 ${beforeColor} ${className}`}
    >
      {label}
      <input
        type={type}
        name={name}
        id={id}
        placeholder={placeholder}
        className={`mt-1 text-base ${inputBorder} ${inputBg} w-[calc(100%-32px)] px-4 py-2.5 ${inputText} border`}
      />
    </label>
  )
}
