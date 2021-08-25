import React from 'react';
import { Itodo, StatusKey } from 'types';
import Todo from './Todo';
import styled from 'styled-components';
import { findById, mergeArray } from 'utils/dnd';
import { useDragDispatch } from 'contexts';

interface ColumnProps {
  status: StatusKey;
  todos: Itodo[];
  filtered: Itodo[];
  setTodoState: (todos: Itodo[]) => void;
}

const Column: React.FC<ColumnProps> = ({
  status,
  todos,
  filtered,
  setTodoState,
}) => {
  const dispatch = useDragDispatch();
  const handlerDragOver = (e: React.DragEvent<HTMLDivElement>): void => {
    e.preventDefault();
    dispatch({ type: 'SET_HOVER', hover: null });
  };
  const moveLast = (e: React.DragEvent<HTMLDivElement>) => {
    const targetId = e.dataTransfer.getData('id');
    const from = findById(todos, targetId);
    const newTodo = {
      ...todos[from],
      status: status,
    };
    const newTodos = mergeArray(todos, from, todos.length, newTodo);
    setTodoState(newTodos);
    dispatch({ type: 'SET_HOVER', hover: null });
  };
  return (
    <ColumnContatiner>
      {status}
      <Todos
        onDragOver={handlerDragOver}
        onDrop={moveLast}
        data-status={status}
      >
        {filtered.map(todo => (
          <Todo
            setTodoState={setTodoState}
            todos={todos}
            key={todo.id}
            todo={todo}
          />
        ))}
      </Todos>
    </ColumnContatiner>
  );
};

const Todos = styled.div`
  height: 100%;
`;
const ColumnContatiner = styled.div`
  border: 1px solid black;
  min-width: 300px;
  min-height: 600px;
  padding: 20px;
`;

export default Column;
