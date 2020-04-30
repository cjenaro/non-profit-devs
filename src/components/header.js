import React from "react";
//* @jsx jsx */
import { jsx, css } from "@emotion/core";
import { useAuth } from "react-use-auth";
import Logo from "./Logo";
import Button from "./Button";

const Header = () => {
  const { isAuthenticated, login, logout, user } = useAuth();
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
