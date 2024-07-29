//* @jsx jsx */
import { jsx, css } from '@emotion/react';
import Title from '../components/Title.jsx';
import Input from '../components/Input.jsx';
import Button from '../components/Button.jsx';
import ErrorMessage from '../components/ErrorMessage.jsx';
import { useCreateProject } from '../hooks/use-projects';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';

export default function Pitch() {
  const navigate = useNavigate();
  const [createProject, { data, loading, error }] = useCreateProject();
  const { t } = useTranslation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newProjectInput = {
      name: e.target.ongName.value,
      contactEmail: e.target.contactEmail.value,
      description: e.target.description.value,
      status: 'PENDING_REVIEW',
    };

    await createProject({
      variables: {
        input: newProjectInput,
      },
    });
  };

  useEffect(() => {
    if (data) {
      navigate(`/projects/${data.createProject.id}`);
    }
  }, [data]);

  return (
    <section
      css={css`
        background-color: var(--lavender);
        color: var(--ember);
        padding-top: 50px;
        padding-bottom: 100px;
        min-height: calc(100vh - 288px);
        border-top: 5px solid var(--ember);
        border-bottom: 5px solid var(--ember);

        @media (min-width: 420px) {
          min-height: calc(100vh - 238px);
          padding-bottom: 50px;
        }
      `}
    >
      <div className="container">
        <Title color="var(--lavender)" borderColor="var(--ember)">
          {t('NEW_PROJECT')}
        </Title>
        <p>
          {t(
            'WE_ARE_GLAD_YOU_VE_DECIDED_TO_PITCH_YOUR_PROJECT_TO_US_PLEASE_FILL_IN_THE_FORM_BELOW'
          )}
        </p>
        <form
          onSubmit={handleSubmit}
          css={css`
            margin-top: 4rem;
            margin-bottom: 1rem;
          `}
        >
          <Input
            styles={css`
              margin: 1rem 0;
            `}
            inverted
            label={`${t('THE_NAME_OF_YOUR_NGO')}:`}
            name="ongName"
            id="ongName"
          />
          <Input
            styles={css`
              margin: 1rem 0;
            `}
            inverted
            label={`${t('CONTACT_EMAIL')}:`}
            name="contactEmail"
            id="contactEmail"
          />
          <label
            htmlFor="description"
            css={css`
              font-size: 16px;
              text-transform: uppercase;
              width: 100%;
              display: block;
              position: relative;
              margin-bottom: 1rem;

              &::before {
                content: '';
                width: 5px;
                height: 100%;
                background-color: var(--ember);
                position: absolute;
                top: 0;
                left: -15px;
                transform: scaleX(0);
                transform-origin: right;
                transition: transform 0.2s ease-in-out;
              }

              &:focus-within {
                &::before {
                  transform: scaleX(1);
                }
              }
            `}
          >
            {t('BRIEF_DESCRIPTION_OF_WEBSITE')}:
            <textarea
              css={css`
                padding: 16px;
                width: calc(100% - 32px);
                color: var(--lavender);
                font-family: 'Hind Madurai', sans-serif;
                margin-top: 4px;
                background-color: var(--ember);
                border: 1px solid var(--lavender);
              `}
              name="description"
              id="description"
              cols="30"
              rows="10"
            ></textarea>
          </label>
          <Button loading={loading}>{t('SUBMIT_PITCH')}</Button>
        </form>
        <ErrorMessage error={error} />
      </div>
    </section>
  );
}
