//* @jsx jsx */
import { jsx, css } from "@emotion/core";
import Title from "../../components/Title";
import Steps from "../../components/Steps";

export default function HowItWorks() {
  return (
    <section
      css={css`
        padding: 50px 0;

        .text-center {
          text-align: center;
        }

        .block {
          display: block;
        }
      `}
    >
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
    </section>
  );
}
