//* @jsx jsx /*
import { jsx, css } from "@emotion/core";

export default function Input({ placeholder, label, name, id, type, styles }) {
  return (
    <label
      css={css`
        font-size: 16px;
        text-transform: uppercase;
        width: 100%;
        display: block;

        input {
          font-size: 16px;
          border: 1px solid var(--lavender);
          background-color: var(--ember);
          width: calc(100% - 32px);
          padding: 10px 16px;
          color: var(--lavender);
        }

        ${styles}
      `}
    >
      {label}
      <input
        type={type ? type : "text"}
        name={name}
        id={id}
        placeholder={placeholder}
      />
    </label>
  );
}
