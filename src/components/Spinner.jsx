//* @jsx jsx */
import { keyframes, css, jsx } from '@emotion/react';

const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  25% {
    transform: rotate(90deg);
  }
  50% {
    transform: rotate(180deg);
  }
  75% {
    transform: rotate(270deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const Spinner = (fullscreen) => (
  <div
    css={css`
      height: 100%;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      ${fullscreen && 'min-height: calc(100vh - 128px);'}
    `}
  >
    <div
      css={css`
        border: 2px solid currentColor;
        height: 20px;
        width: 20px;
        animation: ${spin} 2s cubic-bezier(0.95, 0.02, 0.96, 0.66) infinite;
      `}
    />
  </div>
);

export default Spinner;
