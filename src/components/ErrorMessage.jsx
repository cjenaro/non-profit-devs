//* @jsx jsx */
import { jsx, css } from '@emotion/react';

export default function ErrorMessage({ error }) {
  let actualError = error;
  if (error && typeof error !== 'string' && error.length) {
    actualError = error[0];
  }
  if (!actualError) return null;

  return (
    <pre
      css={css`
        background-color: #c6542f;
        color: var(--lavender);
        padding: 10px 10px 10px 14px;
        border-radius: 6px;
        border-left: 4px solid var(--lavender);
        white-space: pre-wrap;
      `}
    >
      {typeof actualError === 'string'
        ? actualError
        : JSON.stringify(
            actualError.message.replace('GraphQL error: ', ''),
            null,
            2
          )}
    </pre>
  );
}
