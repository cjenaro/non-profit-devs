//* @jsx jsx */
import { jsx, css } from '@emotion/core';
import Title from '../../components/Title.jsx';
import Steps from '../../components/Steps.jsx';
import { useTranslation } from 'react-i18next';

export default function HowItWorks() {
  const { t } = useTranslation();

  return (
    <section
      css={css`
        padding: 50px 0 100px;
        position: relative;

        .text-center {
          text-align: center;
        }

        .block {
          display: block;
        }
      `}
    >
      <svg
        css={css`
          display: none;
          position: absolute;
          opacity: 0.1;
          top: 120px;
          left: -10%;
          transform: rotateY(180deg) scale(1.5);
          color: var(--lavender);
          @media (min-width: 768px) {
            display: block;
          }
        `}
        id="BRICKS"
        xmlns="http://www.w3.org/2000/svg"
        width="610"
        height="268"
        viewBox="0 0 610 268"
      >
        <rect
          id="_5"
          data-name="5"
          width="230"
          height="74"
          rx="5"
          transform="translate(252 194)"
          fill="currentColor"
        />
        <rect
          id="_4"
          data-name="4"
          width="230"
          height="74"
          rx="5"
          transform="translate(0 194)"
          fill="currentColor"
        />
        <rect
          id="_3"
          data-name="3"
          width="230"
          height="76"
          rx="5"
          transform="translate(380 96)"
          fill="currentColor"
        />
        <rect
          id="_2"
          data-name="2"
          width="232"
          height="76"
          rx="5"
          transform="translate(126 96)"
          fill="currentColor"
        />
        <rect
          id="_1"
          data-name="1"
          width="230"
          height="74"
          rx="5"
          fill="currentColor"
        />
      </svg>
      <div className="container">
        <Title
          styles={css`
            margin-bottom: 50px;
          `}
          color="var(--ember)"
          borderColor="var(--lavender)"
        >
          {t('HOW_IT_WORKS')}
        </Title>
        <div
          css={css`
            display: flex;
            flex-direction: column;

            @media (min-width: 768px) {
              flex-direction: row;
              > div {
                flex: 1;
                &:first-of-type {
                  margin-right: 20px;
                }
              }
            }
          `}
        >
          <Steps id="ONG-steps">
            <p
              className="text-center"
              css={css`
                margin-top: 0;
              `}
            >
              {t('NON_PROFITS')}
            </p>
            <p className="text-center">{t('PITCH_YOUR_PROJECT')}</p>
            <div>
              <p
                css={css`
                  margin-bottom: 2px;
                  text-align: center;
                `}
              >
                {t('WE_LL_CONTACT_YOU_AS_FAST_AS_WE_CAN')}
              </p>
              <small className="text-center block">
                {t(
                  'PLEASE_KEEP_IN_MIND_MOST_OF_US_HAVE_OTHER_JOBS_TO_TAKE_CARE_OF'
                )}
              </small>
            </div>
          </Steps>
          <Steps
            styles={css`
              margin-top: 55px;
              @media (min-width: 768px) {
                margin-top: 0;
              }
            `}
          >
            <p
              className="text-center"
              css={css`
                margin-top: 0px;
              `}
            >
              {t('DEVELOPERS')}/{t('DESIGNERS')}
            </p>
            <p className="text-center">
              {t('AFTER_JOINING_BROWSE_ALL_PROJECTS')}
            </p>
            <p className="text-center">{t('PICK_ONE_YOU_FIND_INTERESTING')}</p>
            <p className="text-center">{t('SIGNUP_FOR_IT')}</p>
          </Steps>
        </div>
      </div>
    </section>
  );
}
