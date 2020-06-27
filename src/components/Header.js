import React, { useContext } from 'react';
//* @jsx jsx */
import { jsx, css } from '@emotion/core';
import { useLocation } from '@reach/router';
import { useTranslation } from 'react-i18next';
import Logo from './Logo';
import Button from './Button';
import { UserContext } from '../context/UserContext';

const Header = ({ fixed }) => {
  const location = useLocation();
  const isProfile = location.pathname.includes('profile');
  const [user, setUser] = useContext(UserContext);
  const { t } = useTranslation()
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
              {t('HEADER_LOGIN')}
            </Button>
            <Button className="contained" to="/signup">
              {t('HEADER_SIGNUP')}
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
              {!isProfile ? t('HEADER_PROFILE') : t('HEADER_PROJECTS')}
            </Button>
        <Button onClick={logout}>{t('HEADER_SIGN_OUT')}</Button>
          </React.Fragment>
        )}
      </nav>
    </header>
  );
};

export default Header;
