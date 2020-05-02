import React from "react";
//* @jsx jsx */
import { jsx, css } from "@emotion/core";
import { useAuth } from "react-use-auth";
import Logo from "./Logo";
import Button from "./Button";

const Header = ({ fixed }) => {
  const { isAuthenticated, login, logout } = useAuth();
  const isProfile = window.location.pathname.includes("profile");

  return (
    <header
      css={css`
        background-color: var(--lavender);
        height: 64px;
        padding: 0 16px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        ${fixed &&
        `
          @media(max-width: 420px) { 
            position: fixed;
            bottom: 0;
            width: 100%;
            z-index: 10;
            box-shadow: 0px -2px 10px #0002;
            max-width: calc(100vw - 32px);
          }
          `}
      `}
    >
      <Logo to="/" />

      <nav>
        {!isAuthenticated() ? (
          <React.Fragment>
            <Button
              css={css`
                margin-right: 10px;
              `}
              onClick={login}
            >
              Log In
            </Button>
            <Button className="contained" onClick={login}>
              Sign Up
            </Button>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <Button>{isProfile ? "Profile" : "Projects"}</Button>
            <Button onClick={logout}>Sign Out</Button>
          </React.Fragment>
        )}
      </nav>
    </header>
  );
};

export default Header;
