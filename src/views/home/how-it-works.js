//* @jsx jsx */
import { jsx, css } from "@emotion/core";
import Title from "../../components/Title";
import Steps from "../../components/Steps";

export default function HowItWorks() {
  return (
    <section
      css={css`
        padding: 50px 0 100px;
        position: relative;

        .text-center {
          text-align: center;
        }

        .block {
          display: block;
        }
      `}
    >
      <svg
        css={css`
          display: none;
          position: absolute;
          opacity: 0.1;
          top: 120px;
          left: -10%;
          transform: rotateY(180deg) scale(1.5);
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
      <div className="container">
        <Title
          styles={css`
            margin-bottom: 50px;
          `}
          color="var(--ember)"
          borderColor="var(--lavender)"
        >
          How it works.
        </Title>
        <div
          css={css`
            display: flex;
            flex-direction: column;

            @media (min-width: 768px) {
              flex-direction: row;
              > div {
                flex: 1;
                &:first-of-type {
                  margin-right: 20px;
                }
              }
            }
          `}
        >
          <Steps id="ONG-steps">
            <p
              className="text-center"
              css={css`
                margin-top: 0;
              `}
            >
              Non profits
            </p>
            <p className="text-center">Pitch your project/website</p>
            <div>
              <p
                css={css`
                  margin-bottom: 2px;
                  text-align: center;
                `}
              >
                We'll contact you as fast as we can
              </p>
              <small className="text-center block">
                Please keep in mind most of us have other jobs to take care of.
              </small>
            </div>
          </Steps>
          <Steps
            styles={css`
              margin-top: 55px;
              @media (min-width: 768px) {
                margin-top: 0;
              }
            `}
          >
            <p
              className="text-center"
              css={css`
                margin-top: 0px;
              `}
            >
              Developers/Designers
            </p>
            <p className="text-center">After joining browse all projects</p>
            <p className="text-center">Find one that you fin interesting</p>
            <p className="text-center">Sign up for it</p>
          </Steps>
        </div>
      </div>
    </section>
  );
}
