import React from "react";
//* @jsx jsx */
import { jsx, css } from "@emotion/core";
import { Link } from "@reach/router";

export default function({
  children,
  to,
  color,
  bgColor,
  inverted,
  onClick,
  styles
}) {
  return to ? (
    <Link
      css={css`
        padding: 10px 15px;
        color: ${inverted ? bgColor : color};
        background-color: ${inverted ? color : bgColor};
        border: 1px solid ${!inverted ? color : bgColor};
        border-radius: 10px;
        text-decoration: none;
        text-align: center;
        font-size: 24px;
        transition: color 0.2s ease-in-out, background-color 0.2s ease-in-out,
          border-color 0.2s ease-in-out;
        ${styles}

        &:hover {
          color: ${!inverted ? bgColor : color};
          background-color: ${!inverted ? color : bgColor};
          border: 1px solid ${inverted ? color : bgColor};
        }
      `}
      to={to}
    >
      {children}
    </Link>
  ) : (
    <button
      css={css`
        padding: 10px 15px;
        color: ${inverted ? bgColor : color};
        background-color: ${inverted ? color : bgColor};
        border: 1px solid ${!inverted ? color : bgColor};
        border-radius: 10px;
        text-decoration: none;
        text-align: center;
        cursor: pointer;
        font-size: 24px;
        transition: color 0.2s ease-in-out, background-color 0.2s ease-in-out,
          border-color 0.2s ease-in-out;
        ${styles}

        &:hover {
          color: ${!inverted ? bgColor : color};
          background-color: ${!inverted ? color : bgColor};
          border: 1px solid ${inverted ? color : bgColor};
        }
      `}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
