//* @jsx jsx */
import { jsx, css } from '@emotion/react';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';

const StyledLink = styled(Link)`
  text-decoration: none;
  border: 1px solid var(--ember);
  max-width: 55px;
  padding: 5px 7px;
`;

const Logo = ({ to }) => (
  <StyledLink to={to}>
    <span
      css={css`
        white-space: nowrap;
        font-weight: bold;
        font-size: 14px;
        color: var(--ember);
        text-transform: uppercase;
        letter-spacing: 0.5px;
      `}
    >
      Non Profit Devs
    </span>
  </StyledLink>
);

export default Logo;
