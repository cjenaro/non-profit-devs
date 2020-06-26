import React, { useContext } from 'react';
//* @jsx jsx */
import { jsx, css } from '@emotion/core';
import { useLocation } from '@reach/router';
import Logo from './Logo';
import Button from './Button';
import { UserContext } from '../context/UserContext';

const Header = ({ fixed }) => {
  const location = useLocation();
  const isProfile = location.pathname.includes('profile');
  const [user, setUser] = useContext(UserContext);

  const logout = () => {
    setUser(null);
  };

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
        {!user ? (
          <React.Fragment>
            <Button
              css={css`
                margin-right: 10px;
              `}
              to="/login"
            >
              Log In
            </Button>
            <Button className="contained" to="/signup">
              Sign Up
            </Button>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <Button
              to={!isProfile ? '/profile' : '/projects'}
              css={css`
                margin-right: 10px;
              `}
            >
              {!isProfile ? 'Profile' : 'Projects'}
            </Button>
            <Button onClick={logout}>Sign Out</Button>
          </React.Fragment>
        )}
      </nav>
    </header>
  );
};

export default Header;
