import { useTranslation } from 'react-i18next';
//* @jsx jsx */
import { jsx, css } from '@emotion/react';

const ALL_LANGUAGES = [
  { code: 'en', label: 'English' },
  { code: 'es', label: 'Español' },
];

const Language = () => {
  const { i18n } = useTranslation();
  const availableLanguages = ALL_LANGUAGES.filter(
    (language) => language.code !== i18n.language
  );

  return availableLanguages.map((availableLanguage) => (
    <button
      key={availableLanguage.code}
      css={css`
        border: none;
        background: none;
        text-transform: uppercase;
        color: #c00;
        margin-right: 8px;
        padding: 8px;
        cursor: pointer;

        &:focus {
          outline-style: dotted;
        }

        @media (max-width: 420px) {
          display: block;
          width: 100%;
          margin-bottom: 8px;
        }
      `}
      onClick={() => i18n.changeLanguage(availableLanguage.code)}
    >
      {availableLanguage.label}
    </button>
  ));
};

export default Language;
