//* @jsx jsx */
import { jsx, css } from '@emotion/react';
import Title from '../../components/Title.jsx';
import Button from '../../components/Button.jsx';
import { useTranslation } from 'react-i18next';

export default function WhoWeAre() {
  const { t } = useTranslation();

  return (
    <section
      css={css`
        background-color: var(--lavender);
        color: var(--ember);
        padding: 40px 0;

        & .big-button {
          font-size: 20px;
          display: block;
          margin: 16px auto;
          max-width: 100%;
        }

        @media (min-width: 768px) {
          & .big-button {
            max-width: 45%;
          }
        }
      `}
    >
      <div className="container">
        <Title color="var(--lavender)" borderColor="var(--ember)">
          {t('WHO_WE_ARE')}
        </Title>
        <p
          css={css`
            font-size: 18px;
            line-height: 25px;
            text-align: center;
            margin: 25px 0;
          `}
        >
          {t(
            'WE_ARE_A_TEAM_OF_DEVELOPERS_AND_DESIGNERS_WORKING_FOR_FREE_FOR_NON_PROFIT_ORGANIZATIONS'
          )}
        </p>
        <div
          css={css`
            display: flex;
            flex-direction: column;
            @media (min-width: 768px) {
              flex-direction: row;
            }
          `}
        >
          <Button to="/pitch" className="big-button">
            {t('PITCH_YOUR_NGOS_WEBSITE')}
          </Button>
          <Button to="/signup" className="big-button">
            {t('JOIN_AS_A_DEVELOPER_DESIGNER')}
          </Button>
        </div>
      </div>
    </section>
  );
}
