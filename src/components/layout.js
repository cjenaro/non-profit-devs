import React from "react";
//* @jsx jsx */
import { jsx, Global, css } from "@emotion/core";
import Header from "./header";

const Layout = ({ children }) => {
  return (
    <React.Fragment>
      <Global
        styles={css`
          body {
            margin: 0;
            padding: 0;
            font-family: "ABeeZee", sans-serif;
            color: var(--violet);
            background-color: var(--pastel-one);
          }

          h1,
          h2,
          h3,
          h4,
          h5 {
            font-family: "Expletus Sans";
          }

          :root {
            --brandRed: #ee5e11;
            --violet: #2e0f39;
            --dark-pastel: #f7c6a1;
            --pastel-one: #efefd1;
            --pastel-two: #ddeed2;
          }

          ul {
            padding: 0;
            margin: 0;
            list-style: none;
          }
        `}
      />
      <Header />
      <main
        css={css`
          min-height: calc(100vh - 133px);
          position: relative;
          > div {
            position: absolute;
            z-index: 2;
            top: 0;
            left: 0;
            height: 100%;
            width: 100%;
          }
        `}
      >
        {children}
      </main>
      <div
        id="bg-shape"
        css={css`
          background-color: var(--brandRed);
          position: absolute;
          height: 100vh;
          width: 100vw;
          top: 0;
          left: 0;
          transition: clip-path 0.3s ease-in-out;
          clip-path: polygon(0 50%, 50% 50%, 50% 50%, 85% 100%, 0% 100%);
        `}
      ></div>
    </React.Fragment>
  );
};

export default Layout;
