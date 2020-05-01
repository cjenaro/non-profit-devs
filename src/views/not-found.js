//* @jsx jsx */
import { jsx, css } from "@emotion/core";
import Button from "../components/Button";

export default function NotFound() {
  return (
    <section
      css={css`
        height: 100%;
      `}
    >
      <div className="container">
        <h1
          css={css`
            font-size: 40px;
            text-align: center;
          `}
        >
          Oops! The page you are trying to access does not exist!
        </h1>
        <Button to="/">&larr; Go back to home</Button>
      </div>
    </section>
  );
}
