//* @jsx jsx */
import { jsx, css } from '@emotion/core';
import Title from '../../components/Title';
import Button from '../../components/Button';

export default function WhoWeAre() {
  return (
    <section
      css={css`
        background-color: var(--lavender);
        color: var(--ember);
        padding: 40px 0;

        & .big-button {
          font-size: 20px;
          display: block;
          margin: 16px auto;
        }
      `}
    >
      <div className="container">
        <Title color="var(--lavender)" borderColor="var(--ember)">
          Who we are.
        </Title>
        <p
          css={css`
            font-size: 18px;
            line-height: 25px;
            text-align: center;
            margin: 25px 0;
          `}
        >
          We are a team of developers working for free for non-profit
          organizations
        </p>
        <div
          css={css`
            display: flex;
            flex-direction: column;
            @media (min-width: 768px) {
              flex-direction: row;
            }
          `}
        >
          <Button to="/pitch" className="big-button">
            Pitch ONG Website
          </Button>
          <Button to="/signup" className="big-button">
            Join as developer
          </Button>
        </div>
      </div>
    </section>
  );
}
