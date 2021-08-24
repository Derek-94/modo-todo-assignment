import React from 'react';
import styled from 'styled-components';
import { Itodo } from 'types';

interface TodoProps {
  todo: Itodo;
}

const Todo: React.FC<TodoProps> = ({ todo }) => {
  return (
    <TodoContainer className="todo" data-id={todo.id}>
      {todo.taskName}
    </TodoContainer>
  );
};

const TodoContainer = styled.div`
  margin-bottom: ${({ theme }) => theme.layout.gap};
  box-shadow: ${({ theme }) => theme.layout.dropShadow};
  color: ${({ theme }) => theme.color.todoFont};
  border-radius: ${({ theme }) => theme.layout.radius};
  padding: ${({ theme }) => theme.layout.listPadding};
  background-color: ${({ theme }) => theme.color.whiteBackground};
`;

export default Todo;
