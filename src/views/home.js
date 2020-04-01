import React from "react";
//* @jsx jsx */
import { css, jsx } from "@emotion/core";
import Link from "../components/link";
import { useAuth } from "react-use-auth";
import { useBgShape } from "../hooks/use-bgshape";

export default function Home() {
  const { login } = useAuth();

  useBgShape("polygon(0 0, 0 0, 0 0, 0 0, 0 0)");

  return (
    <div
      css={css`
        display: grid;
        padding: 2em;
        justify-content: flex-start;
        overflow: hidden;
      `}
    >
      <h1
        css={css`
          font-size: 4em;
          padding-top: 1.4em;
          margin: 0;

          &::after {
            content: "Non Profit Devs";
            font-size: 5em;
            position: absolute;
            opacity: 0.1;
            top: 0%;
            left: 22%;
            line-height: 0.9em;
            pointer-events: none;
          }
        `}
      >
        What we do
      </h1>
      <p
        css={css`
          color: var(--brandRed);
          line-height: 1.8em;
          font-size: 1em;
          margin: 0;
          max-width: 50%;
        `}
      >
        We want to help non-profit organizations with that need their own
        websites to help from where we can.
      </p>
      <div
        css={css`
          display: flex;
          align-items: center;
          justify-content: space-between;
          justify-self: flex-start;
          margin: 1rem 0;
        `}
      >
        <Link
          styles={css`
            flex: 1;
            margin-right: 0.5rem;
          `}
          inverted
          color="var(--pastel-one)"
          bgColor="var(--violet)"
          onClick={login}
        >
          Contribute
        </Link>
        <Link
          styles={css`
            flex: 1;
            margin-left: 0.5rem;
            white-space: nowrap;
          `}
          color="var(--pastel-one)"
          bgColor="var(--violet)"
          to="/projects/new"
        >
          New Project
        </Link>
      </div>
      <Link
        styles={css`
          justify-self: flex-start;
        `}
        color="var(--brandRed)"
        bgColor="var(--pastel-one)"
        to="/projects"
      >
        Check All Projects
      </Link>
    </div>
  );
}
