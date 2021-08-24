import React, { useState } from 'react';
import { TODOS, STATUS } from 'constant';
import { StatusKey } from 'types';
import Column from './Column';
import styled from 'styled-components';

const TodoList: React.FC = () => {
  const [todoState, setTodoState] = useState(TODOS);
  const filterList = (status: StatusKey) =>
    todoState.filter(todo => todo.status === status);
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
  justify-content: space-between;
  padding: 90px 20px 20px;
  background-color: ${({ theme }) => theme.color.green};
`;
