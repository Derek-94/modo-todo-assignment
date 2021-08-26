import React from 'react';
import { STATUS } from 'constant';
import { StatusKey } from 'types';
import Column from './Column';
import TodoFormWrapper from './TodoFormWrapper';
import styled from 'styled-components';
import DragProvider from 'contexts/DragContext';

import { useFiltering } from 'components/Filtering/FilteringService';

const TodoList: React.FC = () => {
  const { todoState, setTodoState } = useFiltering();

  const filterList = (status: StatusKey) =>
    todoState.filter(todo => todo.status === status);

  const onDeleteTodo = (id: string) => {
    setTodoState(todoState.filter(todo => todo.id !== id));
  };

  return (
    <>
      <TodoFormWrapper />
      <MainContainer>
        <DragProvider>
          {STATUS.map((status, i) => (
            <Column
              key={i}
              status={status}
              filtered={filterList(status)}
              todos={todoState}
              setTodoState={setTodoState}
              onDeleteTodo={onDeleteTodo}
            />
          ))}
        </DragProvider>
      </MainContainer>
    </>
  );
};

const MainContainer = styled.main`
  display: flex;
  justify-content: space-between;
  padding: ${({ theme }) => theme.layout.listPadding};
`;

export default TodoList;
