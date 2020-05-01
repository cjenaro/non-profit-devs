//* @jsx jsx */
import { jsx, css } from "@emotion/core";

export default function Hero() {
  return (
    <section
      css={css`
        padding-top: 40px;
        min-height: 415px;
      `}
    >
      <div
        css={css`
          width: 300px;
          height: 300px;
          display: block;
          margin: 0 auto;
          border: 1px solid var(--lavender);
        `}
      >
        <h1
          css={css`
            text-transform: uppercase;
            font-size: 82px;
            margin: 0 -12px 0;
            -webkit-text-stroke: 2px var(--ember);
          `}
        >
          Non Profit Devs
        </h1>
      </div>
    </section>
  );
}
