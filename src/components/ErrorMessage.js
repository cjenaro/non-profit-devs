//* @jsx jsx */
import { jsx, css } from "@emotion/core";

export default function ErrorMessage({ error }) {
  if (!error) return null;

  return (
    <pre
      css={css`
        background-color: var(--lavender);
        color: var(--ember);
        padding: 10px 10px 10px 14px;
        border-radius: 6px;
        border-left: 4px solid var(--ember);
      `}
    >
      {JSON.stringify(error.message, null, 2)}
    </pre>
  );
}
