//* @jsx jsx */
import { css, jsx } from "@emotion/core";
import ProjectItem from "../components/ProjectItem";
import useProjects from "../hooks/use-projects";

export default function Projects() {
  const { data, loading, error } = useProjects();

  if (loading) return <p>Loading...</p>;

  if (error) return <p>Error!</p>;

  const { projects } = data;

  return (
    <section
      css={css`
        padding-top: 50px;
        padding-bottom: 100px;

        @media (min-width: 768px) {
          padding-bottom: 50px;
        }
      `}
    >
      <ul>
        {projects.map((project) => (
          <li key={project.id}>
            <ProjectItem project={project} />
          </li>
        ))}
      </ul>
    </section>
  );
}
