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
  border: 1px solid black;
  border-radius: 3px;
  padding: 16px;
`;

export default Todo;
