import React from 'react';
import styled, { css } from 'styled-components';

interface StyledLabelProps {
  High?: boolean;
  Medium?: boolean;
  Low?: boolean;
}

const setSize = (props: StyledLabelProps) => {
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

const Label: React.FC<StyledLabelProps> = ({ children, ...props }) => {
  return <LabelWrap {...props}>{children}</LabelWrap>;
};

const LabelWrap = styled.button<StyledLabelProps>`
  padding: ${({ theme }) => theme.layout.labelPadding};
  border-radius: ${({ theme }) => theme.layout.radius};
  ${props => setSize(props)}
`;

export default Label;
