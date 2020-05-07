//* @jsx jsx */
import { jsx, css } from "@emotion/core";
import { useSelect } from "downshift";
import { useEffect } from "react";

function Select({ onChange, styles, placeholder, options }) {
  const {
    isOpen,
    selectedItem,
    getToggleButtonProps,
    getLabelProps,
    getMenuProps,
    highlightedIndex,
    getItemProps,
  } = useSelect({ items: options });

  useEffect(() => {
    onChange(selectedItem);
  }, [selectedItem, onChange]);

  return (
    <div
      css={css`
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
        Skills:
      </label>
      <button
        {...getToggleButtonProps()}
        type="button"
        css={css`
          font-size: 16px;
          border: 1px solid var(--lavender);
          background-color: var(--ember);
          width: 100%;
          padding: 10px 16px;
          color: var(--lavender);
        `}
      >
        {(selectedItem && selectedItem.skill) || placeholder}
      </button>
      <ul {...getMenuProps()}>
        {isOpen &&
          options.map((option, index) => (
            <li
              style={
                highlightedIndex === index ? { backgroundColor: "#c6542f" } : {}
              }
              css={css`
                padding: 7px;
                border-bottom: 1px solid var(--lavender);
                border-left: 1px solid var(--lavender);
                border-right: 1px solid var(--lavender);
              `}
              key={`${option.id}-${index}`}
              {...getItemProps({ option, index })}
            >
              {option.skill}
            </li>
          ))}
      </ul>
    </div>
  );
}

export default Select;
