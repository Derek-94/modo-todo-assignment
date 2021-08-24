import React from 'react';
import styled, { css } from 'styled-components';

interface priorityProps {
  High?: boolean;
  Medium?: boolean;
  Low?: boolean;
}

const setSize = (props: priorityProps) => {
  if (props.High) {
    return css`
      background-color: #ea2027;
    `;
  }

  if (props.Medium) {
    return css`
      background-color: #ffc312;
    `;
  }

  return css`
    background-color: #009432;
  `;
};

const Label: React.FC<priorityProps> = ({ children, ...props }) => {
  return <LabelWrap {...props}>{children}</LabelWrap>;
};

const LabelWrap = styled.button<priorityProps>`
  padding: ${({ theme }) => theme.layout.labelPadding};
  border-radius: ${({ theme }) => theme.layout.radius};
  ${props => setSize(props)}
`;

export default Label;
