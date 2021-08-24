import React from 'react';
import { Itodo, StatusKey } from 'types';
import Todo from './Todo';
import styled from 'styled-components';

interface ColumnProps {
  status: StatusKey;
  todos: Itodo[];
}

const Column: React.FC<ColumnProps> = ({ status, todos }) => {
  return (
    <ColumnContatiner>
      {status}
      <Todos>
        {todos.map(todo => (
          <Todo key={todo.id} todo={todo} />
        ))}
      </Todos>
    </ColumnContatiner>
  );
};

export default Column;
const Todos = styled.div`
  margin-top: 20px;
`;
const ColumnContatiner = styled.div`
  border: 1px solid black;
  min-width: 300px;
  padding: 20px;
`;
