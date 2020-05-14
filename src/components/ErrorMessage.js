//* @jsx jsx */
import { jsx, css } from "@emotion/core";

export default function ErrorMessage({ error }) {
  if (!error) return null;

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
      {JSON.stringify(error.message.replace("GraphQL error: ", ""), null, 2)}
    </pre>
  );
}
