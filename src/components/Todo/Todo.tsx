import React, { useRef } from 'react';
import styled, { css } from 'styled-components';
import { Itodo } from 'types';
import { findById, isOverHalf, mergeArray } from 'utils/dnd';
import { useDragDispatch, useDragState } from 'contexts';

interface TodoProps {
  todo: Itodo;
  todos: Itodo[];
  setTodoState: (todos: Itodo[]) => void;
}

const Todo: React.FC<TodoProps> = ({ todo, todos, setTodoState }) => {
  const dispatch = useDragDispatch();
  const { position, hover } = useDragState();
  const todoRef = useRef<HTMLDivElement>(null);
  const handleDragEnd = () => {
    dispatch({ type: 'SET_HOVER', hover: null });
  };
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.stopPropagation();
    const { parentElement } = e.currentTarget;
    const dragId = e.dataTransfer.getData('id');
    const targetId = todo.id;

    const newStatus = parentElement?.dataset.status || '';
    const from = findById(todos, dragId);
    const to = findById(todos, targetId) + (isOverHalf(e) ? 0 : -1);
    const newTodo: Itodo = {
      ...todos[from],
      status: newStatus,
    };
    const newTodos = mergeArray(todos, from, to, newTodo);
    setTodoState(newTodos);
    dispatch({ type: 'SET_HOVER', hover: null });
  };
  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    e.dataTransfer.setData('id', e.currentTarget.dataset.id || '');
  };
  const handlerDragOver = (e: React.DragEvent<HTMLDivElement>): void => {
    e.preventDefault();
    e.stopPropagation();
    if (todoRef.current) {
      const isOver = isOverHalf(e) ? 1 : -1;
      dispatch({
        type: 'SET_POSITION',
        position: isOver,
      });
      dispatch({
        type: 'SET_HOVER',
        hover: todoRef.current.dataset.id || null,
      });
    }
  };

  return (
    <TodoWrapper
      ref={todoRef}
      draggable
      data-id={todo.id}
      onDragStart={handleDragStart}
      onDragOver={handlerDragOver}
      onDragEnd={handleDragEnd}
      onDrop={handleDrop}
      focus={hover === todo.id}
      position={position}
    >
      <TodoContent>
        {todo.taskName} | {todo.id}
      </TodoContent>
    </TodoWrapper>
  );
};

interface StyledTodoProps {
  focus: boolean;
  position: number;
}

const marginByPosition = (props: StyledTodoProps) => {
  if (props.focus) {
    if (props.position > 0) {
      return css`
        padding-bottom: 50px;
      `;
    } else {
      return css`
        padding-top: 50px;
      `;
    }
  }
  return css`
    padding: 16px;
    transition: none;
  `;
};

const TodoWrapper = styled.div<StyledTodoProps>`
  padding: 16px;
  box-sizing: border-box;
  transition: 0.5s padding ease;
  ${props => marginByPosition(props)}
`;
const TodoContent = styled.div`
  padding: 30px;
  border: 1px solid black;
  border-radius: 10px;
`;

export default React.memo(Todo);
