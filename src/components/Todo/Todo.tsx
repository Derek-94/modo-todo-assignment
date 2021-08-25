import React from 'react';
import styled from 'styled-components';
import { Itodo } from 'types';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';

interface TodoProps {
  todo: Itodo;
  onDeleteTodo: (id: string) => void;
}

const Todo: React.FC<TodoProps> = ({ todo, onDeleteTodo }) => {
  const onClickIcon: React.MouseEventHandler<SVGSVGElement> = e => {
    onDeleteTodo(todo.id);
  };
  return (
    <TodoContainer className="todo" data-id={todo.id}>
      {todo.taskName}
      <Icon icon={faTrashAlt} onClick={onClickIcon} />
    </TodoContainer>
  );
};

const TodoContainer = styled.div`
  border: 1px solid black;
  border-radius: 3px;
  padding: 16px;
  display: flex;
  justify-content: space-between;
`;

const Icon = styled(FontAwesomeIcon)`
  cursor: pointer;
  :hover {
    color: green;
    transform: scale(1.1);
    transition: all 0.5s;
  }
`;

export default Todo;
