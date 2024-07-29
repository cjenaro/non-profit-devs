import { useContext } from 'react';
import { useTranslation } from 'react-i18next';
//* @jsx jsx */
import { css, jsx } from '@emotion/core';

import { useAddUserToProject, useGetProject } from '../hooks/use-projects';
import { UserContext } from '../context/UserContext.jsx';
import Title from '../components/Title.jsx';
import Button from '../components/Button.jsx';
import Spinner from '../components/Spinner.jsx';

export default function Project({ navigate, id }) {
  const { t } = useTranslation();
  const [user] = useContext(UserContext);
  const {
    data: projectData,
    loading: projectLoading,
    refetch: fetchProject,
  } = useGetProject(id);
  const [join, { loading }] = useAddUserToProject();

  const handleJoinProject = async () => {
    if (!user) return navigate('/login');

    const addUserInput = {
      user: user.id,
    };

    await join({ variables: { id: project.id, input: addUserInput } });

    fetchProject({ variables: { id: project.id } });
  };

  if (projectLoading) return <Spinner fullscreen />;
  const { project } = projectData;

  return (
    <section
      css={css`
        padding-top: 50px;
        padding-bottom: 100px;
        min-height: calc(100vh - 278px);

        .join {
          width: 100%;
        }

        @media (min-width: 768px) {
          padding-bottom: 50px;
          min-height: calc(100vh - 228px);
        }
      `}
    >
      <div className="container">
        <Title color="var(--ember)" borderColor="var(--lavender)">
          {project.name}.
        </Title>
        <p>{project.description}</p>
        {user && (
          <p>
            {t('JOIN_THE_NON_PROFIT_CHANNEL_ON_OUR_SLACK', {
              channel: `
                  #non-profit-${project.name
                    .split(' ')
                    .join('-')
                    .replace(/'/g, '')
                    .toLowerCase()}
              `,
            })}
            <a
              rel="noopener noreferrer"
              css={css`
                color: currentColor;
              `}
              href="https://join.slack.com/t/nonprofitdevs/shared_invite/zt-fd7sjx0l-9vf9TRTA~4lfCiG78LRJuw"
              target="_blank"
            >
              slack
            </a>
          </p>
        )}
        <ul
          css={css`
            border: 3px solid var(--lavender);
            padding: 20px;
            margin-bottom: 40px;

            li {
              margin-bottom: 0.5em;
              padding: 0.5em 0;
              letter-spacing: 0.1em;
              font-weight: bold;
              border-bottom: 2px solid #e4e4e4;
            }
          `}
        >
          <li>{t('VOLUNTEERS_ON_THIS_PROJECT')}:</li>
          {project.users.map((user) => (
            <li key={user.id}>{user.name}</li>
          ))}
        </ul>
        <Button loading={loading} onClick={handleJoinProject} className="join">
          {t('JOIN_THIS_PROJECT')}
        </Button>
      </div>
    </section>
  );
}
