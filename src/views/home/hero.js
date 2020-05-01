//* @jsx jsx */
import { jsx, css } from "@emotion/core";

export default function Hero() {
  return (
    <section
      css={css`
        padding-top: 40px;
        padding-bottom: 40px;
      `}
    >
      <div
        css={css`
          max-width: var(--max-width);
          margin: 0 auto;
        `}
      >
        <div
          css={css`
            width: 300px;
            height: 300px;
            display: block;
            margin: 0 auto;
            border: 1px solid var(--lavender);

            @media (min-width: 768px) {
              margin: 0 auto 0 0;
            }
          `}
        >
          <h1
            css={css`
              text-transform: uppercase;
              font-size: 82px;
              margin: 0 -12px 0;
              -webkit-text-stroke: 2px var(--ember);
              letter-spacing: 4px;
            `}
          >
            Non Profit Devs
          </h1>
        </div>
        <div
          css={css`
            display: none;
          `}
        ></div>
      </div>
    </section>
  );
}
