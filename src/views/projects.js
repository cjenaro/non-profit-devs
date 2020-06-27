//* @jsx jsx */
import { css, jsx } from '@emotion/core';
import ProjectItem from '../components/ProjectItem';
import Spinner from '../components/Spinner';
import ErrorMessage from '../components/ErrorMessage';
import useProjects from '../hooks/use-projects';
import { useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import { useTranslation } from 'react-i18next';

export default function Projects() {
  const { t } = useTranslation();
  const [search, setSearch] = useState('');
  const { data, loading, error } = useProjects();

  if (loading) return <Spinner />;

  if (error) return <ErrorMessage error={error} />;

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const { projects } = data;

  return (
    <section
      css={css`
        padding-top: 50px;
        padding-bottom: 100px;

        @media (min-width: 768px) {
          min-height: calc(100vh - 228px);
          padding-bottom: 50px;
        }
      `}
    >
      <div className="container">
        <div
          css={css`
            border: 1px solid var(--lavender);
            margin-bottom: 1rem;
            display: flex;
            width: min-content;
            align-items: center;
            justify-content: space-between;
          `}
        >
          <input
            type="text"
            value={search}
            onChange={handleSearch}
            placeholder={t('FILTER_PROJECTS_BY_NAME')}
            css={css`
              &::placeholder {
                color: currentColor;
              }
              font-size: 1rem;
              padding: 0.875rem 1rem;
              border: 0;
              background-color: var(--ember);
              color: var(--lavender);
            `}
          />
          <FiSearch
            css={css`
              padding: 0.875rem 1rem;
            `}
          />
        </div>
        <ul>
          {projects.length > 0 ? (
            projects
              .filter((project) =>
                project.name.toLowerCase().includes(search.toLowerCase())
              )
              .map((project) => (
                <li
                  key={project.id}
                  css={css`
                    border: 2px solid var(--lavender);
                    margin-bottom: 1rem;
                    transform: scale(1);
                    transition: transform 0.1s ease-in-out;

                    &:hover {
                      transform: scale(1.01);
                    }
                  `}
                >
                  <ProjectItem project={project} />
                </li>
              ))
          ) : (
            <h1>{t('LOOKS_LIKE_THERE_ARE_NO_PROJECTS_HERE_YET')}</h1>
          )}
        </ul>
      </div>
    </section>
  );
}
