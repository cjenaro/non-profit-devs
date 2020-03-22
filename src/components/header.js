import { Link } from "@reach/router";
import React from "react";
//* @jsx jsx */
import { jsx, css } from "@emotion/core";

const Header = () => (
  <header
    css={css`
      background-color: var(--brandRed);
      height: 100px;
      padding: 0 190px 0 43px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 3px solid var(--pastel-one);
      margin-bottom: 30px;
    `}
  >
    <h1
      css={css`
        margin: 0;
      `}
    >
      <Link
        to="/"
        css={css`
          color: var(--pastel-one);
          text-decoration: none;
        `}
      >
        Non Profit Devs
      </Link>
    </h1>

    <nav>
      <ul
        css={css`
          display: flex;
          li {
            margin-left: 18px;
          }

          a {
            text-decoration: none;
            color: var(--pastel-one);
            padding: 8px;

            &.hollow {
              color: var(--brandRed);
              background-color: var(--pastel-one);
              border-radius: 10px;
            }
          }
        `}
      >
        <li>
          <Link to="/log-in">Log In</Link>
        </li>
        <li>
          <Link to="sign-on">Sign On</Link>
        </li>
        <li>
          <Link className="hollow" to="/projects/new">
            New Project
          </Link>
        </li>
      </ul>
    </nav>
  </header>
);

export default Header;
