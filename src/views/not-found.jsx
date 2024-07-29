//* @jsx jsx */
import { jsx, css } from '@emotion/core';
import Button from '../components/Button.jsx';
import { useTranslation } from 'react-i18next';

export default function NotFound() {
  const { t } = useTranslation();

  return (
    <section
      css={css`
        height: calc(100vh - 128px);
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
      `}
    >
      <div className="container">
        <h1
          css={css`
            margin-top: 0;
            margin-bottom: 30px;
            font-size: 40px;
          `}
        >
          {t('OOPS_THE_PAGE_YOU_ARE_TRYING_TO_ACCESS_DOES_NOT_EXIST')}
        </h1>
        <Button to="/">&larr; {t('GO_BACK_TO_HOME')}</Button>
      </div>
    </section>
  );
}
