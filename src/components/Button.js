import React from "react";
import styled from "@emotion/styled";
import { navigate } from "@reach/router";

const StyledButton = styled.button`
  padding: 5px 7px;
  font-size: 14px;
  font-weight: bold;
  text-transform: uppercase;
  border: 1px solid var(--ember);
  color: var(--ember);
  background-color: transparent;
  cursor: pointer;
  position: relative;
  text-decoration: none;
  width: max-content;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: transparent;
    transition: background-color 0.2s ease-in-out;
  }

  &:hover {
    &::before {
      background-color: rgba(0, 0, 0, 0.15);
    }
  }

  &.contained {
    background-color: var(--ember);
    color: var(--lavender);
  }

  &.text {
    color: var(--lavender);
    border: 0;

    &::after {
      content: "";
      position: absolute;
      height: 2px;
      background-color: #efdfdf;
      width: 100%;
      bottom: 1px;
      left: 0;
    }
  }
`;

export default function Button({ onClick, to, children, className }) {
  const handleTo = () => {
    navigate(to);
  };

  return (
    <StyledButton className={className} onClick={to ? handleTo : onClick}>
      {children}
    </StyledButton>
  );
}
