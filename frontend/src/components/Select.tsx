import React from 'react';
import { useSelect, useMultipleSelection } from 'downshift';

interface Option {
  value: string;
  label: string;
}

interface SelectProps {
  onChange: (selectedItems: Option[]) => void;
  styles?: string;
  placeholder?: string;
  options?: Option[];
  label?: string;
  inverted?: boolean;
  initialSelectedItems?: Option[];
}

function Select({
  onChange,
  styles,
  placeholder,
  options = [],
  label,
  inverted = false,
  initialSelectedItems = [],
}: SelectProps) {
  const {
    getSelectedItemProps,
    getDropdownProps,
    addSelectedItem,
    removeSelectedItem,
    selectedItems,
  } = useMultipleSelection<Option>({
    initialSelectedItems,
    onStateChange: (changes: any) => {
      onChange(changes.selectedItems);
    },
  });

  const {
    isOpen,
    getToggleButtonProps,
    getLabelProps,
    getMenuProps,
    highlightedIndex,
    getItemProps,
    selectItem,
  } = useSelect<Option | null>({
    items: options,
    onStateChange: (changes: any) => {
      const { type, selectedItem } = changes;
      switch (type) {
        case useSelect.stateChangeTypes.MenuKeyDownEnter:
        case useSelect.stateChangeTypes.MenuKeyDownSpaceButton:
        case useSelect.stateChangeTypes.ItemClick:
        case useSelect.stateChangeTypes.MenuBlur:
          if (selectedItem) {
            addSelectedItem(selectedItem);
            selectItem(null);
          }
          break;
        default:
          break;
      }
    },
  });

  const handleRemoveItem = (e: React.MouseEvent<HTMLButtonElement>) => {
    const target = e.target as any;
    const value = target.dataset.value;
    const item = (selectedItems as any).find(
      (item: any) => item.value === value
    );
    if (item) {
      removeSelectedItem(item);
    }
  };

  const baseBorderColor = inverted ? 'border-lavender' : 'border-ember';
  const baseBgColor = inverted ? 'bg-ember' : 'bg-lavender';
  const baseTextColor = inverted ? 'text-lavender' : 'text-ember';
  const menuBgColor = inverted ? 'bg-lavender' : 'bg-ember';
  const itemBorderColor = inverted ? 'border-ember' : 'border-lavender';

  return (
    <div className={`relative ${styles || ''}`}>
      <label {...getLabelProps()} className="text-base uppercase w-full block">
        {label}:
      </label>
      <button
        {...getToggleButtonProps(
          getDropdownProps({ preventKeyAction: isOpen })
        )}
        type="button"
        className={`text-base border w-full px-4 py-2.5 ${baseBorderColor} ${baseBgColor} ${baseTextColor}`}
      >
        {(selectedItems as any).length > 0
          ? (selectedItems as any).length > 1
            ? `${(selectedItems as any)[0].label} (+ ${
                (selectedItems as any).length - 1
              })`
            : (selectedItems as any)[0].label
          : placeholder}
      </button>
      <ul {...getMenuProps()} className={`absolute w-full z-10 ${menuBgColor}`}>
        {isOpen &&
          (options || []).map((option: Option, index: number) =>
            !(selectedItems as any)
              .map((item: any) => item.value)
              .includes(option.value) ? (
              <li
                className={`px-1.5 py-1.5 border-b border-l border-r ${itemBorderColor} ${
                  highlightedIndex === index ? 'bg-red-600' : ''
                }`}
                key={`${option.value}-${index}`}
                {...getItemProps({ item: option, index })}
              >
                {option.label}
              </li>
            ) : (
              <li
                className={`px-1.5 py-1.5 border-b border-l border-r ${itemBorderColor} bg-red-600 flex items-center justify-between`}
                key={`${option.value}-${index}`}
                {...getSelectedItemProps({ selectedItem: option, index })}
              >
                {option.label}
                <button
                  type="button"
                  data-value={option.value}
                  onClick={handleRemoveItem}
                  className="bg-transparent cursor-pointer border-0 text-base"
                >
                  &times;
                </button>
              </li>
            )
          )}
      </ul>
    </div>
  );
}

export default Select;

