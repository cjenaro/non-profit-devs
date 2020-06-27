//* @jsx jsx */
import { jsx, css } from '@emotion/core';
import Title from '../components/Title';
import Input from '../components/Input';
import Button from '../components/Button';
import ErrorMessage from '../components/ErrorMessage';
import { useCreateProject } from '../hooks/use-projects';
import { useEffect } from 'react';
import { navigate } from '@reach/router';

export default function Pitch() {
  const [createProject, { data, loading, error }] = useCreateProject();

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
          New Project.
        </Title>
        <p>
          We are glad you decided to pitch your project to us, please fill in
          the form below
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
            label="ong name:"
            name="ongName"
            id="ongName"
          />
          <Input
            styles={css`
              margin: 1rem 0;
            `}
            inverted
            label="contact email:"
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
            Brief description of website:
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
          <Button loading={loading}>Submit Pitch</Button>
        </form>
        <ErrorMessage error={error} />
      </div>
    </section>
  );
}
