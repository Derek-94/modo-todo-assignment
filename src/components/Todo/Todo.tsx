import React from 'react';
import { Itodo } from 'types';

interface TodoProps {
  todo: Itodo;
}

const Todo: React.FC<TodoProps> = ({ todo }) => {
  return <div>{todo.taskName}</div>;
};
export default Todo;
