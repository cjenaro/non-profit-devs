import React from 'react';
import styled from '@emotion/styled';
import { navigate } from '@reach/router';

const StyledButton = styled.button`
  padding: 5px 7px;
  font-size: 14px;
  font-weight: bold;
  text-transform: uppercase;
  border: 1px solid var(--ember);
  color: var(--ember);
  background-color: var(--lavender);
  cursor: pointer;
  position: relative;
  text-decoration: none;
  width: max-content;

  @keyframes load {
    from {
      opacity: 0;
      transform: scale(0.5);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: transparent;
    transition: background-color 0.2s ease-in-out;
  }

  &.loading {
    padding-left: 17px;

    &::before {
      width: 10px;
      height: 10px;
      top: 50%;
      margin-top: -5px;
      left: 5px;
      background-color: var(--ember);
      border-radius: 50%;
      animation: load 0.7s ease-in-out infinite;
    }
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
      content: '';
      position: absolute;
      height: 2px;
      background-color: #efdfdf;
      width: 100%;
      bottom: 1px;
      left: 0;
    }
  }
`;

export default function Button({ onClick, to, children, className, loading }) {
  const handleTo = () => {
    navigate(to);
  };

  return (
    <StyledButton
      className={`${className} ${loading ? 'loading' : ''}`}
      onClick={to ? handleTo : onClick}
    >
      {children}
    </StyledButton>
  );
}
