import React from 'react';
import { TODOS, STATUS } from 'constant';
import { StatusKey } from 'types';
import Column from './Column';
import styled from 'styled-components';

const TodoList: React.FC = () => {
  const filterList = (status: StatusKey) =>
    TODOS.filter(todo => todo.status === status);
  return (
    <MainContainer>
      {STATUS.map((status, i) => (
        <Column key={i} status={status} todos={filterList(status)} />
      ))}
    </MainContainer>
  );
};
export default TodoList;

const MainContainer = styled.main`
  display: flex;
`;
