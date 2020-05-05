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
          position: relative;
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
        <svg
          css={css`
            display: none;
            position: absolute;
            opacity: 0.1;
            top: 20px;
            right: -35%;
            color: var(--lavender);
            @media (min-width: 768px) {
              display: block;
            }
          `}
          id="BRICKS"
          xmlns="http://www.w3.org/2000/svg"
          width="610"
          height="268"
          viewBox="0 0 610 268"
        >
          <rect
            id="_5"
            data-name="5"
            width="230"
            height="74"
            rx="5"
            transform="translate(252 194)"
            fill="currentColor"
          />
          <rect
            id="_4"
            data-name="4"
            width="230"
            height="74"
            rx="5"
            transform="translate(0 194)"
            fill="currentColor"
          />
          <rect
            id="_3"
            data-name="3"
            width="230"
            height="76"
            rx="5"
            transform="translate(380 96)"
            fill="currentColor"
          />
          <rect
            id="_2"
            data-name="2"
            width="232"
            height="76"
            rx="5"
            transform="translate(126 96)"
            fill="currentColor"
          />
          <rect
            id="_1"
            data-name="1"
            width="230"
            height="74"
            rx="5"
            fill="currentColor"
          />
        </svg>
      </div>
    </section>
  );
}
