import { useContext } from 'react';
//* @jsx jsx */
import { css, jsx } from '@emotion/core';

import { useAddUserToProject, useGetProject } from '../hooks/use-projects';
import { UserContext } from '../context/UserContext';
import Title from '../components/Title';
import Button from '../components/Button';
import Spinner from '../components/Spinner';

export default function Project({ navigate, id }) {
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
            Join the{' '}
            <span
              css={css`
                text-transform: lowercase;
              `}
            >
              #non-profit-{project.name.split(' ').join('-').replace(/'/g, '')}
            </span>{' '}
            channel on our{' '}
            <a
              rel="noopener noreferrer"
              css={css`
                color: currentColor;
              `}
              href="https://join.slack.com/t/nonprofitdevs/shared_invite/zt-fd7sjx0l-9vf9TRTA~4lfCiG78LRJuw"
              target="_blank"
            >
              slack!
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
          <li>Devs on this project:</li>
          {project.users.map((user) => (
            <li key={user.id}>{user.name}</li>
          ))}
        </ul>
        <Button loading={loading} onClick={handleJoinProject} className="join">
          Join this project
        </Button>
      </div>
    </section>
  );
}
