//* @jsx jsx */
import { css, jsx } from "@emotion/core";
import ProjectItem from "../components/ProjectItem";
import useProjects from "../hooks/use-projects";
import { useState } from "react";
import { FiSearch } from "react-icons/fi";

export default function Projects() {
  const [search, setSearch] = useState("");
  const { data, loading, error } = useProjects();

  if (loading) return <p>Loading...</p>;

  if (error) return <p>Error!</p>;

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
            placeholder="Filter projects by name..."
            css={css`
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
          {projects
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
            ))}
        </ul>
      </div>
    </section>
  );
}
