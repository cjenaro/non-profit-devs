import React from 'react';
//* @jsx jsx */
import { css, jsx } from '@emotion/core';
import Darr from './Darr.jsx';

export default function Steps({ children, id, styles }) {
  return (
    <div
      css={css`
        border: 1px solid var(--lavender);
        padding: 20px;
        ${styles && styles}
      `}
    >
      {React.Children.map(children, (child, i) => (
        <React.Fragment key={`${id}-child-${i}`}>
          {child}
          {i !== children.length - 1 && <Darr centered />}
        </React.Fragment>
      ))}
    </div>
  );
}
