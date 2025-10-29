import { useMultipleSelection, useSelect } from 'downshift'
import React from 'react'

interface Option {
  value: string
  label: string
}

interface SelectProps {
  onChange: (selectedItems: Option[]) => void
  styles?: string
  placeholder?: string
  options?: Option[]
  label?: string
  inverted?: boolean
  initialSelectedItems?: Option[]
  disabled?: boolean
}

function Select({
  onChange,
  styles,
  placeholder,
  options = [],
  label,
  inverted = false,
  initialSelectedItems = [],
  disabled = false,
}: SelectProps) {
  const [isOpen, setIsOpen] = React.useState(false)
  const [highlightedIndex, setHighlightedIndex] = React.useState(-1)

  const {
    getSelectedItemProps,
    getDropdownProps,
    addSelectedItem,
    removeSelectedItem,
    selectedItems,
  } = useMultipleSelection<Option>({
    initialSelectedItems,
    onStateChange: (changes) => {
      onChange(changes.selectedItems || [])
    },
  })

  const handleToggleDropdown = () => {
    if (!disabled) {
      setIsOpen(!isOpen)
      setHighlightedIndex(-1)
    }
  }

  const handleSelectItem = (item: Option) => {
    addSelectedItem(item)
    setIsOpen(false)
    setHighlightedIndex(-1)
  }

  const handleRemoveItem = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    e.stopPropagation()
    const target = e.currentTarget
    const value = target.dataset.value
    const item = selectedItems.find((item) => item.value === value)
    if (item) {
      removeSelectedItem(item)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape' && isOpen) {
      setIsOpen(false)
      setHighlightedIndex(-1)
    }
    if (e.key === 'ArrowDown' && isOpen) {
      e.preventDefault()
      setHighlightedIndex((prev) =>
        prev < (options?.length || 0) - 1 ? prev + 1 : prev
      )
    }
    if (e.key === 'ArrowUp' && isOpen) {
      e.preventDefault()
      setHighlightedIndex((prev) => (prev > 0 ? prev - 1 : prev))
    }
    if (e.key === 'Enter' && isOpen && highlightedIndex >= 0) {
      e.preventDefault()
      const item = options?.[highlightedIndex]
      if (item) {
        handleSelectItem(item)
      }
    }
  }

  const baseBorderColor = inverted ? 'border-lavender' : 'border-ember'
  const baseBgColor = inverted ? 'bg-ember' : 'bg-lavender'
  const baseTextColor = inverted ? 'text-lavender' : 'text-ember'
  const menuBgColor = inverted ? 'bg-lavender' : 'bg-ember'
  const itemBorderColor = inverted ? 'border-ember' : 'border-lavender'
  const highlightedBgColor = inverted ? 'bg-ember/20' : 'bg-lavender/20'

  const getDisplayText = () => {
    if (selectedItems.length === 0) return placeholder
    if (selectedItems.length === 1) return selectedItems[0].label
    return `${selectedItems[0].label} (+${selectedItems.length - 1})`
  }

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element
      if (!target.closest('.select-container')) {
        setIsOpen(false)
        setHighlightedIndex(-1)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  return (
    <div
      className={`relative select-container ${styles || ''}`}
      onKeyDown={handleKeyDown}
    >
      <label className="text-sm font-medium uppercase w-full block mb-2">
        {label}
      </label>
      <button
        type="button"
        disabled={disabled}
        onClick={handleToggleDropdown}
        className={`
          text-base border w-full px-4 py-3 rounded-lg transition-all duration-200
          ${baseBorderColor} ${baseBgColor} ${baseTextColor}
          ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:opacity-80'}
          ${isOpen ? 'ring-2 ring-offset-2 ' + (inverted ? 'ring-lavender' : 'ring-ember') : ''}
        `}
        aria-label={`${label}: ${getDisplayText()}`}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        <span className="flex items-center justify-between">
          <span className="truncate">{getDisplayText()}</span>
          <svg
            className={`w-4 h-4 ml-2 transition-transform duration-200 ${
              isOpen ? 'rotate-180' : ''
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </span>
      </button>

      {isOpen && (
        <ul
          className={`
            absolute w-full z-50 rounded-lg shadow-lg border-2 mt-1 max-h-60 overflow-y-auto
            ${menuBgColor} ${baseBorderColor}
          `}
          role="listbox"
        >
          {(options || []).map((option: Option, index: number) => {
            const isSelected = selectedItems.some(
              (item) => item.value === option.value
            )
            const isHighlighted = highlightedIndex === index

            return isSelected ? (
              <li
                key={`${option.value}-${index}`}
                className={`
                  px-4 py-3 border-b last:border-b-0 transition-all duration-150
                  ${itemBorderColor} ${baseTextColor}
                  ${isHighlighted ? highlightedBgColor : ''}
                  flex items-center justify-between group
                `}
                role="option"
                aria-selected={true}
              >
                <span className="flex-1">{option.label}</span>
                <button
                  type="button"
                  data-value={option.value}
                  onClick={handleRemoveItem}
                  className={`
                    ml-2 p-1 rounded transition-all duration-150
                    ${inverted ? 'hover:bg-ember/20' : 'hover:bg-lavender/20'}
                    focus:outline-none focus:ring-2 focus:ring-offset-1
                    ${inverted ? 'focus:ring-lavender' : 'focus:ring-ember'}
                  `}
                  aria-label={`Remove ${option.label}`}
                >
                  <svg
                    className="w-3 h-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </li>
            ) : (
              <li
                key={`${option.value}-${index}`}
                className={`
                  px-4 py-3 border-b last:border-b-0 transition-all duration-150 cursor-pointer
                  ${itemBorderColor} ${baseTextColor}
                  ${isHighlighted ? highlightedBgColor : ''}
                  hover:${inverted ? 'bg-ember/10' : 'bg-lavender/10'}
                `}
                onClick={() => handleSelectItem(option)}
                role="option"
                aria-selected={false}
              >
                {option.label}
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}

export default Select
