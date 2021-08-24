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
      <h2>{status}</h2>
      <Todos>
        {todos.map(todo => (
          <Todo key={todo.id} todo={todo} />
        ))}
      </Todos>
    </ColumnContatiner>
  );
};

export default Column;
const ColumnContatiner = styled.div`
  box-sizing: border-box;
  min-width: 300px;
  width: 30%;
  margin-top: 120px;
  padding: ${({ theme }) => theme.layout.padding};
  color: ${({ theme }) => theme.color.todoFont};
  border-radius: ${({ theme }) => theme.layout.radius};
  background-color: ${({ theme }) => theme.color.columnBackground};

  > h2 {
    font-size: ${({ theme }) => theme.layout.subTitleSize};
    font-weight: ${({ theme }) => theme.layout.fontBold};
    padding-left: ${({ theme }) => theme.layout.padding};
  }
`;

const Todos = styled.div`
  margin-top: ${({ theme }) => theme.layout.gap};
`;
