import { Title } from '../../components/Title';
import Steps from '../../components/Steps';
import { useTranslation } from 'react-i18next';

export default function HowItWorks() {
  const { t } = useTranslation();

  return (
    <section className="py-12.5 pb-25 relative">
      <svg
        className="hidden absolute opacity-10 top-30 -left-[10%] rotate-y-180 scale-150 text-lavender md:block"
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
        <div className="mb-12.5">
          <Title color="var(--ember)" borderColor="var(--lavender)">
            {t('HOW_IT_WORKS')}
          </Title>
        </div>
        <div className="flex flex-col md:flex-row [&>div]:md:flex-1 [&>div]:md:first:mr-5">
          <Steps id="ONG-steps">
            <p className="text-center mt-0">{t('NON_PROFITS')}</p>
            <p className="text-center">{t('PITCH_YOUR_PROJECT')}</p>
            <div>
              <p className="mb-0.5 text-center">
                {t('WE_LL_CONTACT_YOU_AS_FAST_AS_WE_CAN')}
              </p>
              <small className="text-center block">
                {t(
                  'PLEASE_KEEP_IN_MIND_MOST_OF_US_HAVE_OTHER_JOBS_TO_TAKE_CARE_OF'
                )}
              </small>
            </div>
          </Steps>
          <Steps id="dev-steps">
            <p className="text-center mt-0">
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
