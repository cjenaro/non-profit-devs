import React from "react";
//* @jsx jsx */
import { jsx, css } from "@emotion/core";
import { Link } from "@reach/router";

export default function({
  children,
  to,
  entry,
  exit,
  color,
  bgColor,
  inverted,
  onClick
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
        font-size: 24px;
      `}
      entry={entry}
      exit={exit}
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
        font-size: 24px;
      `}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
