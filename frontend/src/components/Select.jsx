//* @jsx jsx */
import { jsx, css } from '@emotion/react';
import { useSelect, useMultipleSelection } from 'downshift';

function Select({
  onChange,
  styles,
  placeholder,
  options,
  label,
  inverted,
  initialSelectedItems,
}) {
  const {
    getSelectedItemProps,
    getDropdownProps,
    addSelectedItem,
    removeSelectedItem,
    selectedItems,
  } = useMultipleSelection({
    initialSelectedItems: initialSelectedItems || [],
    onSelectedItemsChange: (changes) => {
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
  } = useSelect({
    items: options || [],
    onStateChange: ({ type, selectedItem }) => {
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

  const handleRemoveItem = (e) => {
    const value = e.target.dataset.value;
    removeSelectedItem(selectedItems.find((item) => item.value === value));
  };

  return (
    <div
      css={css`
        position: relative;
        ${styles}
      `}
    >
      <label
        {...getLabelProps()}
        css={css`
          font-size: 16px;
          text-transform: uppercase;
          width: 100%;
        `}
      >
        {label}:
      </label>
      <button
        {...getToggleButtonProps(
          getDropdownProps({ preventKeyAction: isOpen })
        )}
        type="button"
        css={css`
          font-size: 16px;
          border: 1px solid ${inverted ? 'var(--lavender)' : 'var(--ember)'};
          background-color: ${inverted ? 'var(--ember)' : 'var(--lavender)'};
          width: 100%;
          padding: 10px 16px;
          color: ${inverted ? 'var(--lavender)' : 'var(--ember)'};
        `}
      >
        {selectedItems.length > 0
          ? selectedItems.length > 1
            ? `${selectedItems[0].label} (+ ${selectedItems.length - 1})`
            : selectedItems[0].label
          : placeholder}
      </button>
      <ul
        {...getMenuProps()}
        css={css`
          position: absolute;
          width: 100%;
          z-index: 2;
          background-color: ${inverted ? 'var(--lavender)' : 'var(--ember)'};
        `}
      >
        {isOpen &&
          options &&
          options.map((option, index) =>
            !selectedItems.map((item) => item.value).includes(option.value) ? (
              <li
                style={
                  highlightedIndex === index
                    ? { backgroundColor: '#c6542f' }
                    : {}
                }
                css={css`
                  padding: 7px;
                  border-bottom: 1px solid
                    ${!inverted ? 'var(--lavender)' : 'var(--ember)'};
                  border-left: 1px solid
                    ${!inverted ? 'var(--lavender)' : 'var(--ember)'};
                  border-right: 1px solid
                    ${!inverted ? 'var(--lavender)' : 'var(--ember)'};
                `}
                key={`${option.value}-${index}`}
                {...getItemProps({ option, index })}
              >
                {option.label}
              </li>
            ) : (
              <li
                css={css`
                  padding: 7px;
                  border-bottom: 1px solid
                    ${!inverted ? 'var(--lavender)' : 'var(--ember)'};
                  border-left: 1px solid
                    ${!inverted ? 'var(--lavender)' : 'var(--ember)'};
                  border-right: 1px solid
                    ${!inverted ? 'var(--lavender)' : 'var(--ember)'};
                  background-color: #c6542f;
                  display: flex;
                  align-items: center;
                  justify-content: space-between;
                `}
                key={`${option.value}-${index}`}
                {...getSelectedItemProps({ option, index })}
              >
                {option.label}
                <button
                  type="button"
                  data-value={option.value}
                  onClick={handleRemoveItem}
                  css={css`
                    background-color: transparent;
                    cursor: pointer;
                    border: 0;
                    font-size: 1rem;
                    color: currentCOlor;
                  `}
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
