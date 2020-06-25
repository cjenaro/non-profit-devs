//* @jsx jsx */
import { jsx, css } from '@emotion/core';

export default function Divider({ color, backgroundColor, label, styles }) {
  return (
    <div
      css={css`
        background-color: ${backgroundColor};
        width: 100%;
        ${styles}
      `}
    >
      <p
        css={css`
          color: ${color};
          margin: 0 auto;
          text-align: center;
          text-transform: uppercase;
        `}
      >
        {label}
      </p>
    </div>
  );
}
