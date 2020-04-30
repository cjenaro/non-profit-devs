//* @jsx jsx */
import { jsx, css } from "@emotion/core";
import styled from "@emotion/styled";
import { Link } from "@reach/router";

const StyledLink = styled(Link)`
  text-decoration: none;
  border: 1px solid var(--ember);
  max-width: 55px;
  padding: 2px 7px;
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
      `}
    >
      Non Profit Devs
    </span>
  </StyledLink>
);

export default Logo;
