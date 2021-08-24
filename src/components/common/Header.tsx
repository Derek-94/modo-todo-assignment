import React from 'react';
import styled from 'styled-components';

const Header: React.FC = () => {
  const currentDate = '2021.08.24';

  return <HeaderContainer>{currentDate}'s Todo List</HeaderContainer>;
};

const HeaderContainer = styled.div`
  position: fixed;
  z-index: 1;
  width: 100%;
  height: 70px;
  text-align: center;
  color: ${({ theme }) => theme.color.headerFont};
  background-color: ${({ theme }) => theme.color.darkGreen};
  box-shadow: ${({ theme }) => theme.layout.dropShadow};
  font-size: ${({ theme }) => theme.layout.titleSize};
  font-weight: ${({ theme }) => theme.layout.fontBold};
  line-height: 2;
`;

export default Header;
