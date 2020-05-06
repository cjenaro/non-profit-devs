//* @jsx jsx */
import { css, jsx } from "@emotion/core";
import { Link } from "@reach/router";

export default function ProjectItem({ project }) {
  return (
    <Link
      to={`/projects/${project.slug}`}
      css={css`
        text-decoration: none;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 17px 14px;
        color: var(--lavender);
      `}
    >
      <p
        css={css`
          margin: 0;
          font-size: 30px;
        `}
      >
        {project.name}
      </p>
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
