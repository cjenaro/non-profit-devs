import React from 'react';
//* @jsx jsx */
import { jsx, Global, css } from '@emotion/core';
import Header from './Header.jsx';

const Layout = ({ children }) => {
  return (
    <React.Fragment>
      <Global
        styles={css`
          @import url('https://fonts.googleapis.com/css2?family=Hind+Madurai&family=Montserrat:wght@700&display=swap');

          body {
            margin: 0;
            padding: 0;
            font-family: 'Hind Madurai', sans-serif;
            color: var(--lavender);
            background-color: var(--ember);
          }

          h1,
          h2,
          h3,
          h4,
          h5 {
            font-family: 'Montserrat', sans-serif;
          }

          .container {
            max-width: calc(var(--max-width) - 20px);
            padding: 0 10px;
            margin: 0 auto;
          }

          :root {
            --lavender: #f9e8e8;
            --ember: #c42e2e;
            --max-width: 300px;

            @media (min-width: 495px) {
              --max-width: 430px;
            }

            @media (min-width: 768px) {
              --max-width: 650px;
            }

            @media (min-width: 1100px) {
              --max-width: 800px;
            }
          }

          ul {
            padding: 0;
            margin: 0;
            list-style: none;
          }
        `}
      />
      <Header />
      <main>{children}</main>
      <Header fixed />
    </React.Fragment>
  );
};

export default Layout;
