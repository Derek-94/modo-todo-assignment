import React from 'react';
import styled, { css } from 'styled-components';

interface sizeProps {
  Large?: boolean;
  Small?: boolean;
  select?: boolean;
}

const setSize = (props: sizeProps) => {
  if (props.Large) {
    return css`
      padding: 16px 16px;
    `;
  }
  if (props.Small) {
    return css`
      line-height: 1;
      padding: 0.125rem 0.375rem;
    `;
  }
  return css`
    padding: 0.375rem 0.75rem;
    line-height: 1.5;
  `;
};

const Button: React.FC<sizeProps> = ({ children, ...props }) => {
  return <ButtonWrap {...props}>{children}</ButtonWrap>;
};

const ButtonWrap = styled.button<sizeProps>`
  background: ${props => (props.select ? '#A9A3A9' : 'white')};
  color: ${props => (props.select ? 'white' : '#A9A3A9')};
  border: 2px solid #a9a3a9;
  cursor: pointer;
  display: inline-block;
  font-weight: 400;
  text-align: center;
  white-space: nowrap;
  vertical-align: middle;
  font-size: 1rem;
  border-radius: 0.25rem;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out;
  border-color: 0.15s ease-in-out;
  ${props => setSize(props)}
  &:hover {
    background: ${props => (props.select ? '#737379' : '#E9E7E3')};
    border: 2px solid ${props => (props.select ? '#737379' : '#E9E7E3')};
  }
`;

export default Button;
