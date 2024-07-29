//* @jsx jsx */
import { css, jsx } from '@emotion/react';

export default function Darr({ centered }) {
  return (
    <div
      css={css`
        border: 1px solid var(--lavender);
        height: 25px;
        width: 25px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        ${centered && 'margin: 0 auto;'}
      `}
    >
      &darr;
    </div>
  );
}
