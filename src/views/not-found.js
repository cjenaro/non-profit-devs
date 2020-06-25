//* @jsx jsx */
import { jsx, css } from '@emotion/core';
import Button from '../components/Button';

export default function NotFound() {
  return (
    <section
      css={css`
        height: calc(100vh - 128px);
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
      `}
    >
      <div className="container">
        <h1
          css={css`
            margin-top: 0;
            margin-bottom: 30px;
            font-size: 40px;
          `}
        >
          Oops! The page you are trying to access does not exist!
        </h1>
        <Button to="/">&larr; Go back to home</Button>
      </div>
    </section>
  );
}
