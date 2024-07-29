//* @jsx jsx /*
import { jsx, css } from '@emotion/react';

export default function Input({
  placeholder,
  label,
  name,
  id,
  type,
  inverted,
  styles,
}) {
  return (
    <label
      css={css`
        font-size: 16px;
        text-transform: uppercase;
        width: 100%;
        display: block;
        position: relative;

        &::before {
          content: '';
          width: 5px;
          height: 100%;
          background-color: ${!inverted ? 'var(--lavender)' : 'var(--ember)'};
          position: absolute;
          top: 0;
          left: -15px;
          transform: scaleX(0);
          transform-origin: right;
          transition: transform 0.2s ease-in-out;
        }

        &:focus-within {
          &::before {
            transform: scaleX(1);
          }
        }

        input {
          margin-top: 4px;
          font-size: 16px;
          border: 1px solid ${!inverted ? 'var(--ember)' : 'var(--lavender)'};
          background-color: ${!inverted ? 'var(--lavender)' : 'var(--ember)'};
          width: calc(100% - 32px);
          padding: 10px 16px;
          color: ${!inverted ? 'var(--ember)' : 'var(--lavender)'};
        }

        ${styles}
      `}
    >
      {label}
      <input
        type={type ? type : 'text'}
        name={name}
        id={id}
        placeholder={placeholder}
      />
    </label>
  );
}
