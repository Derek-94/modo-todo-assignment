import React, { useState } from 'react';
import { TODOS, STATUS } from 'constant';
import { StatusKey } from 'types';
import Column from './Column';
import styled from 'styled-components';
import DragProvider from 'contexts/DragContext';

const TodoList: React.FC = () => {
  const [todoState, setTodoState] = useState(TODOS);
  const filterList = (status: StatusKey) =>
    todoState.filter(todo => todo.status === status);
  return (
    <MainContainer>
      <DragProvider>
        {STATUS.map((status, i) => (
          <Column
            key={i}
            status={status}
            filtered={filterList(status)}
            todos={todoState}
            setTodoState={setTodoState}
          />
        ))}
      </DragProvider>
    </MainContainer>
  );
};
const MainContainer = styled.main`
  display: flex;
  justify-content: space-between;
  padding: 20px 20px;
`;

export default TodoList;
