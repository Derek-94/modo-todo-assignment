import React from 'react';
import styled, { css } from 'styled-components';
import { PriorityType } from 'types';

interface StyledLabelProps {
  priority?: PriorityType;
}

const setType = (props: StyledLabelProps) => {
  if (props.priority === 'high') {
    return css`
      background-color: #ff6b6b;
    `;
  }

  if (props.priority === 'medium') {
    return css`
      background-color: #feca57;
    `;
  }

  return css`
    background-color: #1dd1a1;
  `;
};

const Label: React.FC<StyledLabelProps> = ({ children, ...props }) => {
  return <LabelWrap {...props}>{children}</LabelWrap>;
};

const LabelWrap = styled.button<StyledLabelProps>`
  cursor: default;
  padding: ${({ theme }) => theme.layout.labelPadding};
  border-radius: ${({ theme }) => theme.layout.radius};
  ${props => setType(props)}
`;

export default Label;
