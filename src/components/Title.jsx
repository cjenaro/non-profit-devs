//* @jsx jsx */
import { css, jsx } from '@emotion/core';

export default function Title({ color, borderColor, children, styles }) {
  return (
    <h3
      css={css`
        position: relative;
        font-size: 38px;
        color: ${color};
        width: max-content;
        -webkit-text-stroke: 1px ${borderColor};
        z-index: 2;
        margin: 0 auto;

        &::after {
          content: '';
          width: 100%;
          height: 7px;
          background-color: ${borderColor};
          bottom: 6px;
          z-index: -1;
          left: 0;
          position: absolute;
        }

        ${styles && styles}
      `}
    >
      {children}
    </h3>
  );
}
