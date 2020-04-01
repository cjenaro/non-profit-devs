import { Link } from "@reach/router";
import React from "react";
//* @jsx jsx */
import { jsx, css } from "@emotion/core";
import { useAuth } from "react-use-auth";

const Header = () => {
  const { isAuthenticated, login, logout, user } = useAuth();

  return (
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
            align-items: center;
            li {
              margin-left: 18px;
            }

            img {
              max-width: 50px;
              border-radius: 50%;
              border: 1px solid var(--pastel-one);
            }

            a,
            button {
              text-decoration: none;
              color: var(--pastel-one);
              padding: 8px;
              cursor: pointer;
              border: 1px solid transparent;
              border-radius: 10px;
              background-color: transparent;
              font-size: 1rem;
              transition: border-color 0.2s ease-in-out, color 0.2s ease-in-out;

              &.hollow {
                color: var(--brandRed);
                background-color: var(--pastel-one);
                border-radius: 10px;
                transition: background-color 0.2s ease-in-out,
                  color 0.2s ease-in-out;

                &:hover {
                  background-color: var(--violet);
                }
              }
            }

            button.button {
              &:hover {
                border-color: var(--violet);
                color: var(--violet);
              }
            }
          `}
        >
          {!isAuthenticated() ? (
            <React.Fragment>
              <li>
                <button className="button" onClick={login}>
                  Log In
                </button>
              </li>
              <li>
                <button className="button" onClick={login}>
                  Sign On
                </button>
              </li>
              <li>
                <Link className="hollow" to="/projects/new">
                  New Project
                </Link>
              </li>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <li>
                <button className="button" onClick={logout}>
                  Log Out
                </button>
              </li>
              <li>
                <button>
                  <img src={user.picture} alt={user.name} />
                </button>
              </li>
            </React.Fragment>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
