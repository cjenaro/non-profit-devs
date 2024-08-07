//* @jsx jsx */
import { css, jsx } from '@emotion/react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function ProjectItem({ project }) {
  const { t } = useTranslation();
  if (!project) return null;

  return (
    <Link
      to={`/projects/${project.id}`}
      state={{ ...project }}
      css={css`
        text-decoration: none;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 17px 14px;
        color: var(--lavender);
      `}
    >
      <div>
        <h2
          css={css`
            margin: 0;
            font-size: 30px;
          `}
        >
          {project.name}
        </h2>
        <div
          css={css`
            display: flex;
            align-items: center;
            margin-top: 4px;
            margin-bottom: 8px;
            flex-wrap: wrap;
          `}
        >
          <p
            css={css`
              font-size: 0.875rem;
              opacity: 0.7;
              margin-top: 0;
              margin-bottom: 0;
              text-transform: uppercase;
            `}
          >
            <span
              css={css`
                letter-spacing: 0.1rem;
              `}
            >
              {t('PROJECT_ITEM_CREATED')}:
            </span>{' '}
            {new Date(project.createdAt).toLocaleDateString()}
          </p>
          <p
            css={css`
              font-size: 0.875rem;
              opacity: 0.7;
              margin-top: 0;
              margin-bottom: 0;
              text-transform: capitalize;

              @media (min-width: 495px) {
                margin-left: 10px;
              }
            `}
          >
            <span
              css={css`
                letter-spacing: 0.1rem;
                text-transform: uppercase;
              `}
            >
              {t('PROJECT_ITEM_STATUS')}:
            </span>{' '}
            {project.status
              .split('_')
              .map((word) => word.toLowerCase())
              .join(' ')}
          </p>
        </div>
        <ul
          css={css`
            display: flex;
          `}
        >
          {project.users &&
            project.users.map((user) => (
              <li
                key={user.id}
                css={css`
                  margin-right: 5px;
                `}
              >
                <div
                  css={css`
                    width: 25px;
                    height: 25px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background-color: var(--lavender);
                    color: var(--ember);
                    border-radius: 50%;
                    font-weight: bold;
                    text-decoration: none;
                  `}
                >
                  {user.gravatar ? (
                    <img
                      src={user.gravatar}
                      alt={user.name}
                      css={css`
                        height: 100%;
                        width: 100%;
                        object-fit: cover;
                      `}
                    />
                  ) : (
                    user.name
                      .split(' ')
                      .map((word) => word[0])
                      .join('')
                  )}
                </div>
              </li>
            ))}
        </ul>
      </div>
      <p
        css={css`
          margin: 0;
          font-size: 30px;
        `}
      >
        &rarr;
      </p>
    </Link>
  );
}
