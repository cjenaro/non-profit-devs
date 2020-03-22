import React from "react";
//* @jsx jsx */
import { jsx, css } from "@emotion/core";

const Footer = () => {
  return (
    <footer
      css={css`
        height: 90px;
        background-color: var(--violet);
      `}
    >
      <h5>Footer</h5>
    </footer>
  );
};

export default Footer;
